import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/SIdebar";

function Layout() {
  return (
    <div className="flex flex-col bg-neutral-100 w-full h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row flex-1">
        <Sidebar />

        <div className="flex flex-col flex-1 px-8 py-8 overflow-auto md:ml-64"> 
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
