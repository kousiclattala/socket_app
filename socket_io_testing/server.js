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
const {
  createUser,
  changeUserStatus,
  addMessage,
  getMessages,
} = require("./controllers/user");

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

io.on("connection", (socket) => {
  // var users = [];

  socket.on("user joined", async (data) => {
    // console.log(data);

    var users = await createUser(data);
    var messages = await getMessages();

    // console.log("all users on join ===>", users);

    io.emit("user joined", {
      users: users,
      messages: messages,
    });
  });

  socket.on("user leave", async (data) => {
    var users = await changeUserStatus(data);

    // console.log("all users on leave ===>", users);

    io.emit("user leave", users);
  });

  socket.on("is typing", (data) => {
    io.emit("is typing", data);
  });

  socket.on("new message", async (data) => {
    const messages = await addMessage(data);

    io.emit("new message", messages);
  });
});

server.listen(3030, () => {
  console.log("server started on port: 3030");
});
