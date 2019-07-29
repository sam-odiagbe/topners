const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const withdrawSchema = new Schema({
  amount: {
    type: Number
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Withdraw", withdrawSchema);
