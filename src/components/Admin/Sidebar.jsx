import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-indigo-900 text-white h-screen w-64 p-4 fixed top-0 left-0">
      <div className="text-3xl font-bold mb-8">Admin Panel</div>
      <ul>
        <li className="mb-4">
          <Link
            to="/admin/"
            className="block border-l-4 border-transparent hover:border-indigo-600 px-4 py-2"
          >
            Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/admin/users"
            className="block border-l-4 border-transparent hover:border-indigo-600 px-4 py-2"
          >
            All Users
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/admin/categories"
            className="block border-l-4 border-transparent hover:border-indigo-600 px-4 py-2"
          >
            All Categories
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/products"
            className="block border-l-4 border-transparent hover:border-indigo-600 px-4 py-2"
          >
            Products
          </Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
}

export default Sidebar;
