const {
  createUser,
  changeUserStatus,
  addMessage,
  getMessages,
  getUserDetails,
  getUserChannels,
  channelMessages,
  sendMessage,
} = require("./user");

var sockets = [];

// exports.socketServer = (socket, io) => {
//   socket.on("user joined", async (data) => {
//     // console.log(data);

//     sockets.push({
//       userName: data.userName,
//       sock_id: socket.id,
//     });

//     var users = await createUser(data);
//     var messages = await getMessages();

//     // console.log("all users on join ===>", users);

//     io.emit("user joined", {
//       users: users,
//       messages: messages,
//     });

//     // console.log("sockets ==>", sockets);
//   });

//   socket.on("user leave", async (data) => {
//     var users = await changeUserStatus(data);

//     // console.log("all users on leave ===>", users);

//     io.emit("user leave", users);
//   });

//   socket.on("is typing", (data) => {
//     io.emit("is typing", data);
//   });

//   socket.on("new message", async (data) => {
//     const messages = await addMessage(data);

//     io.emit("new message", messages);
//   });

//   socket.on("disconnect", async (reason) => {
//     var id = sockets.find((socks) => socks.sock_id === socket.id);

//     // console.log("id", id);

//     var users = await changeUserStatus(id);

//     io.emit("user leave", users);
//   });
// };

exports.socketServer = (socket, io) => {
  socket.on("user_login", async (data) => {
    const user = await getUserDetails(data);

    io.emit("user_login", user);
  });

  socket.on("get_channels", async (data) => {
    console.log("get_channels", data);

    const channels = await getUserChannels(data.participantId);

    io.emit("get_channels", channels);
  });

  socket.on("get_messages", async (data) => {
    const messages = await channelMessages(data.channelId);

    io.emit("get_messages", messages);
  });

  socket.on("send_message", async (msgData) => {
    const messages = await sendMessage(msgData);

    io.emit("send_message", messages);
  });
};
