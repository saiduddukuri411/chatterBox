const express = require("express");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const Httperror = require("./models/http_error");
const http = require("http");
const genralRouter = require("./Routes/router");
const userRoute = require("./Routes/users");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,HEAD,PUT"
  );

  next();
});
const server = http.createServer(app);
const io = socketio(server);
io.on("connection", (sock) => {
  console.log("we have new connection");

  sock.on("disconnect", () => {
    console.log("user had left");
  });
});

app.use("/socket/api", genralRouter);
app.use("/chatterapi/users", userRoute);
app.use((req, res, next) => {
  const error = new Httperror("invalid Route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});

const url =
  "mongodb+srv://saiduddukuri:Sgsgbs!456@cluster0-ib2iv.mongodb.net/chatterdb?retryWrites=true&w=majority";

mongoose
  .connect(url)
  .then(
    server.listen(PORT, () => {
      console.log(`server has started on port ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
