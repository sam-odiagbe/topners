const Game = require("../database/models/game");
const User = require("../database/models/User");
const Winner = require("../database/models/Winner");

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
        Socket.emit("err", "Something went wrong");
      }

      if (user) {
        // get the user balance
        if (user.account_balance < 100 || user.signupForNextGameShow) {
          Socket.emit("err", "Insufficient Balance or Already Signed up");
        } else {
          // check to see if game is on
          Game.findOne({}, (err, game) => {
            if (err) {
            }

            if (game) {
              // check if there is an ongoing game
              if (game.gameison) {
                Socket.emit("err", "Game is on wait until next session");
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
                      Socket.emit("err", "Couldn't Join game, try again");
                    }
                    Socket.emit("joinsuccessful");
                    Socket.emit("setuser", { ...doc._doc, password: null });
                  }
                );
              }
            }
          });
        }
      }
    });
  },

  submitAnswer: (data, Socket) => {
    // check if the user is already blockedout
    Winner.findOne({}, (err, winner) => {
      if (winner) {
        if (
          winner.winners.includes(data._id) ||
          winner.blockedOut.includes(data._id)
        ) {
          if (winner.blockedOut.includes(data._id)) {
            Socket.emit("blockedOut", true);
          }
          if (winner.winners.includes(data._id)) {
            Socket.emit("WinnerAlready", {
              message: "Already a winner",
              c: true
            });
          }
        } else {
          winner.winners.push(data);
          winner.blockedOut.push(data);
          winner.save();
          Socket.emit("blockedOut", true);
          Socket.emit("Winner", {
            message: "You have been lined up for payment",
            c: true
          });
        }
      } else {
        const winner = new Winner({
          totalWinners: 0
        });

        winner.totalWinners = winner.totalWinners + 1;
        winner.winners.push(data);
        winner.blockedOut.push(data);

        winner.save();
        Socket.emit("blockedOut", true);
        Socket.emit("Winner", {
          message: "You have been lined up for payment",
          c: true
        });
      }
    });
  }
};
