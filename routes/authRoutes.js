const express = require("express");
const router = express.Router();
const {
  createnewuser,
  loguserin,
  requestpasswordreset,
  resetpassword
} = require("../database/handlers/authHandler");
router.post("/login", (req, res, next) => {
  loguserin(req, res);
});

router.post("/signup", (req, res, next) => {
  createnewuser(req, res);
});

router.post("/request_password_reset", (req, res, next) => {
  requestpasswordreset(req, res);
});

router.post("/reset_password", (req, res, next) => {
  resetpassword(req, res);
});

module.exports = router;
