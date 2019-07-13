const User = require("../models/User");
const Game = require("../models/game");
const Winner = require("../models/winners");

module.exports = {
  signUpForGame: user => {
    // get the auth object
    const { id } = user;

    User.findOne({ _id: id }, (err, doc) => {
      // if an error occurs
      if (err) {
      }
      const balance = doc.account_balance;
      const alreadySignedUp = doc.signupForNextGameShow;
      if (balance < 100 || alreadySignedUp) {
      } else {
        const newBalance = doc.account_balance - 100;
        doc.account_balance = newBalance;
        doc.signupForNextGameShow = false;
        User.updateOne({ _id: doc._id }, doc, (err, doc, any) => {
          if (err) {
          }
        });
      }
    });
  },

  submitAnswer: (req, res) => {
    // check if a game is on
    const { id } = req.auth;
    Game.findOne({ gameison: true }, (err, any) => {
      if (err) {
        res.json({
          error: { message: "No game is on" }
        });
      }
      if (!any) {
        res.json({
          error: {
            message: "No game is on"
          }
        });
      } else {
        // a game is on
        // check if the user has submitted an answer already
        Winner.findOne({ user: id }, (err, doc) => {
          if (err) {
            res.json({
              error: {
                message: "Something went wrong, try gain"
              }
            });
          }

          if (doc) {
            res.json({
              error: {
                message: "You already submitted your answer"
              }
            });
          } else {
            const winner = new Winner({
              user: id
            });
            winner.save((err, doc) => {
              if (err) {
                res.json({
                  error: {
                    message: "Something went wrong, try again"
                  }
                });
              }

              res.send({
                success: {
                  message: "You are one of the topners"
                }
              });
            });
          }
        });
      }
    });
  },
  getGame: (req, res) => {
    // get the Game object
    Game.findOne({}, (err, game) => {
      if (err) {
        res.json({
          error: {
            message: "no game found"
          }
        });
      }

      res.json({
        success: {
          game
        }
      });
    });
  }
};
