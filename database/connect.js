const mongoose = require("mongoose");
const db = mongoose.connection;
mongoose.connect("mongodb://localhost/topners", {
  useNewUrlParser: true
});

db.on("error", () => {
  console.log("something went wrong");
});

db.on("open", () => {
  console.log("we are connected");
});
