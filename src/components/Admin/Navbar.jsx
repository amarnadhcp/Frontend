import React from "react";
import { useNavigate } from "react-router-dom"; 
function Navbar() {
  const navigate = useNavigate(); 
  const handlelogout = async () => {
    localStorage.removeItem('currentAdmin');
    navigate("/admin/login");
  };
  return (
    <div className="bg-blue-900 text-white py-4 px-8 flex justify-between items-center">
      <div className="text-xl font-bold">Admin Panel</div>
      <div className="space-x-4">
        {/* Add any additional content you want in the navbar */}
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700"
          onClick={handlelogout} // Corrected the function invocation here
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
