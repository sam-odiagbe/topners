const JOI = require("joi");
const { signupSchema, loginSchema, resetPassword } = require("./joiSchema");
module.exports = {
  validateIncomingSignupReqBody: data => {
    return JOI.validate(data, signupSchema);
  },
  validateIncomingLoginReqBody: data => {
    return JOI.validate(data, loginSchema);
  },
  validateIncomingResetPasswordBody: data => {
    return JOI.validate(data, resetPassword);
  }
};
