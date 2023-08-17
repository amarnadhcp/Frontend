import React, { useState } from "react";
import NavBar from "../common/NavBar";

import MyGigs from "../seller/MyGigs";
import Footer from "../common/Footer"
import UserProposal from "./userProposal"
import Ongoing from "./Ongoing"




const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("addPost");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const renderComponent = () => {
    switch (selectedOption) {
      case "proposal":
        return <UserProposal />;
      case "ongoingProject":
        return <Ongoing />;
      case "anotherOption":
        return <MyGigs />;
      default:
       
    }
  };

  return (
    <>
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8  mb-15">
        <nav className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex items-center justify-center h-10">
         
            <button
              className={`flex-grow py-3 px-2 sm:px-4 w-16 sm:w-20 font-semibold text-xs sm:text-sm focus:outline-none ${
                selectedOption === "proposal"
                  ? "bg-violet-400 text-white transition"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition"
              }`}
              onClick={() => handleOptionClick("proposal")}
            >
              Proposal
            </button>
            <button
              className={`flex-grow py-3 px-2 sm:px-4 w-16 sm:w-20 font-semibold text-xs sm:text-sm focus:outline-none ${
                selectedOption === "ongoingProject"
                  ? "bg-violet-400 text-white transition"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition"
              }`}
              onClick={() => handleOptionClick("ongoingProject")}
            >
              Ongoing
            </button>
            <button
              className={`flex-grow py-3 px-2 sm:px-4 w-16 sm:w-20 font-semibold text-xs sm:text-sm focus:outline-none ${
                selectedOption === "anotherOption"
                  ? "bg-violet-400 text-white transition"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition"
              }`}
              onClick={() => handleOptionClick("anotherOption")}
            >
              My Gigs
            </button>
          </div>
        </nav>
      </div>
      <div className="">{renderComponent()}</div>
    </div>
    </>
  );
};

export default Dashboard;
