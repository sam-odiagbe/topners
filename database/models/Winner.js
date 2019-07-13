const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const winnerSchema = new Schema({
  totalWinners: 0,
  winners: [Schema.Types.ObjectId],
  blockedOut: [Schema.Types.ObjectId]
});

module.exports = mongoose.model("winner", winnerSchema);
