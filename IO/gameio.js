const Game = require("../database/models/game");
const User = require("../database/models/User");
const Withdrawal = require("../database/models/withdraw");
const { setgameobject, requests, resetuser } = require("./emitters");

module.exports = {
  sendGame: (data, Socket) => {
    Socket.emit(setgameobject, data);
  },
  getGame() {
    return Game.findOne({});
  },

  // turn game on or off
  turnGameOn: Socket => {
    Game.findOneAndUpdate(
      {},
      { $set: { gameison: true } },
      { new: true },
      (err, done) => {
        if (err) {
        } else {
          Socket.emit(setgameobject, done._doc);
          Socket.broadcast.emit(setgameobject, done._doc);
        }
      }
    );
  },

  // coming back to this one soon
  resetGameObject: Socket => {
    // first thing to do is to turn the game of
    Game.findOne({}, (err, game) => {
      if (err) {
      } else {
        const currentWinners = game.currentWinners;
        Game.findOneAndUpdate(
          {},
          {
            $set: {
              gameison: false,
              possibleWinners: 0,
              currentWinners: [],
              prevWinners: currentWinners,
              pricepool: 0,
              totalNumberOfSignedupUsers: 0,
              totalNumberOfWinners: 0
            }
          },
          { new: true },
          (err, doc) => {
            if (err) {
            } else {
              Socket.emit(setgameobject, doc._doc);
              Socket.broadcast.emit(setgameobject, doc._doc);
              User.updateMany(
                { signupForNextGameShow: true },
                { $set: { signupForNextGameShow: false } },
                (err, done) => {
                  if (err) {
                  } else {
                    Socket.broadcast.emit(resetuser);
                  }
                }
              );
            }
          }
        );
      }
    });
  },

  getWithdrawalRequests: Socket => {
    try {
      Withdrawal.find({})
        .limit(10)
        .populate("user", ["username", "bank", "account_number"])
        .exec((err, doc) => {
          Socket.emit(requests, doc);
        });
    } catch (err) {}
  },

  clearWithdrawalRequest: (id, Socket) => {
    try {
      Withdrawal.findOneAndDelete({ _id: id }, (err, res) => {
        if (err) {
          console.log(err.message);
        } else {
          Socket.emit("CLEARED", res);
        }
      });
    } catch (err) {}
  },

  createGame: (data, Socket) => {
    // creating a new game
    Game.findOne({}, (err, game) => {
      let on = game.gameison;
      if (on) {
        Socket.emit(
          "ERROR",
          "game is on, reset game before you can post new question"
        );
      } else {
        const question = {};
        question.question = data.question;
        question.option = data.options.split(",");
        question.answer = data.answer;
        Game.findOneAndUpdate(
          {},
          { $set: { question } },
          { new: true },
          (err, doc) => {
            if (err) {
            } else {
              Socket.emit(setgameobject, doc._doc);
            }
          }
        );
      }
    });
  },

  newWinner: Socket => {
    Game.findOne({}, (err, game) => {
      if (err) {
      } else {
        console.log(game);
        Socket.broadcast.emit(setgameobject, game);
        Socket.emit(setgameobject, game);
      }
    });
  }
};
