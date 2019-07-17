const Game = require("../database/models/game");
const User = require("../database/models/User");
const Winner = require("../database/models/Winner");
const {
  error,
  success,
  setuser,
  setgameobject,
  youwin,
  totalwinnersreached,
  wronganswer,
  blockout
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
            Socket.emit(totalwinnersreached, "Oops, correct but too slow");
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

              Socket.emit(youwin, "You were Correct and on time");
            }
          }
        } else {
          const winner = new Winner({
            totalWinners: 0
          });

          winner.totalWinners = winner.totalWinners + 1;
          winner.winners.push(user);
          winner.blockedOut.push(user);

          winner.save();
          Socket.emit(youwin, "Hurray, you are in");
        }
      });
    } else {
      // block the user out

      Socket.emit(wronganswer, "Oops, that is wrong!!");
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

  updateUserProfile(payload, Socket) {
    console.log(payload);
    const { _id, data } = payload;
    // find user with the above id
    User.findOneAndUpdate({ _id }, { ...data }, { new: true }, (err, user) => {
      if (err) {
        Socket.emit(error, "Couldn' update profile, try again");
      }
      Socket.emit(setuser, { ...user._doc, password: null });
      Socket.emit(success, "Profile update was successful");
    });
  }
};
