const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connection = require("./database/connect");
// const cron = require("./database/helpers/cronjobs");
const http = require("http").createServer(app);
const io = require("./IO/socket")(http);
const socketacitons = require("./IO/actions")(io);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const allowedOrigins = [
  "https://topner.herokuapp.com",
  "https://poseidonzeus.herokuapp.com",
  "http://localhost:3000"
];

const corsOption = {
  origin: "https://topner.herokuapp.com",
  credentials: true
};
app.use(cors(corsOption));
app.use(cookieParser());

// routes
app.use("/auth", require("./routes/authRoutes"));
app.use(require("./routes/gameRoutes"));
app.use(require("./routes/adminRoutes"));

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", [
    "https://topner.herokuapp.com",
    "https://poseidonzeus.herokuapp.com",
    "http://localhost:3000",
    "http://topner.herokuapp.com",
    "topner.herokuapp.com",
    "poseidonzeus.herokuapp.com"
  ]);

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

http.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
