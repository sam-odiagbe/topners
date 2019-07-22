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
  }
});

module.exports = mongoose.model("Game", gameSchema);
