const express = require("express");
const router = express.Router();

const withAuth = require("../database/helpers/withAuth");
const {
  signupForGame,
  submitAnswer,
  getGame,
  withdrawCash,
  verifyUserPayment
} = require("../database/handlers/gameRequestHandler");

router.post("/game/signupforgame", withAuth, (req, res, next) => {
  signupForGame(req, res);
});

router.post("/game/submitanswer", withAuth, (req, res, next) => {
  submitAnswer(req, res);
});

router.get("/game", (req, res, next) => {
  getGame(req, res);
});

router.post("/game/withdrawal", withAuth, (req, res, next) => {
  withdrawCash(req, res);
});

router.post("/payment/verify", withAuth, (req, res, next) => {
  verifyUserPayment(req, res);
});

module.exports = router;
