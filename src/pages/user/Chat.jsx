import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import userRequest from "../../utils/userRequest";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
const URL = import.meta.env.Backent_URL;

const Chat = () => {
  const { sellerId } = useParams();
  const { id } = useSelector((state) => state.user);
  const socket = useRef();
  const [currentUser, setCurrentUser] = useState(id);
  const [selectedUser, setSelectedUser] = useState(sellerId);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [msg, setMsg] = useState("");
  const scrollRef = useRef();

  useEffect(async () => {
    const response = await userRequest.post("users/getAllmessage", {
      to: selectedUser,
    });
    setMessages(response.data);
    console.log(messages);
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(URL);
      socket.current.emit("add-user", currentUser);
    }
  }, [currentUser]);

  // useEffect(() => {
  //   if (id) {
  //     setSelectedUser({ userId: id });
  //     const res = userRequest.get("users/getchat",{id})
  //   }
  // }, [id]);

  // const handleUserSelect = (user) => {
  //   setSelectedUser({ userId: user });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("heree it is ");
    console.log(msg);
    const sentmsg = userRequest.post("/users/sentmsg", {
      to: selectedUser,
      message: msg,
    });

    socket.current.emit("send-msg", {
      to: selectedUser,
      form: currentUser,
      message: msg,
    });
    const msg = [...messages];
    msg.push({ fromSelf: true, message: msg });
    setMessages(msg);

    useEffect(() => {
      if (socket.current) {
        socket.current.on("msg-recieve", (msg) => {
          setArrivalMessage({ fromself: false, message: msg });
        });
      }
    }, []);

    useEffect(() => {
      arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior });
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 bg-white border-r p-4 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">Chat Users</h1>
        {/* <ul className="space-y-2">
          {messages.map((message) => (
            <li
              key={message._id} // Use _id as the key
              onClick={() => handleUserSelect(message.userId)}
              className={`p-2 cursor-pointer ${
                selectedUser && selectedUser.userId === message.userId ? 'bg-gray-200' : ''
              }`}
            >
              {m.userId}
            </li>
          ))}
        </ul> */}
      </div>
      <div className="w-3/4 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="breadcrumbs text-gray-500 text-sm">
            <Link to="/messages">Messages</Link> &gt;{" "}
            {selectedUser ? selectedUser.userId : "Select a user"}
          </div>
        </div>
        <div className="messages h-96 overflow-y-auto">
          {selectedUser && (
            <div className="messages">
              {messages.map((m) => (
                <div
                  className={`flex mb-4 ${
                    m.fromSelf ? "justify-end" : "justify-start"
                  }`}
                  key={uuidv4()}
                >
                  <div
                    className={`${
                      m.fromSelf
                        ? "bg-blue-300 text-white"
                        : "bg-gray-200 text-gray-700"
                    } p-3 rounded-lg max-w-md`}
                  >
                    {m.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedUser && (
          <form
            className="write flex items-center justify-between mt-4"
            onSubmit={handleSubmit}
          >
            <textarea
              type="text"
              name="msg"
              onChange={(e) => {
                setMsg({ ...msg, [e.target.name]: e.target.value });
              }}
              placeholder="Write a message"
              className="w-3/4 h-20 px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="ml-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-md"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Chat;
