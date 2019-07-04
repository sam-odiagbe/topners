const mongoose = require("mongoose");
const BCRYPT = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  bank: String,
  account_balance: Number,
  totalAmountWon: Number,
  signupForNextGameShow: Boolean,
  verified: Boolean
});

UserSchema.methods.hashPassword = password => {
  return BCRYPT.hashSync(password, 10);
};

module.exports = mongoose.model("User", UserSchema);
