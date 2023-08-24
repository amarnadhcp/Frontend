import React from "react";
import Navbar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";
import userRequest from "../../utils/userRequest";
import {useQuery} from "@tanstack/react-query"
import PuffLoader from "react-spinners/PuffLoader";
import { Link, useParams } from "react-router-dom";

const CategorieWise = () => {
    const { id } = useParams();

   const {isLoading,error,data}=useQuery({
    queryKey:["AllGigs"],
    queryFn:()=>userRequest.get(`users/category/${id}`)
    .then((res)=>res.data),
   })
  
   if (isLoading) {
    return(
      <div className='flex justify-center  min-h-screen mt-44'>
         <PuffLoader
            color={"#9c0ee8"}
            loading={isLoading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
      </div>
    )
  }
  if (error) {
    return <h1>something went wrong</h1>
  }

  if ( data.allpost.length === 0) {
    return (
      <div className='flex flex-col justify-center items-center min-h-screen'>
      <p className='text-lg md:text-xl lg:text-2xl text-gray-600 mb-60 md:mb-60 animate-bounce'>
        Oops! Nothing over here
      </p>
    </div>
    );
  }

   
    return (
      <>

    <div className="p-4 flex items-center justify-center">
  <div className="w-full  sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
    <div className="relative rounded-lg flex">
      <input
        type="text"
        placeholder="Search..."
        className="px-4 py-2 w-full rounded-l-lg border focus:outline-none "
      />
      <button
        className="bg-violet-500 text-white px-4 py-2 rounded-r-lg flex items-center focus:outline-none"
      >
        
        Search
      </button>
    </div>
  </div>
</div>



    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-8 md:gap-10 px-2 sm:px-8 md:px-10 mt-12 mb-20">
        {data.allpost.map((item) => (
          <Link to={`/gig/${item._id}`} >
          <div
            key={item.id}
            className="border border-gray-300 rounded-md overflow-hidden flex flex-col "
          >
            <img
              src={item.images[0]}
              alt=""
              className="w-full h-40 object-cover rounded-t-md"
            />
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <img
                    src={item.userId.img}
                    alt=""
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="text-sm">{item.userId.username}</span>
                </div>
                <p className="text-gray-700 mt-2 font-serif text-sm sm:text-base md:text-lg truncate">
                  {item.title}
                </p>
                <p className="text-gray-700 font-light text-xs sm:text-sm md:text-base truncate">
                  {item.shortDesc}
                </p>
              </div>
              <hr className="border-t-2 border-gray-300" />
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs sm:text-sm mt-1">
                    STARTING AT
                  </span>
                  <h2 className="text-gray-700 text-lg font-normal sm:text-xl">
                    ${item.price}
                  </h2>
                </div>
                <img
                  src="/img/heart.png"
                  alt=""
                  className="w-4 h-4 cursor-pointer mt-5"
                />
              </div>
            </div>
          </div>
          </Link>
        ))}
      </div>



    </>
    

      
      );
      
      
      
}

export default CategorieWise
