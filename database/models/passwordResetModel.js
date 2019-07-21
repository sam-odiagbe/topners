const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passwordResetSchema = new Schema({
  email: String,
  token: String
});

module.exports = mongoose.model("PasswordReset", passwordResetSchema);
