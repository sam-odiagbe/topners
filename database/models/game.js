const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  kickofftime: { type: Date, required: true },
  gameison: { type: Boolean, default: false },
  question: {
    question: String,
    option: Array,
    answer: String
  },
  totalNumberOfWinners: {
    type: Number,
    required: true,
    default: 0
  },
  possibleWinners: {
    default: 0,
    required: true,
    type: Number
  },
  pricepool: {
    type: Number
  },
  totalNumberOfSignedupUsers: {
    type: Number,
    default: 0,
    required: true
  }
});

module.exports = mongoose.model("Game", gameSchema);
