import React, { useEffect, useState } from "react";
import Chatusers from "./chatusers";
import { socketClient } from "../service/socketClient";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import Messagescreen from "./messagescreen";
import { TextField, Button } from "@mui/material";

// const MESSAGES = [
//   {
//     id: 1,
//     message: "Hey user 1",
//     sentBy: "kousic",
//     sentDate: "2023-04-28",
//   },
//   {
//     id: 2,
//     message: "Hey user 2",
//     sentBy: "nanda",
//     sentDate: "2023-04-28",
//   },
//   {
//     id: 3,
//     message: "Hello",
//     sentBy: "nanda",
//     sentDate: "2023-04-28",
//   },
//   {
//     id: 4,
//     message: "Wassup",
//     sentBy: "kousic",
//     sentDate: "2023-04-28",
//   },
//   {
//     id: 5,
//     message: "Nothing much!",
//     sentBy: "nanda",
//     sentDate: "2023-04-28",
//   },
//   {
//     id: 6,
//     message: "What about you?",
//     sentBy: "nanda",
//     sentDate: "2023-04-28",
//   },
//   {
//     id: 7,
//     message: "Quiet boring day",
//     sentBy: "kousic",
//     sentDate: "2023-04-28",
//   },
//   {
//     id: 8,
//     message: "feels like nothing happening in life",
//     sentBy: "kousic",
//     sentDate: "2023-04-28",
//   },
//   {
//     id: 9,
//     message: "Is it?",
//     sentBy: "nanda",
//     sentDate: "2023-04-28",
//   },
//   {
//     id: 10,
//     message: "Dont worry everything will be alright",
//     sentBy: "nanda",
//     sentDate: "2023-04-28",
//   },
// ]

function Chatscreen() {
  const client = socketClient.getInstance().getSocketClient();

  const { userName } = useParams();

  const [textMessage, setTextMessage] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const _onPageLoad = (e) => {
      // console.log("on page load");
      client.emit("user joined", {
        userName: userName,
        name: userName,
        email: `${userName}@gmail.com`,
        status: true,
      });
    };

    if (document.readyState === "complete") {
      _onPageLoad();
    } else {
      window.addEventListener("load", _onPageLoad);

      return () => {
        window.removeEventListener("load", _onPageLoad);
      };
    }
  }, [client, userName]);

  client.on("disconnect", () => {
    client.emit("user leave", {
      userName: userName,
      status: false,
    });
  });

  client.on("user joined", function (data) {
    // console.log(data);
    // setIsOnline(data.status);
    setUsers(data.users);
    setMessages(data.messages);
  });

  client.on("is typing", function (data) {
    setTypingUser(data.user);
  });

  const _onChangeText = (e) => {
    console.log("text ==>", e.target.value);
    setTextMessage(e.target.value);

    if (e.target.value.length > 0) {
      client.emit("is typing", {
        user: userName,
        status: true,
      });
    } else {
      client.emit("is typing", {
        user: "",
        status: true,
      });
    }
  };

  const _onSend = () => {
    // const data = {
    //   message: textMessage,
    //   sentBy: userName,
    //   sentDate: "2023-04-28",
    // };

    client.emit("new message", {
      message: textMessage,
      msgType: "text",
      user: userName,
    });

    client.on("new message", function (data) {
      setMessages(data);
    });

    setTextMessage("");
    client.emit("is typing", {
      user: "",
      status: true,
    });
  };

  return (
    <Grid container>
      <Grid item xs={3}>
        <Chatusers
          client={client}
          userName={userName}
          users={users}
          setUsers={setUsers}
        />
      </Grid>
      <Grid item xs={9}>
        <Messagescreen
          userName={userName}
          messages={messages}
          typingUser={typingUser}
        />

        {/* {typingUser !== "" && typingUser !== userName && (
          <div
            style={{
              position: "sticky",
              bottom: 0,
              width: "100%",
              backgroundColor: "#fff",
              height: "2%",
              // display: "flex",
              zIndex: 100,
            }}
          >
            <Typography>{typingUser} is typing...</Typography>
          </div>
        )} */}
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

export default Chatscreen;
