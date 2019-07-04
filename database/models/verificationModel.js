const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const verificationShema = {
  user: { type: Schema.Types.ObjectId, ref: "User" },
  verificationtoken: String
};

module.exports = mongoose.model("Verification", verificationShema);
