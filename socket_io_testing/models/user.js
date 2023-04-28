const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  userName: {
    type: String,
  },
  status: {
    type: Boolean,
  },
});

module.exports = mongoose.model("User", userSchema);
