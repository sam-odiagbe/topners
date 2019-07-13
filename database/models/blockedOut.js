const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blockOutSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" }
});

module.exports = mongoose.model("BlockedOut", blockOutSchema);
