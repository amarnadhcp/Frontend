import React from "react";

const Featured = () => {
  return (
    <div className="featured h-[480px]  text-white bg-[url('https://res.cloudinary.com/dvprhxg7x/image/upload/v1692177116/asset/bannere_sjkwfg.png')] bg-cover bg-center">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between h-full">
        <div className="left lg:mt-36 ml-16 ">
          <h1 className="text-5xl mb-5">
            Find the perfect  freelancer for you work
            {/* <span className="italic font-light">freelance</span> */}
          </h1>
          {/* <div className="search flex flex-col lg:flex-row items-center justify-between bg-white rounded-5 ">
            <div className="searchInput flex items-center gap-2 ">
              <img src="./img/search.png" alt="" className="w-5 h-5 m-2" />
              <input
                type="text"
                placeholder='Try "building mobile app"'
                // onChange={(e) => setInput(e.target.value)}
                className="border-none outline-none text-gray-500 "
              />
            </div>
            <button className="w-full lg:w-24 h-10 bg-violet-400 text-white mt-4 lg:mt-0 ">
              Search
            </button>
          </div> */}
          <div className="popular flex items-center gap-2 mt-6 flex-wrap ml-80 ">
            <span className="text-white text-2xl">Popular:</span>
            <button className="text-white border border-white rounded-full px-2 py-0.5 mb-2 lg:mb-0">
              Web Design
            </button>
            <button className="text-white border border-white rounded-full px-2 py-0.5 mb-2 lg:mb-0">
              WordPress
            </button>
            <button className="text-white border border-white rounded-full px-2 py-0.5 mb-2 lg:mb-0">
              Logo Design
            </button>
            <button className="text-white border border-white rounded-full px-2 py-0.5 mb-2 lg:mb-0">
              AI Services
            </button>
          </div>
        </div>
        <div className="right">
          <img src="./img/man.png" alt="" className="h-full object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Featured;
