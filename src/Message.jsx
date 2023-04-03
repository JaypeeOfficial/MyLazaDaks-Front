import { textAlign } from "@mui/system";
import moment from "moment";
import React from "react";
import "./Styles/chatstyleRight.css";
import "./Styles/chatstyleLeft.css";
import { useDispatch, useSelector } from "react-redux";

const Message = (props) => {
  var user = useSelector((state) => state.user);

  return (
    <div>
      <p style={{ textAlign: "center" }}>
        {moment(props.timeStamp).calendar()}
      </p>
      <div
        className={user?.fullName === props.user ? "thought" : "thoughtLeft"}
        style={{
          flexDirection: "column",
        }}
      >
        <p>
          <strong>{props.user}</strong>
          <br />
        </p>

        <p
          style={{
            wordWrap: "break-word",
            width: "100%",
          }}
        >
          {props.message}
        </p>
      </div>
    </div>
  );
};

export default Message;
