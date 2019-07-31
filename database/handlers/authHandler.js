const User = require("../models/User");
const Verification = require("../models/verificationModel");
const PasswordReset = require("../models/passwordResetModel");
const BCRYPT = require("bcrypt");
const jwt = require("jsonwebtoken");
const randomString = require("crypto-random-string");
const sendEmail = require("../helpers/mailer");
const {
  validateIncomingSignupReqBody,
  validateIncomingLoginReqBody,
  validateIncomingResetPasswordBody
} = require("../helpers/validateData");

const JWT_SECRET_KEY = require("../../config").JWT_SECRET_KEY;

module.exports = {
  createnewuser: async (req, res) => {
    const { name, email, password, username } = req.body;
    console.log(req.body);
    try {
      // validate incoming req body
      const validateRequestBody = await validateIncomingSignupReqBody(req.body);
      if (validateRequestBody) {
        // check if User with user exist
        User.findOne({ email }, (err, user) => {
          // TODO: err
          if (user) {
            res.json({
              error: {
                message: "User exist"
              },
              success: null
            });
          } else {
            User.findOne({ username }, (err, user) => {
              if (user) {
                res.json({
                  error: {
                    message: "Username already taken"
                  },
                  success: null
                });
              } else {
                // user details is valid
                let user = new User({
                  name,
                  email,
                  username
                });
                user.totalAmountWon = 0;
                user.account_balance = 0;
                user.verified = false;
                user.signupForNextGameShow = false;
                user.password = user.hashPassword(password);

                user.save((err, user) => {
                  if (err) {
                    res.send(err);
                  }
                  if (user) {
                    // send email verification
                    res.json({
                      error: null,
                      success: {
                        message: "User Account Created successfully"
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    } catch (err) {
      console.log(err);
      res.json({
        error: {
          message: "Invalid Credentials"
        },
        success: null
      });
    }
  },
  loguserin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const validateRequestBody = await validateIncomingLoginReqBody(req.body);
      if (validateRequestBody) {
        // check for the user
        User.findOne({ email }, (err, user) => {
          // Todo error
          if (!user) {
            return res.json({
              error: "Invalid Credentials",
              message: "Invalid credentials provided, user doesn't exist"
            });
          } else {
            //validate user password
            const validPassword = BCRYPT.compareSync(password, user.password);
            if (validPassword) {
              const token = jwt.sign(
                {
                  auth: user
                },
                JWT_SECRET_KEY,
                {
                  expiresIn: "3d"
                }
              );
              res
                .cookie("poseidon_auth_urs", token, {
                  expires: new Date(Date.now() + 259000000),
                  httpOnly: true
                })
                .json({
                  error: null,
                  success: {
                    message: "You are now logged in",
                    auth: token
                  }
                });
            } else {
              res.json({
                error: "Invalid Credentials",
                message: "Invalid credentials provided hey"
              });
            }
          }
        });
      } else {
        res.json({
          error: "Unauthorized",
          message: "something went wrong"
        });
      }
    } catch (err) {
      res.json({
        error: "Invalid credentials",
        message: "Invalid credentials provided"
      });
    }
  },
  resetpassword: async (req, res) => {
    // reseting the user password
    const { email, token, newPassword } = req.query;
    try {
      const validateData = await validateIncomingResetPasswordBody({
        email,
        token
      });
      if (validData) {
        // validate the token
        PasswordReset.findOne({ email }, (err, doc) => {
          if (err) {
            // was not found
          }
          if (doc) {
            // email was found
            User.findOne({ email }, (err, user) => {
              if (err) {
                //
              }

              if (user) {
                user.password = user.hashPassword(newPassword);
                user.save(() => {
                  res.json({
                    error: null,
                    message: "Password change was successful"
                  });
                });
              }
            });
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
    /*
      user sends in a new request
      validate the req body
      check if user exist in the database
      validate the token
      if token is valid change the users password to new requested password 
      else reject password change

    */
  },

  updateUserProfile: (req, res) => {
    const { username } = req.auth;
    User.findOneAndUpdate(
      { username },
      { ...req.body.data },
      { new: true },
      (err, done) => {
        try {
          if (err) {
            throw new Error(
              "Something went wrong while trying to update your profile"
            );
          } else {
            if (done) {
              res.json({
                user: { ...done._doc, password: null },
                message: "Profile update was successful"
              });
            }
          }
        } catch (err) {
          res.json({
            error: true,
            message: err.message
          });
        }
      }
    );
  },

  verifyUserAccount: (req, res) => {
    const { email, token } = req.body.data;
    Verification.findOneAndDelete({ token }, (err, doc) => {
      if (err) {
        res.json({
          error: true,
          message: "Couldn't verify your account ,please try again"
        });
      }
      if (doc) {
        User.findOneAndUpdate(
          { email },
          { verified: true },
          { new: true },
          (err, doc) => {
            if (err) {
              res.json({
                error: true,
                message: "Couldn't verify your account, please try again"
              });
            } else {
              res.json({
                user: { ...doc._doc, password: null },
                message: "Account verification was successful"
              });
            }
          }
        );
      } else {
        res.json({
          error: true,
          message: "You have supplied an invalid reset token or link"
        });
      }
    });
  },

  sendPasswordReset: async (req, res) => {
    const { email } = req.body;
    const errorMessage =
      "Something went wrong while trying to send email, please try again";
    const token = randomString({ length: 40 });
    try {
      PasswordReset.findOne({ email }, (err, found) => {
        if (err) {
          throw new Error(errorMessage);
        }
        if (found) {
          PasswordReset.findOneAndUpdate(
            { email },
            { $set: { token } },
            (err, done) => {
              if (err) {
                throw new Error(errorMessage);
              }
              if (!done) {
                throw new Error(errorMessage);
              }
            }
          );
        } else {
          const reset = new PasswordReset({
            email,
            token
          });

          reset.save((err, done) => {
            if (err) {
              throw new Error(errorMessage);
            }
          });
        }
      });
      let sendmail = await sendEmail({ type: "PASSWORDRESET", email, token });
      if (sendmail) {
        res.json({ message: `Reset email has been sent to ${email}` });
      } else {
        throw new Error(errorMessage);
      }
    } catch (err) {
      res.json({
        error: true,
        message: `Something went wrong, please try again and make sure you are connected to the internet`
      });
    }
  },

  verifyResetToken: (req, res) => {
    const { token, email, password } = req.body.data;
    // check to see if there is a token already assigned to the user
    const errorMessage =
      "Something went wrong , please try again or make a new request for a new token";
    try {
      PasswordReset.findOne({ token }, (err, found) => {
        if (err) {
          res.json({
            error: true,
            message: "Something went wrong"
          });
        } else {
          if (found) {
            // check the token against the token in the database
            let tokenInDatabase = found.token;
            let newPassword = BCRYPT.hashSync(password, 10);
            if (tokenInDatabase === token) {
              // verify the user e
              User.findOneAndUpdate(
                { email },
                { $set: { password: newPassword } },
                { new: true },
                (err, done) => {
                  if (err) {
                    res.json({
                      error: true,
                      message: errorMessage
                    });
                  } else {
                    PasswordReset.findOneAndDelete({ email }, (err, suc) => {
                      if (err) {
                      }
                    });
                  }
                }
              );
              res.json({
                message: "Password reset was successful"
              });
            } else {
              res.json({
                error: true,
                message: "Invalid reset token provided"
              });
            }
          } else {
            res.json({
              error: true,
              message: "Invalid reset token provided"
            });
          }
        }
      });
    } catch (err) {
      res.json({
        error: true,
        message: err.message
      });
    }
  },

  requestVerification: async (req, res) => {
    const { email } = req.auth;
    let token = randomString({ length: 40 });
    // sendEmail({ type: "VERIFICATION", email: user.email, _id: user._id });
    // Socket.emit(success, `Verification email has been sent to ${user.email}`);
    try {
      Verification.findOne({ email }, (err, found) => {
        if (err) {
          throw new Error(
            "Something went wrong while trying to send verification email"
          );
        }

        if (found) {
          Verification.findOneAndUpdate(
            { email },
            { $set: { token } },
            (err, done) => {
              if (done) {
              } else {
                throw new Error(
                  "Something went wrong while trying to send verification mail"
                );
              }
            }
          );
        } else {
          const verify = new Verification({
            token,
            email
          });
          verify.save((err, done) => {
            if (err) {
              throw new Error(
                "Something went wrong while trying to send verification mail"
              );
            } else {
            }
          });
        }
      });

      let sendemail = await sendEmail({ type: "VERIFICATION", token, email });
      if (sendemail) {
        res.json({ message: `Verification email has been sent to ${email}` });
      } else {
        throw new Error(
          "Sorry could't send verification email, please try again"
        );
      }
    } catch (err) {
      res.json({
        error: true,
        message: err.message
      });
    }
  }
};
