import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import img from "../../../assets/images/avathar2.png";
import {getAllContacts} from "../../api/userApi"

function ChatSideBar({ setSender, socket }) {
  const userData = useSelector((state) => state.user);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    console.log("all constt",userData.id);
    getAllContacts(userData.id)
      .then((res) => {
        setContacts(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });

      console.log(contacts);
  }, []);

  
  const handleContactClick = (contact) => {
    console.log(contact,"contact selected");
    setSelectedContact(contact);
    setSender({
      id: contact._id,
      username: contact.username,
      img: contact.img,
    });
  };    
  


//   console.log(contacts,56789);
  return (
    <div>
      <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">Active Conversations</span>
          <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
            {contacts.length}
          </span>
        </div>
        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
          {contacts?.map((result) => (
            <button
              key={result._id}
              onClick={() => handleContactClick(result)}
              className={`flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 focus:outline-none ${
                selectedContact === result ? "bg-blue-200" : ""
              }`}
            >
              <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full">
                <img
                  className="rounded-full h-8 w-8"
                  src={
                  result.img || "https://res.cloudinary.com/dvprhxg7x/image/upload/v1692803989/asset/noavatar_vhrf74.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="ml-2 text-sm font-semibold">
                {result?.username}
              </div>
              
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatSideBar;