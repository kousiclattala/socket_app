const User = require("../models/user");
const Message = require("../models/message");

exports.createUser = async (data) => {
  try {
    const { name, userName, email, status } = data;

    const user = await User.findOne({ userName });

    console.log("user ===>", user);

    if (user == null) {
      await User.create({
        name,
        userName,
        email,
        status,
      });

      const users = await User.find({});

      return users;
    }

    user.status = data.status;

    await user.save();

    const users = await User.find({});

    return users;
  } catch (error) {
    return error;
  }
};

exports.changeUserStatus = async (data) => {
  try {
    const { userName } = data;

    const user = await User.findOne({ userName });

    if (user == null) {
      console.log("No user found");
    }

    user.status = data.status;

    await user.save();

    const users = await User.find({});

    return users;
  } catch (error) {
    return error;
  }
};

exports.addMessage = async (data) => {
  try {
    const { message, msgType, user } = data;

    await Message.create({
      message,
      msgType,
      user,
    });

    const messages = await Message.find({});

    return messages;
  } catch (error) {
    console.log("error in adding message ==>", error);
  }
};

exports.getMessages = async (data) => {
  try {
    const messages = await Message.find({});

    return messages;
  } catch (error) {
    console.log("error in getting messages", error);
  }
};
