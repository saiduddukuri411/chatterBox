const express = require("express");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const Httperror = require("./models/http_error");
const http = require("http");
const genralRouter = require("./Routes/router");
const userRoute = require("./Routes/users");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {
  addUser,
  removeUser,
  getUser,
  getUserById,
  users,
} = require("./controllers/chats");

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
  sock.on("join", ({ userName, token }, callback) => {
    const decodeToken = jwt.verify(token, process.env.JWT_KEY);
    const room = decodeToken.groupId;
    //const room=decodeToken.groupId
    const { error, user } = addUser({
      id: sock.id,
      name: userName,
      room: room,
    });
    if (error) {
      return callback(error);
    }
    sock.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room`,
      active: users,
    });
    sock.broadcast
      .to(user.room)
      .emit("message", {
        user: "admin",
        text: `${user.name}, has joined!`,
        active: users,
      });
    sock.join(user.room);
    callback();
  });
  sock.on("sendMesssage", (message, callback) => {
    const user = getUser(sock.id);
    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
      active: users,
    });
    callback();
  });

  sock.on("disconnect", () => {
    const user = removeUser(sock.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left`,
        active: users,
      });
    }
  });
  sock.on("logout", () => {
    const user = removeUser(sock.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left`,
        active: users,
      });
    }
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
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-ib2iv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

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
