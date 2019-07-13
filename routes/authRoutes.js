const express = require("express");
const router = express.Router();
const User = require("../database/models/User");
const {
  createnewuser,
  loguserin,
  requestpasswordreset,
  resetpassword
} = require("../database/handlers/authHandler");
const withAuth = require("../database/helpers/withAuth");
router.post("/login", (req, res, next) => {
  console.log(req.cookies);
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

router.get("/verify_authentication", withAuth, (req, res, next) => {
  const { _id } = req.auth;
  User.findOne({ _id }, (err, user) => {
    res.json({
      success: {
        message: "hello",
        auth: user
      }
    });
  });
});

router.post("/logout", withAuth, (req, res, next) => {
  res.clearCookie("poseidon_auth_urs").json({
    error: null,
    success: {
      message: "Logged out"
    }
  });
});
module.exports = router;
