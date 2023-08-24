import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center space-y-4">
        <img
          src="https://res.cloudinary.com/dvprhxg7x/image/upload/v1692686918/asset/success_kze9jm.png"
          alt="Success Illustration"
          className="w-20 h-20 mx-auto"
        />
        <h2 className="text-3xl font-semibold text-green-600 mb-2">Success!</h2>
        <p className="text-lg text-gray-600">
          Your request has been processed successfully. Thank you for choosing
          our service.
        </p>
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none">
          <Link to="/dashboard">Continue</Link>
        </button>
      </div>
    </div>
  );
};

export default Success;
