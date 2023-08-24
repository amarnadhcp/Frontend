import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useQuery } from "@tanstack/react-query";
import adminRequest from "../../utils/AdminRequest";
import PuffLoader from "react-spinners/PuffLoader";
import { Link } from "react-router-dom";
import userRequest from "../../utils/userRequest";


const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
    slidesToSlide: 1
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 4,
    slidesToSlide: 2
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Cards = () => {

  const { isLoading, error, data } = useQuery({
    queryKey: ['categorys'],
    queryFn: () => userRequest.get("/users/categorys")
      .then((res) => res.data)
  });
  
  if (isLoading) {
    return(
      <div>Loading....</div>
    )
    // return(
    //   <div className="flex items-center justify-center min-h-screen bg-gray-50 ">
    //   <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
    //   <div className="z-20 mt-40px">
    //     <div className="flex flex-col items-center justify-center h-full">
    //       <PuffLoader
    //         color={"#FF0000"}
    //         loading={isLoading}
    //         size={50}
    //         aria-label="Loading Spinner"
    //         data-testid="loader"
    //       />
    //       <p className="text-gray-600 mt-2">Loading...</p>
    //     </div>
    //   </div>
    // </div>
    // )
  }
  if (error) {
    return <h1>something went wrong</h1>
  }

  return (
    <div className=" mx-11 h-2/3">
    <Carousel responsive={responsive} itemClass="carousel-item"
    // showDots={true} 
    infinite={true}
    autoPlay={ true }
    autoPlaySpeed={1000}>
      
      {data.map((card, index) => (
        <Link to={`/category/${card._id}`}>
        <div key={index} className="flex  py-12 mx-4 ml-12 h-80 mt-6">
          <div className=" mx-auto">
            <div className=" relative w-52    text-white cursor-pointer overflow-hidden">
              <img
                src={card.img}
                alt=""
                className="w-full h-56 object-cover"
              />
              <span className=" font-semibold absolute top-3 left-2 text-2xl">
                {card.title}
              </span>
              <span className=" font-light absolute top-12 left-2">
                {card.desc}
              </span>
            </div>
          </div>
        </div>
        </Link>
      ))}
    </Carousel>
    </div>
  );
};

export default Cards;
