const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const verificationShema = {
  email: { type: String, required: true },
  token: { type: String, required: true }
};

module.exports = mongoose.model("Verification", verificationShema);
