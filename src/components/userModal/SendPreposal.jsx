import React from "react";

export default function SendProposal() {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-100">
      <div className="container mx-auto my-4 px-4 lg:px-20">
        <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-lg shadow-lg bg-white">
          <div className="flex justify-center">
            <h1 className="font-bold uppercase text-3xl md:text-4xl lg:text-5xl">
              Add New Gig
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-5">
            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:ring-2 ring-blue-400"
              type="text"
              placeholder="First Name*"
            />
            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:ring-2 ring-blue-400"
              type="text"
              placeholder="Last Name*"
            />
            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:ring-2 ring-blue-400"
              type="email"
              placeholder="Email*"
            />
            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:ring-2 ring-blue-400"
              type="number"
              placeholder="Phone*"
            />
          </div>
          <div className="my-4">
            <textarea
              placeholder="Message* "
              className="w-full h-24 md:h-28 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:ring-2 ring-blue-400"
            />
          </div>
          <div className="my-4 flex justify-center">
            <button className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-white p-3 rounded-lg w-full md:w-auto focus:outline-none focus:ring-2 ring-blue-400">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
