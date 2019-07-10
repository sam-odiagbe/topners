const mongoose = require("mongoose");
const db = mongoose.connection;

// mongodb://sammyodiagbe:DjAckGFb7P7zuar@ds347367.mlab.com:47367/heroku_86xxvb3j
mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://sammyodiagbe:DjAckGFb7P7zuar@ds347367.mlab.com:47367/heroku_86xxvb3j",
  {
    useNewUrlParser: true
  }
);

db.on("error", () => {
  console.log("something went wrong");
});

db.on("open", () => {
  console.log("we are connected");
});
