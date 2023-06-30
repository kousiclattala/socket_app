const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
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
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    msgRead: {
      type: Boolean,
      default: false,
    },
    msgDelivered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
