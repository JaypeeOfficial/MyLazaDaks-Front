import React, { useState, useEffect, useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import apiClient from "../apiClient";
import { Card, FormLabel, IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import { useCallback } from "react";

const userData = JSON.parse(sessionStorage.getItem("userData"));

const Chat = () => {
  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);

  const [messageInput, setMessageInput] = useState("");

  latestChat.current = chat;

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7239/hubs/chat")
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then((result) => {
        console.log("Connected!");

        connection.on("ReceiveMessage", (message) => {
          const updatedChat = [...latestChat.current];
          updatedChat.push(message);

          setChat(updatedChat);
        });
      })
      .catch((e) => console.log("Connection failed: ", e));
  }, []);

  const sendMessage = async (message) => {
    const chatMessage = {
      user: userData.fullName,
      message: message,
      timeStamp: new Date(),
    };
    try {
      await apiClient.post("Chat/messages", chatMessage);
    } catch (e) {
      console.log("Sending message failed.", e);
    }
  };

  const onMessageUpdate = (e) => {
    setMessageInput(e.target.value);
  };

  const isMessageProvided = messageInput && messageInput !== "";

  const onSubmit = (e) => {
    e.preventDefault();
    if (isMessageProvided) {
      sendMessage(messageInput);
      setMessageInput("");
    } else {
      alert("Please insert a message.");
    }
  };

  function scrollView() {
    const chatbox = document.getElementById("chatBox");
    chatbox.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    scrollView();
  }, [chat]);

  console.log(latestChat.current);

  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "flex-end",
        display: "flex",
        flexDirection: "column",
        overflow: "scroll",
      }}
      component="form"
    >
      <ChatWindow chat={chat} />

      <div ref={latestChat} id="chatBox" />

      <TextField
        variant="standard"
        fullWidth
        placeholder="Type your message here"
        value={messageInput}
        onChange={onMessageUpdate}
        InputProps={{
          sx: {
            "& input": {
              textAlign: "left",
              fontStyle: "italic",
              marginLeft: "15px",
            },
          },
          endAdornment: (
            <IconButton onClick={onSubmit}>
              <SendIcon
                sx={{
                  color: "pink",
                }}
              ></SendIcon>
            </IconButton>
          ),
        }}
        sx={{
          background: "white",
          position: "absolute",
          bottom: 0,
          zIndex: 9999999999,
          boxShadow: "0 4px 20px pink",
        }}
      ></TextField>
    </Box>
  );
};

export default Chat;
