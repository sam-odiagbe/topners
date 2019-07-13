const express = require("express");

const router = express.Router();
const Game = require("../database/models/game");

router.post("/createGame", (req, res, next) => {
  const gameBody = req.body;
  const game = new Game({
    ...gameBody,
    kickofftime: new Date() + 8000000,
    gameison: false,
    totalNumberOfWinners: 50,
    totalNumberSubmitted: 0
  });
  game.save((err, doc) => {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      doc
    });
  });
});

module.exports = router;
