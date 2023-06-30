const User = require("../models/user");
const Message = require("../models/message");
const Channel = require("../models/channel");
const channel = require("../models/channel");

exports.createUser = async (data) => {
  try {
    const { name, userName, email, status } = data;

    const user = await User.findOne({ userName });

    // console.log("user ===>", user);

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

exports.getUserDetails = async (data) => {
  try {
    const { name, userName, email, status } = data;

    const user = await User.findOne({ userName });

    // console.log("user ===>", user);

    if (user == null) {
      var newUser = await User.create({
        name,
        userName,
        email,
        status,
      });

      return newUser;
    }

    user.status = data.status;

    await user.save();

    return user;
  } catch (error) {
    return error;
  }
};

exports.getUserChannels = async (userId) => {
  try {
    const channels = await Channel.find({ participants: userId }).populate(
      "participants"
    );

    // console.log("all channels", channels);

    return channels;
  } catch (error) {
    return error;
  }
};

exports.createChannel = async (req, res) => {
  const { channelName, participants, lastMessage, channelType } = req.body;

  const channel = await Channel.create({
    channelName,
    participants,
    lastMessage,
    channelType,
  });

  res.status(200).json({
    status: true,
    msg: "Channel created",
    channel,
  });
};

exports.getChannel = async (req, res) => {
  try {
    const { participantId } = req.params;

    const channel = await Channel.find({
      participants: participantId,
    }).populate("participants");

    res.status(200).json({
      status: true,
      code: 200,
      msg: "Channel fetched",
      channel,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.channelMessages = async (channelId) => {
  try {
    const messages = await Message.find({ channel: channelId }).populate(
      "user channel"
    );

    return messages;
  } catch (error) {
    return error;
  }
};

exports.sendMessage = async (msgData) => {
  try {
    const { message, msgType, channel, user } = msgData;

    await Message.create({
      message,
      msgType,
      channel,
      user,
    });

    const messages = await Message.find({ channel: channel }).populate(
      "channel user"
    );

    const channelss = await Channel.findById(channel);

    channelss.lastMessage = message;

    await channelss.save();

    return messages;
  } catch (error) {
    return error;
  }
};
