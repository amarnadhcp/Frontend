import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import ChatContainer from "../../components/common/ChatComponent";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
const URL = import.meta.env.Backent_URL;

function Chat() {
  const socket = useRef();
  const userData = useSelector((state) => state.user);
  useEffect(() => {
    if (userData.id) {
      // console.log(URL,"hhhhh");
      socket.current = io("http://localhost:8800");
      console.log(userData.id);
      socket.current.emit("add-user", userData.id);
      console.log("samyuktheee");

    }
  }, []);

  const params = useParams();
  const sender = params.id;
  return <>{sender && <ChatContainer sender={sender} socket={socket} />}</>;
}

export default Chat;
