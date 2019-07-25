const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const referenceSchema = new Schema({
  reference: {
    type: String,
    required: true
  },
  done: {
    type: Boolean
  }
});

module.exports = mongoose.model("Reference", referenceSchema);
