const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const connection = require("./database/connect");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/auth", require("./routes/authRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
