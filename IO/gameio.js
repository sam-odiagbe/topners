const Game = require("../database/models/game");
const User = require("../database/models/User");
const Winner = require("../database/models/Winner");
const Verification = require("../database/models/verificationModel");
const Withdrawal = require("../database/models/withdraw");
const sendEmail = require("../database/helpers/mailer");
const BCRYPT = require("bcrypt");
const randomString = require("crypto-random-string");
const verifyPayment = require("../database/helpers/verifyPaystackpayments");
const Reference = require("../database/models/reference");
const PasswordReset = require("../database/models/passwordResetModel");
const {
  error,
  success,
  setuser,
  setgameobject,
  resetuser,
  blockout,
  newuserjoined,
  paymentsuccessful,
  retrypayment,
  paymenterror
} = require("./emitters");

module.exports = {
  getGame: () => {
    const game = Game.findOne({});
    return game;
  },

  signupForGame: (user, Socket) => {
    // get the id of the user
    const { _id } = user;
    // check for that user
    User.findOne({ _id }, (err, user) => {
      if (err) {
        Socket.emit(error, "Something went wrong");
      }

      if (user) {
        // get the user balance
        if (user.account_balance < 100 || user.signupForNextGameShow) {
          Socket.emit(error, "Insufficient Balance or Already Signed up");
        } else {
          // check to see if game is on
          Game.findOne({}, (err, game) => {
            if (err) {
              Socket.emit(error, "Something went wrong, try again");
            }

            if (game) {
              // check if there is an ongoing game
              if (game.gameison) {
                Socket.emit(error, "Game is on wait until next session");
              } else {
                // now we can sign user up for next session
                const newBalance = user.account_balance - 100;
                const totalNumberSubmitted = game.totalNumberSubmitted + 1;
                User.findOneAndUpdate(
                  { _id },
                  {
                    $set: {
                      signupForNextGameShow: true,
                      account_balance: newBalance
                    }
                  },
                  { new: true },
                  (err, doc) => {
                    if (err) {
                      Socket.emit(error, "Couldn't Join game, try again");
                    }
                    Socket.emit(success, "You have successfully signed up");
                    Socket.emit(setuser, { ...doc._doc, password: null });
                    Game.findOneAndUpdate(
                      {},
                      { totalNumberSubmitted },
                      { new: true },
                      (err, game) => {
                        Socket.broadcast.emit(
                          newuserjoined,
                          game.totalNumberSubmitted
                        );
                      }
                    );
                  }
                );
              }
            }
          });
        }
      }
    });
  },

  submitAnswer: ({ user, checkanswer, totalNumberOfWinners }, Socket) => {
    // check if the user is already blockedout
    // check if the answer is correct
    if (checkanswer) {
      Winner.findOne({}, (err, winner) => {
        // check if there is a winner object
        if (winner) {
          // check if the total winners has been reached
          if (totalNumberOfWinners === winner.winners.length) {
            Socket.emit(error, "Oops, correct but too slow");
          } else {
            // total number not  reached
            if (
              winner.winners.includes(user._id) ||
              winner.blockedOut.includes(user._id)
            ) {
              // if (winner.blockedOut.includes(user._id)) {
              // }
            } else {
              winner.winners.push(user);
              winner.blockedOut.push(user);
              winner.save();

              Socket.emit(success, "You were Correct and on time");
            }
          }
          Socket.emit(success, "You were Correct and on time");
        } else {
          const winner = new Winner({
            totalWinners: 0
          });

          winner.totalWinners = winner.totalWinners + 1;
          winner.winners.push(user);
          winner.blockedOut.push(user);

          winner.save();
          Socket.emit(succes, "You are correct and on time");
        }
      });
    } else {
      // block the user out

      Socket.emit(error, "Oops, that is wrong!!");
    }
    User.findOneAndUpdate(
      { _id: user._id },
      { $set: { signupForNextGameShow: false } },
      { new: true },
      (err, usr) => {
        if (err) {
          console.log(err);
        } else {
          Socket.emit(setuser, { ...usr._doc, password: null });
        }
      }
    );
    Socket.emit(blockout, true);
  },
  sendGame: (data, Socket) => {
    Socket.emit(setgameobject, data);
  },

  updateUserProfile: (payload, Socket) => {
    const { _id, data } = payload;
    // find user with the above id
    User.findOneAndUpdate({ _id }, { ...data }, { new: true }, (err, user) => {
      if (err) {
        Socket.emit(error, "Couldn' update profile, try again");
      }
      Socket.emit(setuser, { ...user._doc, password: null });
      Socket.emit(success, "Profile changed");
    });
  },

  turnGameOnOrOff: (turnon, Socket) => {
    Game.findOneAndUpdate(
      {},
      { gameison: turnon },
      { new: true },
      (err, game) => {
        Socket.broadcast.emit(setgameobject, game);
        Socket.emit(setgameobject, game);
      }
    );
  },

  updateGameObject: (data, Socket) => {
    const question = {};
    const option = data.options.split(",");
    const uniqueId = randomString({ length: 10 });
    const kickoftime = data.data;
    question.question = data.question;
    question.option = option;
    question.answer = data.answer;
    const gameison = false;
    const totalNumberOfWinners = data.totalWinners;
    Game.findOneAndUpdate(
      {},
      { question, kickoftime, uniqueId, gameison, totalNumberOfWinners },
      { new: true },
      (err, game) => {
        Socket.broadcast.emit(setgameobject, game);
        Socket.emit(setgameobject, game);
      }
    );
  },

  verifyUserAccount: (data, Socket) => {
    const { email, token } = data;
    Verification.findOneAndDelete({ token }, (err, doc) => {
      if (err) {
        Socket.emit(error, "Couldn't verify your account, try again");
      }
      if (doc) {
        User.findOneAndUpdate(
          { email },
          { verified: true },
          { new: true },
          (err, doc) => {
            if (err) {
              Socket.emit(error, "Something went wrong, try again");
            } else {
              Socket.emit(success, "Your account has been verified");
              Socket.emit(setuser, { ...doc._doc, password: null });
            }
          }
        );
      } else {
        Socket.emit(error, "Invalid token supplied");
      }
    });
  },

  sendPasswordReset: async (email, Socket) => {
    const errorMessage =
      "Something went wrong while trying to send email, please try again";
    const token = randomString({ length: 40 });
    try {
      PasswordReset.findOne({ email }, (err, found) => {
        if (err) {
          throw new Error(errorMessage);
        }
        if (found) {
          PasswordReset.findOneAndUpdate(
            { email },
            { $set: { token } },
            (err, done) => {
              if (err) {
                throw new Error(errorMessage);
              }
              if (!done) {
                throw new Error(errorMessage);
              }
            }
          );
        } else {
          const reset = new PasswordReset({
            email,
            token
          });

          reset.save((err, done) => {
            if (err) {
              throw new Error(errorMessage);
            }
            Socket.emit(success, `Reset email has been sent to ${email}`);
          });
        }
      });
      let sendmail = await sendEmail({ type: "PASSWORDRESET", email, token });
      if (sendmail) {
        Socket.emit(success, `Reset email has been sent to ${email}`);
      } else {
        throw new Error(errorMessage);
      }
    } catch (err) {
      Socket.emit(error, err.message);
    }
  },

  verifyResetToken: (data, Socket) => {
    const { token, email, password } = data;
    console.log("reseting the token");
    console.log(email);
    // check to see if there is a token already assigned to the user
    const errorMessage =
      "Something went wrong , please try again or make a new request for a new token";
    try {
      PasswordReset.findOne({ email }, (err, found) => {
        if (err) {
          throw new Error(err.message);
        } else {
          if (found) {
            // check the token against the token in the database
            let tokenInDatabase = found.token;
            let newPassword = BCRYPT.hashSync(password, 10);
            if (tokenInDatabase === token) {
              // verify the user e
              User.findOneAndUpdate(
                { email },
                { $set: { password: newPassword } },
                { new: true },
                (err, done) => {
                  if (err) {
                    throw new Error(errorMessage);
                  } else {
                    Socket.emit(success, "Reset was successful");
                    PasswordReset.findOneAndDelete({ email }, (err, suc) => {
                      if (err) {
                      }
                    });
                  }
                }
              );
              Socket.emit(success, "Password reset was successful");
            } else {
              throw new Error("Invalid reset token provided");
            }
          } else {
            console.log("not found");
          }
        }
      });
    } catch (err) {
      Socket.emit(error, err.message);
    }
  },

  resetUser: Socket => {
    User.update(
      { signupForNextGameShow: true },
      { signupForNextGameShow: false },
      { multi: true },
      (err, done) => {
        if (err) {
          console.log("error");
        } else {
          console.log("updated");
        }
      }
    );
    Socket.broadcast.emit(resetuser);
  },

  withdrawCash(data, Socket) {
    const { user, amount } = data;
    if (amount >= 1000 && amount <= 20000) {
      User.findOne({ _id: user._id }, (err, usr) => {
        if (err) {
          Socket.emit(error, "Something went wrong, please try again");
        } else {
          if (usr) {
            // if user is not verified
            //check the amount the user is requesting
            // if the amount is greate than 5000 reject request and send message back to user saying there is a limit on their account because they have not verified their account
            if (usr.account_balance >= amount) {
              console.log(user.verified);
              if (amount > 5000 && !usr.verified) {
                Socket.emit(
                  error,
                  "Sorry you have not verified your account so withdrawals are limited to 5000 naira"
                );
              } else {
                const newBalance = user.account_balance - amount;
                User.findOneAndUpdate(
                  { _id: usr._id },
                  { $set: { account_balance: newBalance } },
                  { new: true },
                  (err, doc) => {
                    if (err) {
                      Socket.emit(error, "Something went wrong, try again");
                    } else {
                      if (doc) {
                        const newWithdrawal = new Withdrawal({
                          user: doc._id,
                          amount
                        });
                        newWithdrawal.save();
                        Socket.emit(
                          success,
                          `Withdrawal request of ${amount} was successfully made`
                        );
                        Socket.emit(setuser, { ...doc._doc, password: null });
                      }
                    }
                  }
                );
              }
            } else {
              Socket.emit(error, "Insufficient Balance");
            }
          }
        }
      });
    } else {
      Socket.emit(error, "Amount needs to be above 1000 and below 20000");
    }
  },

  verifyUserPayment: (data, Socket) => {
    const { reference, user } = data;
    const theUser = JSON.parse(user);
    Reference.findOne({ reference }, async (err, ref) => {
      if (err) {
        Socket.emit(error, "Couldn't top up your account, please try again");
      } else {
        if (ref) {
          Socket.emit(
            error,
            "The reference reciept you have provided has been settled "
          );
        } else {
          // no referece has been saved
          try {
            const verify = await verifyPayment(reference);
            const { data } = verify;
            if (data.status === "success") {
              const { amount } = data;
              const newBalance = theUser.account_balance + amount / 100;
              User.findOneAndUpdate(
                { _id: theUser._id },
                { $set: { account_balance: newBalance } },
                { new: true },
                (err, doc) => {
                  if (err) {
                    // need to think about this alright
                    Socket.emit(
                      paymenterror,
                      `Hi, we noticed that your reference reciept number is valid but something went wrong, please contact support@topner.com`
                    );
                    //emit a retry payment
                  } else {
                    const newReference = new Reference({
                      reference,
                      done: true
                    });

                    newReference.save();
                    Socket.emit(setuser, { ...doc._doc, password: null });
                    Socket.emit(
                      paymentsuccessful,
                      `Your account has been successfully topped up with ${amount /
                        100} naira`
                    );
                  }
                }
              );
            } else {
              Socket.emit(
                paymenterror,
                "Something went wrong while trying to top up your account, please try again"
              );
            }
          } catch (err) {
            Socket.emit(
              paymenterror,
              "Something went wrong while trying to top up your account, please try again"
            );
          }
        }
      }
    });
  },

  requestVerification: async (data, Socket) => {
    const { user } = data;
    const { email } = user;
    let token = randomString({ length: 40 });
    // sendEmail({ type: "VERIFICATION", email: user.email, _id: user._id });
    // Socket.emit(success, `Verification email has been sent to ${user.email}`);
    try {
      Verification.findOne({ email }, (err, found) => {
        if (err) {
          throw new Error(
            "Something went wrong while trying to send verification email"
          );
        }

        if (found) {
          Verification.findOneAndUpdate(
            { email },
            { $set: { token } },
            (err, done) => {
              if (done) {
              } else {
                throw new Error(
                  "Something went wrong while trying to send verification mail"
                );
              }
            }
          );
        } else {
          const verify = new Verification({
            token,
            email
          });
          verify.save((err, done) => {
            if (err) {
              throw new Error(
                "Something went wrong while trying to send verification mail"
              );
            } else {
            }
          });
        }
      });

      let sendemail = await sendEmail({ type: "VERIFICATION", token, email });
      if (sendemail) {
        Socket.emit(success, `Verification email has been sent to ${email}`);
      } else {
        throw new Error(
          "Sorry could't send verification email, please try again"
        );
      }
    } catch (err) {
      Socket.emit(error, err.message);
    }
  }
};
