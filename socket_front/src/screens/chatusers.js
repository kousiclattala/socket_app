import React from "react";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HEIGHT = window.innerHeight;

function Chatusers({ client, userName, users, setUsers }) {
  //   const [isOnline, setIsOnline] = useState(false);
  // const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  client.on("user leave", function (data) {
    console.log("users leave===>", data);
    // setIsOnline(data.status);
    setUsers(data);
  });

  const _logout = () => {
    client.emit("user leave", {
      userName: userName,
      status: false,
    });

    navigate("/");
  };

  return (
    <Box
      sx={{
        height: HEIGHT,
        width: 300,
        backgroundColor: "#c3c3c3",
        position: "sticky",
      }}
    >
      {users.map((item) => (
        <Box
          sx={{
            width: 300,
            height: 60,
            border: 1,
            borderColor: "#fff",
          }}
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
              <Typography>{item.userName}</Typography>
              {item.status ? (
                <Typography color={"green"}>Online</Typography>
              ) : (
                <Typography color={"red"}>Offline</Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      ))}

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
          onClick={() => _logout()}
        >
          Logout
        </Button>
        {/* </Grid> */}
      </Grid>
    </Box>
  );
}

export default Chatusers;
