import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// import ChatContainer from "../../components/common/ChatComponent";
import { findUser } from "../../api/userApi";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import ChatSideBar from "../../components/Chat/ChatSideBar";
import ChatBody from "../../components/Chat/ChatBody";
const URL = import.meta.env.VITE_Backent_URL;

function Chat() {
  const params = useParams();
  const socket = useRef();
  const userData = useSelector((state) => state.user);
  const [sender, setSender] = useState({});

  useEffect(()=>{
    if(params.id){
    

      findUser(params.id).then((res)=>{
        setSender({
          id: res.data.user._id,
          username: res.data.user.username,
          img: res.data.user.img,
        });
      })
    }
  },[params])
  console.log(sender,"the sender");

  useEffect(() => {
    if (userData.id) {
      socket.current = io(URL);
      socket.current.emit("add-user", userData.id);
    }
  }, []);

  return (
    <div>
      <div class="flex h-screen antialiased text-gray-800">
        <div class="flex flex-row h-full w-full overflow-x-hidden">
          <div class="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div className="font-monoton  text-2xl cursor-pointer flex items-center bg-white">
              <span className="text-3xl  mr-1 pt-2  text-purple-500 ">
                {" "}
                <ion-icon name="finger-print-outline"></ion-icon>
              </span>
              <span className="bg-gradient-to-r  from bg-purple-500 to-pink-600 text-transparent bg-clip-text ">
                Messages
              </span>
            </div>
            <Link to="/home">
              <div class="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
                <div class="h-20 w-20 rounded-full border overflow-hidden">
                  <img src={userData.image || "https://res.cloudinary.com/dvprhxg7x/image/upload/v1692803989/asset/noavatar_vhrf74.jpg"} class="h-full w-full" />
                </div>
                <div class="text-sm font-semibold mt-2">
                  {userData?.username}
                </div>
              </div>
            </Link>
            <ChatSideBar setSender={setSender} socket={socket} />
          </div>
          {sender.id && <ChatBody  sender={sender} socket={socket}/>}  
        </div>
      </div>
    </div>
  );
}

export default Chat;
