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
                user.account_balance = 10000;
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
                    // create verification token  for user
                    // email verification to user
                    sendEmail({
                      type: "VERIFICATION",
                      email: user.email,
                      _id: user._id
                    });
                    // sendEmailVerification(doc.email);
                    // res.send("Account Created");
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
  requestpasswordreset: (req, res) => {
    const { email } = req.query;
    // send email verification to this user email
    const token = randomString({ length: 32 });

    let reset = new PasswordReset({
      email,
      token
    });
    reset.save(async (err, doc) => {
      if (err) {
        //
      }
      if (doc) {
        try {
          const sendPasswordReset = await sendEmail({
            user: { email, _id: null },
            type: "PASSWORD-RESET",
            token
          });
          res.json({
            error: null,
            message: "Password Reset Link has been sent to the provided email"
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
  }
};
