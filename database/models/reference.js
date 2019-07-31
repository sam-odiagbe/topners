const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const referenceSchema = new Schema({
  reference: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false,
    required: true
  }
});

module.exports = mongoose.model("Reference", referenceSchema);
