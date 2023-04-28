const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  msgType: {
    type: String,
  },
  channel: {
    type: mongoose.Schema.ObjectId,
    ref: "Channel",
  },
  user: {
    type: String,
  },
});

module.exports = mongoose.model("Message", messageSchema);
