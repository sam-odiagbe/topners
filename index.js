const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connection = require("./database/connect");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOption = {
  origin: "http://localhost:3000",
  credentials: true
};
app.use(cors(corsOption));
app.use(cookieParser());

// routes
app.use("/auth", require("./routes/authRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
