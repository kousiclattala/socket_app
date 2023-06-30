import React from "react";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";

const HEIGHT = window.innerHeight;

const CHANNELS = [
  {
    id: 1,
    channelName: "Channel 1",
    lastMessage: "nothing",
  },
  {
    id: 2,
    channelName: "Channel 2",
    lastMessage: "wassup",
  },
  {
    id: 3,
    channelName: "Channel 3",
    lastMessage: "are you there?",
  },
  {
    id: 4,
    channelName: "Channel 4",
    lastMessage: "hahaha",
  },
  {
    id: 5,
    channelName: "Channel 5",
    lastMessage: "hello",
  },
];

function Chatchannels({
  channels,
  selectedChannel,
  setSelectedChannel,
  userName,
  client,
}) {
  const _handleSelectedChannel = (item) => {
    setSelectedChannel(item);

    client.emit("get_messages", {
      channelId: item._id,
    });
  };

  return (
    <Box
      sx={{
        height: HEIGHT,
        width: 300,
        // backgroundColor: "#c3c3c3",
        position: "sticky",
      }}
    >
      {channels.map((item, index) => {
        var participant = item.participants.filter(
          (participant) => participant.name !== userName
        );

        return (
          <Box
            sx={{
              width: 300,
              height: 60,
              border: 1,
              borderColor: "#fff",
              backgroundColor:
                selectedChannel !== undefined &&
                selectedChannel.channelName === item.channelName
                  ? "#fff"
                  : "#c3c3c3",
            }}
            onClick={() => {
              _handleSelectedChannel(item);
            }}
            key={index}
          >
            <Grid
              container
              rowSpacing={0.5}
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "1rem",
              }}
            >
              <Grid item xs={2}>
                <Avatar />
              </Grid>
              <Grid item xs={10}>
                <Typography>{participant[0].name}</Typography>

                <Typography color={"grey"}>{item.lastMessage}</Typography>
              </Grid>
            </Grid>
          </Box>
        );
      })}

      <Grid
        container
        spacing={0}
        //   direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        {/* <Grid item xs={12} direction={"column"}> */}
        <Button
          variant="contained"
          size="medium"
          style={{
            marginTop: "2em",
            alignSelf: "center",
            backgroundColor: "red",
          }}
        >
          Logout
        </Button>
        {/* </Grid> */}
      </Grid>
    </Box>
  );
}

export default Chatchannels;
