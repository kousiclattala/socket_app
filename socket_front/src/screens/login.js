import React, { useState } from "react";
import { TextField, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { socketClient } from "../service/socketClient";

function Login() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  const client = socketClient.getInstance().getSocketClient(userName);

  // const _onUserName = () => {
  //   client.emit("user joined", {
  //     userName: userName,
  //     name: userName,
  //     email: `${userName}@gmail.com`,
  //     status: true,
  //   });

  //   navigate(`/chatchannels/${userName}`);
  // };
  const _onUserName = () => {
    client.emit("user_login", {
      userName: userName,
      name: userName,
      email: `${userName}@gmail.com`,
      status: true,
    });

    navigate(`/chatchannels/${userName}`);
  };

  client.on("user_login", function (data) {
    // console.log("user data ==>", data);

    localStorage.setItem("@userdata", JSON.stringify(data));
  });

  return (
    <Grid
      container
      spacing={0}
      //   direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3} direction={"column"}>
        <TextField
          id="outlined-basic"
          label="Enter Username"
          variant="outlined"
          size="small"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <Button
          variant="contained"
          size="medium"
          style={{
            marginTop: "2em",
            alignSelf: "center",
            marginLeft: "2em",
          }}
          onClick={() => {
            _onUserName();
          }}
        >
          Enter Username
        </Button>
      </Grid>
    </Grid>
  );
}

export default Login;
