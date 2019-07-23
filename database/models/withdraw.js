const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const withdrawSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Withdraw", withdrawSchema);
