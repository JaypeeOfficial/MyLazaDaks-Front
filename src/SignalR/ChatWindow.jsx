import React, { useEffect, useRef } from "react";
import Message from "../Message";

const ChatWindow = (props) => {
  const chat = props.chat.map((m, index) => (
    <Message
      key={index}
      user={m.user}
      message={m.message}
      timeStamp={m.timeStamp}
    />
  ));

  return (
    <div
      style={{
        minHeight: "340px",
      }}
    >
      {chat}
    </div>
  );
};

export default ChatWindow;
