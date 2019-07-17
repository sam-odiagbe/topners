const JOI = require("joi");

module.exports = {
  signupSchema: JOI.object().keys({
    name: JOI.string().required(),
    username: JOI.string()
      .required()
      .trim()
      .regex(/^[a-zA-Z0-9_]{4,30}$/),
    email: JOI.string()
      .email()
      .required(),
    password: JOI.string()
      .trim()
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,30}$/),
    confirm_password: JOI.optional()
  }),
  loginSchema: JOI.object().keys({
    email: JOI.string()
      .required()
      .email()
      .trim(),
    password: JOI.string()
      .trim()
      .optional()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,30}$/)
  }),

  resetPassword: JOI.object().keys({
    email: JOI.string()
      .email()
      .required(),
    token: JOI.string().required()
  })
};
