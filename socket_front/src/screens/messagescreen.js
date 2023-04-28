import React, { useEffect, useRef } from "react";
import { List, ListItemText, Typography, Card } from "@mui/material";

function Messagescreen({ userName, messages, typingUser }) {
  const bottomRef = useRef(null);

  console.log("typing user", typeof typingUser, typingUser);

  useEffect(() => {
    messages.length > 0 && bottomRef.current.scrollIntoView();
  }, [messages]);

  return (
    <>
      <List sx={{ width: "100%", bgcolor: "#fff" }}>
        {messages.map((item) => (
          <div
            align={item.user === userName ? "right" : "left"}
            style={{
              marginTop: 10,
            }}
            ref={bottomRef}
          >
            <Card
              variant="outlined"
              style={{
                width: "30%",
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: item.user === userName ? "#4287f5" : "#25539c",
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
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="#fff"
                    >
                      {item.user}
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
