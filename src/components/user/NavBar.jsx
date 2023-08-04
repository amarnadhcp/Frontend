import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LogoutDetails } from '../../Redux/UserSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const { email, id, username, image } = useSelector(state => state.user);
  // const currentUser = localStorage.getItem("currentUser");

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    localStorage.removeItem('currentUser');
    dispatch(
      LogoutDetails({
        id: '',
        email: '',
        username: ''
      })
    );
    setShowDropdown(!showDropdown)

  };

  const renderUserProfile = () => {
    if (username) {
      return (
        <div className="flex items-center justify-end">
          <label htmlFor="menu-toggle" className="cursor-pointer md:hidden">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
          <span className='text-sm hidden sm:block' > {username}</span>
          <input type="checkbox" id="menu-toggle" className="hidden" onChange={() => setShowDropdown(!showDropdown)} />
          <div className="hidden md:flex md:items-center md:ml-6 mr-5 ">
            <button onClick={handleProfileClick}className="focus:outline-none" >
              <div
                className="relative inline-block "
                style={{ boxShadow: '0 0 0 2px white', borderRadius: '50%' }}
              >
                <img
                  className="w-8 h-8 rounded-full cursor-pointer"
                  src={image || "/img/noavatar.jpg"}
                  alt="User Photo"
                />
              </div>
            </button>
          </div>

        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-end">
          <Link
            to="/login"
            className="text-white flex items-center gap-24 font-montserrat font-medium bg-purple-600 hover:bg-purple-800 px-4 py-2 rounded-md"
          >
            Login
          </Link>
        </div>


      );
    }
  };

  return (
    <nav className="navbar  w-full active bg-purple-600 text-white sticky top-0 z-50 transition duration-500 ease-in-out">
      <div className="mx-auto flex items-center justify-between p-5">
        <div className="logo text-2xl font-bold">
          <Link to="/">
            <span className="text text-2xl ">freelancer</span>
          </Link>
        </div>
        {renderUserProfile()}
      </div>
      {showDropdown && (
        <div className="absolute top-16 right-0 bg-white rounded-md shadow-md border border-gray-300 p-4 z-50 w-44 mr-10 font-normal text-gray-500">
          <ul className="space-y-1">
            <Link to="/profile">
              <li className="px-3 py-1 cursor-pointer text-sm hover:bg-gray-200 text-black  ">
                Profile
              </li>
            </Link>
            <hr className="my-1 border-gray-300" />
            <Link to="/feed">
              <li className="px-3 py-2 cursor-pointer text-sm hover:bg-gray-200 text-black">
                Feed 
              </li>
            </Link>

            <hr className="my-1 border-gray-300" />
            <Link to="/dashboard">
              <li className="px-3 py-2 cursor-pointer text-sm hover:bg-gray-200 text-black">
                Dashboard
              </li>
            </Link>
           
            <hr className="my-1 border-gray-300" />
            <li className="px-3 py-1 cursor-pointer text-sm hover:bg-gray-200 text-black" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
