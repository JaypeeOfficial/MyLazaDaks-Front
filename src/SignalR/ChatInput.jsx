import { Box, Card, TextField } from "@mui/material";
import React, { useState } from "react";

const ChatInput = (props) => {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const isMessageProvided = message && message !== "";

    if (isMessageProvided) {
      props.sendMessage(message);
    } else {
      alert("Please insert user and a message.");
    }
  };

  const onMessageUpdate = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="message">Message:</label>
        <br />
        <input
          type="text"
          id="message"
          name="message"
          value={message}
          onChange={onMessageUpdate}
        />
        <br />
        <br />
        <button>Submit</button>
      </form>
    </div>

    // <Box
    //   sx={{
    //     alignItems: "center",
    //     justifyContent: "center",
    //     display: "flex",
    //     height: 300,
    //     width: 300,
    //     boxShadow: 30,
    //   }}
    // >
    // </Box>
  );
};

export default ChatInput;
