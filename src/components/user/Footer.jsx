import React from "react";

const Footer =()=>{

 return(
  <footer className="bg-purple-900 text-white py-4 mt-10">
  <div className="container mx-auto flex flex-wrap items-center justify-between">
    <div className="flex items-center">
      <span className="text-gray-300 mr-2">© 2023 Your Company. All rights reserved.</span>
      <a href="#" className="text-white hover:text-gray-300 transition duration-150 ease-in-out">Privacy Policy</a>
      <span className="text-gray-300 mx-2">|</span>
      <a href="#" className="text-white hover:text-gray-300 transition duration-150 ease-in-out">Terms of Service</a>
    </div>
    <div className="flex items-center mt-2 md:mt-0">
      <a href="#" className="text-white hover:text-gray-300 mr-4 transition duration-150 ease-in-out">
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14 17H10V14H14V17ZM14 13H10C8.9 13 8 12.1 8 11V7H10V11H14V13Z"
          ></path>
        </svg>
      </a>
      <a href="#" className="text-white hover:text-gray-300 mr-4 transition duration-150 ease-in-out">
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M9 2C5.13 2 2 5.13 2 9V15C2 18.87 5.13 22 9 22H15C18.87 22 22 18.87 22 15V9C22 5.13 18.87 2 15 2H9ZM20 15C20 16.1 19.1 17 18 17H15.5V13.5H17.5V12H15.5V10C15.5 8.34 16.84 7 18.5 7H20V8.5H18.5C17.67 8.5 17 9.17 17 10V12H19L18.5 13.5H17V17H20ZM13.5 13.5H11V17H8V7H13.5V13.5Z"
          ></path>
        </svg>
      </a>
    </div>
  </div>
</footer>
 )
}

export default Footer;