const express = require("express");
const router = express.Router();
const User = require("../database/models/User");
const {
  createnewuser,
  loguserin,
  requestpasswordreset,
  resetpassword,
  updateUserProfile,
  verifyUserAccount,
  sendPasswordReset,
  verifyResetToken,
  requestVerification
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

router.post("/profile/update", withAuth, (req, res, next) => {
  updateUserProfile(req, res);
});

router.post("/account/verify", (req, res, next) => {
  verifyUserAccount(req, res);
});

router.post("/account/password_reset", (req, res, next) => {
  sendPasswordReset(req, res);
});

router.post("/account/reset/validate", (req, res, next) => {
  verifyResetToken(req, res);
});

router.post("/account/sendverification", withAuth, (req, res, next) => {
  requestVerification(req, res);
});
module.exports = router;
