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
//const sgmail = require("./database/helpers/mailer");

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
app.use(require("./routes/gameRoutes"));
app.use(require("./routes/adminRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

http.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
