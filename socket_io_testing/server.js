const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const mongoose = require("mongoose");
const { socketServer } = require("./controllers/socket");
const { createChannel, getChannel } = require("./controllers/user");

var sockets = [];

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/socket_chat")
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log("Error in connecting DB", err);
  });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/testing", (req, res) => {
  res.send("<h1>Testing Server is working...</h1>");
});

app.get("/getChannel/:participantId", getChannel);

app.post("/createChannel", createChannel);

// console.log("sockets", sockets);

io.on("connection", (socket) => socketServer(socket, io));

server.listen(3030, () => {
  console.log("server started on port: 3030");
});
