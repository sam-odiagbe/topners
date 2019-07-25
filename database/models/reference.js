const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const referenceSchema = new Schema({
  referece: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Reference", referenceSchema);
