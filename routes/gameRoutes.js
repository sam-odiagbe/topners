const express = require("express");
const router = express.Router();

const withAuth = require("../database/helpers/withAuth");
const {
  signUpForGame,
  submitAnswer,
  getGame
} = require("../database/handlers/gameRequestHandler");

router.post("/signuserupforgame", withAuth, (req, res, next) => {
  signUpForGame(req, res);
});

router.post("/submitAnswer", withAuth, (req, res, next) => {
  submitAnswer(req, res);
});

router.get("/game", (req, res, next) => {
  //
  getGame(req, res);
});

module.exports = router;
