const Game = require("../database/models/game");
const User = require("../database/models/User");
const Withdrawal = require("../database/models/withdraw");
const randomString = require("crypto-random-string");
const poolCalculation = require("../database/helpers/poolCalculator");
const { error, setgameobject, resetuser, requests } = require("./emitters");

module.exports = {
  sendGame: (data, Socket) => {
    Socket.emit(setgameobject, data);
  },
  getGame() {
    return Game.findOne({});
  },

  turnGameOnOrOff: (turnon, Socket) => {
    const off =
      turnon === false
        ? {
            possibleWinners: 0,
            totalNumberOfWinners: 0,
            pricepool: 0,
            totalNumberOfSignedupUsers: 0
          }
        : {};
    Game.findOneAndUpdate(
      {},
      { gameison: turnon, ...off },
      { new: true },
      (err, game) => {
        Socket.broadcast.emit(setgameobject, game);
        Socket.emit(setgameobject, game);
      }
    );
  },

  // coming back to this one soon
  updateGameObject: (data, Socket) => {
    const question = {};
    const option = data.options.split(",");
    const uniqueId = randomString({ length: 10 });
    const kickoftime = data.data;
    question.question = data.question;
    question.option = option;
    question.answer = data.answer;
    const gameison = false;

    Game.findOneAndUpdate(
      {},
      {
        question,
        kickoftime,
        uniqueId,
        gameison,
        possibleWinners: 0,
        totalNumberOfWinners: 0,
        pricepool: 0,
        totalNumberOfSignedupUsers: 0
      },
      { new: true },
      (err, game) => {
        Socket.broadcast.emit(setgameobject, game);
        Socket.emit(setgameobject, game);
      }
    );
  },

  remodifyGameObject: Socket => {
    // update total signed up user and the pool money stuff
    try {
      Game.findOne({}, (err, game) => {
        if (err) {
        } else {
          const newTotalUser = game.totalNumberOfSignedupUsers + 1;
          const poolCal = poolCalculation(newTotalUser);
          const { poolMoney, possibleWinners } = poolCal;
          Game.findOneAndUpdate(
            {},
            {
              totalNumberOfSignedupUsers: newTotalUser,
              pricepool: poolMoney,
              possibleWinners: possibleWinners
            },
            { new: true },
            (err, doc) => {
              if (doc) {
                Socket.emit(setgameobject, { ...doc._doc });
                Socket.broadcast.emit(setgameobject, { ...doc._doc });
              }
            }
          );
          // use this to calcula te pool money
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
  }
};
