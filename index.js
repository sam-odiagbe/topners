const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const connection = require("./database/connect");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/auth", require("./routes/authRoutes"));

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
