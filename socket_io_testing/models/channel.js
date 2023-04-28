const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
  channelName: {
    type: String,
  },
  participants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Message",
    },
  ],
});

module.exports = mongoose.model("Channel", channelSchema);
