import React, { useEffect, useState } from "react";
import Chatusers from "./chatusers";
import { socketClient } from "../service/socketClient";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import Messagescreen from "./messagescreen";
import { TextField, Button } from "@mui/material";
import Chatchannels from "./chatChannels";

const MESSAGES = [
  {
    id: 1,
    message: "Hey user 1",
    sentBy: "kousic",
    sentDate: "2023-04-28",
  },
  {
    id: 2,
    message: "Hey user 2",
    sentBy: "nanda",
    sentDate: "2023-04-28",
  },
  {
    id: 3,
    message: "Hello",
    sentBy: "nanda",
    sentDate: "2023-04-28",
  },
  {
    id: 4,
    message: "Wassup",
    sentBy: "kousic",
    sentDate: "2023-04-28",
  },
  {
    id: 5,
    message: "Nothing much!",
    sentBy: "nanda",
    sentDate: "2023-04-28",
  },
  {
    id: 6,
    message: "What about you?",
    sentBy: "nanda",
    sentDate: "2023-04-28",
  },
  {
    id: 7,
    message: "Quiet boring day",
    sentBy: "kousic",
    sentDate: "2023-04-28",
  },
  {
    id: 8,
    message: "feels like nothing happening in life",
    sentBy: "kousic",
    sentDate: "2023-04-28",
  },
  {
    id: 9,
    message: "Is it?",
    sentBy: "nanda",
    sentDate: "2023-04-28",
  },
  {
    id: 10,
    message: "Dont worry everything will be alright",
    sentBy: "nanda",
    sentDate: "2023-04-28",
  },
];
const CHANNEL_2_MESSAGES = [
  {
    id: 1,
    message: "channel 2 message",
    sentBy: "kalyan",
    sentDate: "2023-04-28",
  },
  {
    id: 2,
    message: "channel 2 message",
    sentBy: "kalyan",
    sentDate: "2023-04-28",
  },
];
const CHANNEL_3_MESSAGES = [
  {
    id: 1,
    message: "channel 3 message",
    sentBy: "sai",
    sentDate: "2023-04-28",
  },
  {
    id: 2,
    message: "channel 3 message",
    sentBy: "sai",
    sentDate: "2023-04-28",
  },
];
const CHANNEL_4_MESSAGES = [
  {
    id: 1,
    message: "channel 4 message",
    sentBy: "kousic",
    sentDate: "2023-04-28",
  },
  {
    id: 2,
    message: "channel 4 message",
    sentBy: "kousic",
    sentDate: "2023-04-28",
  },
];
const CHANNEL_5_MESSAGES = [
  {
    id: 1,
    message: "channel 5 message",
    sentBy: "kousic",
    sentDate: "2023-04-28",
  },
  {
    id: 2,
    message: "channel 5 message",
    sentBy: "kousic",
    sentDate: "2023-04-28",
  },
];

function Chats() {
  const client = socketClient.getInstance().getSocketClient();

  const [textMessage, setTextMessage] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState({});
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);

  const { userName } = useParams();

  const _onChangeText = (e) => {
    console.log(e.target.value);
    setTextMessage(e.target.value);
    setTypingUser(userName);
  };

  const _getChannels = () => {
    var userData = localStorage.getItem("@userdata");
    var parsedUser = JSON.parse(userData);

    setUserData(parsedUser);

    // console.log("user data ===>", parsedUser);

    client.emit("get_channels", {
      participantId: parsedUser._id,
    });
  };

  useEffect(() => {
    _getChannels();
  }, []);

  //   console.log("selected channel ==>", selectedChannel);

  client.on("get_channels", function (data) {
    // console.log("all channels ===>", data);

    setChannels(data);
  });

  client.on("get_messages", function (data) {
    console.log("channel messages ==>", data);

    setMessages(data);
  });

  client.on("send_message", function (data) {
    console.log("messages ==>", data);

    setMessages(data);
  });

  // console.log("channels ==>", channels);
  // console.log("messages ==>", messages);

  const _onSend = () => {
    const msgData = {
      message: textMessage,
      msgType: "text",
      channel: selectedChannel._id,
      user: userData._id,
    };

    client.emit("send_message", msgData);
    setTextMessage("");
  };

  return (
    <Grid container>
      <Grid item xs={3}>
        <Chatchannels
          userName={userName}
          channels={channels}
          selectedChannel={selectedChannel}
          setSelectedChannel={setSelectedChannel}
          client={client}
        />
      </Grid>
      <Grid item xs={9}>
        <Messagescreen
          userName={userName}
          messages={messages}
          typingUser={typingUser}
        />

        <div
          style={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "#fff",
            height: "5%",
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          {typingUser !== "" && typingUser !== userName && (
            <div
              style={{
                alignSelf: "flex-start",
                height: 30,
              }}
            >
              <Typography>{typingUser} is typing...</Typography>
            </div>
          )}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: typingUser !== "" && typingUser !== userName ? 0 : 20,
            }}
          >
            <TextField
              style={{
                width: "90%",
              }}
              variant="outlined"
              color="secondary"
              autoFocus
              label="Enter message"
              value={textMessage}
              onChange={_onChangeText}
              inputProps={{
                color: "#fff",
              }}
            />
            <Button
              variant="contained"
              style={{
                marginLeft: 10,
              }}
              onClick={_onSend}
            >
              Send
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default Chats;
