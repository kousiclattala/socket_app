import React, { useEffect, useRef } from "react";
import { List, ListItemText, Typography, Card } from "@mui/material";

function Messagescreen({ userName, messages, typingUser }) {
  const bottomRef = useRef(null);

  // console.log("messages ===>", messages);

  // useEffect(() => {
  //   messages.length > 0 && bottomRef.current.scrollIntoView();
  // }, [messages]);

  return (
    <>
      <List sx={{ width: "100%", bgcolor: "#fff" }}>
        {messages.map((item, index) => (
          <div
            align={item.user.name === userName ? "right" : "left"}
            style={{
              marginTop: 10,
            }}
            ref={bottomRef}
            key={index}
          >
            <Card
              variant="outlined"
              style={{
                width: "30%",
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor:
                  item.user.name === userName ? "#4287f5" : "#25539c",
              }}
            >
              <ListItemText
                primary={item.message}
                primaryTypographyProps={{
                  color: "#fff",
                }}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline", fontStyle: "italic" }}
                      component="span"
                      variant="body2"
                      color="#fff"
                    >
                      {item.user.name}
                    </Typography>
                  </React.Fragment>
                }
              />
            </Card>
          </div>
        ))}
      </List>
    </>
  );
}

export default Messagescreen;
