const User = require("../models/User");
const Game = require("../models/game");
const Withdrawal = require("../models/withdraw");
const poolCalculation = require("../helpers/poolCalculator");
const Reference = require("../models/reference");
const verifyPayment = require("../helpers/verifyPaystackpayments");
module.exports = {
  signupForGame: (req, res) => {
    // get the id of the user
    const { _id } = req.body.user;
    // check for that user
    User.findOne({ _id }, (err, user) => {
      if (err) {
        res.json({
          error: true,
          message:
            "Something went wrong while trying to sign you up for a game, please try again"
        });
      }

      if (user) {
        // get the user balance
        if (user.account_balance < 100 || user.signupForNextGameShow) {
          res.json({
            error: true,
            message:
              "You have insufficient balance or you are trying to sign up again"
          });
        } else {
          // check to see if game is on
          Game.findOne({}, (err, game) => {
            if (err) {
              res.json({
                error: true,
                message:
                  "Something went wrong while trying to sign you up for a game, please try again"
              });
            }

            if (game) {
              // check if there is an ongoing game
              if (game.gameison) {
                res.json({
                  error: true,
                  message: "Game is on, current session is blocked out"
                });
              } else {
                // now we can sign user up for next session
                const newBalance = user.account_balance - 100;
                const newTotalUser = game.totalNumberOfSignedupUsers + 1;
                const poolCal = poolCalculation(newTotalUser);
                const { poolMoney, possibleWinners } = poolCal;
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
                      res.json({
                        error: true,
                        message:
                          "Something went wrong while trying to sign you up for a game, please try again"
                      });
                    }

                    Game.findOneAndUpdate(
                      {},
                      {
                        totalNumberOfSignedupUsers: newTotalUser,
                        pricepool: poolMoney,
                        possibleWinners
                      },
                      { new: true },
                      (err, game) => {
                        if (err) {
                        } else {
                          res.json({
                            user: { ...doc._doc, password: null },
                            game: { ...game._doc },
                            message:
                              "You have successfully signed up for next game session"
                          });
                        }
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

  getGame: (req, res) => {
    // get the Game object
    Game.findOne({}, (err, game) => {
      if (err) {
        res.json({
          error: true,
          message: "Couldn't get game please refresh again"
        });
      }

      res.json({
        game
      });
    });
  },
  withdrawCash: (req, res) => {
    const { amount } = req.body;
    const user = req.auth;
    User.findOne({ _id: user._id }, (err, user) => {
      if (err) {
        res.json({
          error: true,
          message: "Something went wrong, please try again"
        });
      } else {
        if (user.account_balance >= amount) {
          if (amount >= 1000) {
            if (!user.verified && amount >= 5000) {
              res.json({
                error: true,
                message:
                  "Sorry your account is limited to a withdrawal of 5000, verify to remove limit"
              });
            } else {
              Withdrawal.findOne({ user: user._id }, (err, found) => {
                if (err) {
                  res.json({
                    error: true,
                    message: "Something went wrong please try again"
                  });
                } else {
                  if (found) {
                    //update the user withdrawal
                    const newAmount = found.amount + amount;
                    Withdrawal.findOneAndUpdate(
                      { user: user._id },
                      { amount: newAmount },
                      { new: true },
                      (err, withdrawal) => {
                        if (err) {
                          res.json({
                            error: true,
                            message:
                              "Something went wrong, couldn't complete withdrawal"
                          });
                        } else {
                          // withdrawal was successfully done
                          const newBalance = user.account_balance - amount;
                          User.findOneAndUpdate(
                            { _id: user._id },
                            { account_balance: newBalance },
                            { new: true },
                            (err, done) => {
                              if (err) {
                                res.json({
                                  error: true,
                                  message:
                                    "Something went wrong, couldn't complete withdrawal"
                                });
                              } else {
                                res.json({
                                  user: { ...done._doc, password: null },
                                  message: `Withdrawal request of ${amount} NGN was successful`
                                });
                              }
                            }
                          );
                          // res.json({
                          //   user: { ...withdrawal._doc, password: null },
                          //   message: `Withdrawal request of ${amount} was successfully made`
                          // });
                        }
                      }
                    );
                  } else {
                    const withdraw = new Withdrawal({
                      user: user._id,
                      amount: amount
                    });
                    withdraw.save((err, doc) => {
                      if (!err) {
                        const newBalance = user.account_balance - amount;
                        User.findOneAndUpdate(
                          { _id: user._id },
                          { account_balance: newBalance },
                          { new: true },
                          (err, done) => {
                            if (err) {
                              res.json({
                                error: true,
                                message:
                                  "Something went wrong, couldn't complete withdrawal"
                              });
                            } else {
                              res.json({
                                user: { ...done._doc, password: null },
                                message: `Withdrawal request of ${amount} NGN was successful`
                              });
                            }
                          }
                        );
                      } else {
                        res.json({
                          error: true,
                          message: "Something went wrong , please try again"
                        });
                      }
                    });
                  }
                }
              });
            }
          } else {
            res.json({
              error: true,
              message: "Amount must be greated than 1000 NGN"
            });
          }
        } else {
          res.json({
            error: true,
            message: "Insufficient balance, try topping up your account"
          });
        }
      }
    });
  },

  submitAnswer: (req, res) => {
    // check if the user is already blockedout
    // check if the answer is correct
    const { user, checkanswer } = req.body;
    try {
      //if the answer is correct
      if (checkanswer) {
        //answer is correct now check to
        Game.findOne({}, (err, game) => {
          if (err) {
            throw new Error("Something went wrong, please try again");
          } else {
            const totalNumberOfWinners = game.totalNumberOfWinners;
            const possibleWinners = game.possibleWinners;
            if (totalNumberOfWinners === possibleWinners) {
              User.findOneAndUpdate(
                { _id: user._id },
                { $set: { signupForNextGameShow: false } },
                { new: true },
                (err, done) => {
                  if (err) {
                  } else {
                    res.send({
                      user: { ...done._doc, password: null },
                      message:
                        "You were correct but too slow, totalNumber of winners has been reached"
                    });
                  }
                }
              );
            } else {
              const newBalance = user.account_balance + game.pricepool;
              User.findOneAndUpdate(
                { _id: user._id },
                {
                  $set: {
                    signupForNextGameShow: false,
                    account_balance: newBalance
                  }
                },
                { new: true },
                (err, done) => {
                  if (err) {
                    console.log(err.message);
                  } else {
                    Game.findOne({}, (err, game) => {
                      if (err) {
                      } else {
                        const totalWinners = game.totalNumberOfWinners + 1;
                        Game.findOneAndUpdate(
                          {},
                          { $set: { totalNumberOfWinners: totalWinners } },
                          { new: true },
                          (err, game) => {
                            res.json({
                              user: { ...done._doc, password: null },
                              message:
                                "Hurrayyyyy, you were on correct and on time"
                            });
                          }
                        );
                      }
                    });
                  }
                }
              );
            }
          }
        });
      } else {
        User.findOneAndUpdate(
          { _id: user._id },
          { signupForNextGameShow: false },
          { new: true },
          (err, done) => {
            res.json({
              error: true,
              user: { ...done._doc, password: null },
              message: "Ooopsy!!, that is a wrong answer"
            });
          }
        );
      }
    } catch (err) {
      User.findOneAndUpdate(
        { _id: user._id },
        { signupForNextGameShow: false },
        { new: true },
        (err, done) => {
          res.json({
            user: { ...done._doc, password: null },
            message: err.message
          });
        }
      );
    }
  },

  verifyUserPayment: (req, res) => {
    const { reference } = req.body;
    const { email } = req.auth;

    // check if the reference has been used before
    Reference.findOne({ reference }, (err, found) => {
      if (err) {
        res.json({
          error: true,
          message:
            "Something went wrong, please contact support , keep your reference number safe"
        });
      } else {
        if (found && found.done) {
          res.json({
            error: true,
            message: "The provided reference number has already been settled"
          });
        } else {
          const refer = new Reference({
            reference,
            done: false
          });

          refer.save(async (err, done) => {
            if (err) {
              res.json({
                error: true,
                message:
                  "Something went wrong , please contact support , keep your reference number safe"
              });
            } else {
              try {
                const verify = await verifyPayment(reference);
                if (verify) {
                  const { data } = verify;
                  if ((data.status = "success")) {
                    const { amount } = data;
                    // update the user
                    User.findOne({ email }, (err, user) => {
                      if (err) {
                        res.json({
                          error: true,
                          message:
                            "We noticed your transaction reference was valid but transaction is incomplete, please contact support, and remeber to keep your reference number safe"
                        });
                      } else {
                        const newBalance = user.account_balance + amount / 100;
                        User.findOneAndUpdate(
                          { email: user.email },
                          { $set: { account_balance: newBalance } },
                          { new: true },
                          (err, usr) => {
                            if (err) {
                              res.json({
                                error: true,
                                message:
                                  "We noticed your transaction reference was valid but transaction was incomplete, please contact support, and remeber to keep your reference number safe"
                              });
                            } else {
                              Reference.findOneAndUpdate(
                                { reference },
                                { $set: { done: true } },
                                (err, done) => {
                                  if (err) {
                                    res.json({
                                      error: true,
                                      message:
                                        "We noticed your transaction reference was valid but transaction was incomplete, please contact support, and remeber to keep your reference number safe"
                                    });
                                  } else {
                                    res.json({
                                      message: `Account top up was successfull`,
                                      user: { ...usr._doc, password: null }
                                    });
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    });
                  }
                } else {
                  res.json({
                    error: true,
                    message: "Incomplete transaction, please try again"
                  });
                }
              } catch (err) {
                res.json({
                  error: true,
                  message: err.message
                });
              }
            }
          });
        }
      }
    });
  }
};
