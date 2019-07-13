const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const winnerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Winner", winnerSchema);
