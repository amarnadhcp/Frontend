import React from "react";
// import { useMutation } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import userRequest from "../../utils/userRequest";
import PuffLoader from "react-spinners/PuffLoader";
import Sent from "../userModal/Sent";
import { useSelector } from "react-redux";

const Gig = () => {
  const { id } = useParams();
  const userData = useSelector((state) => state.user);
  const { isLoading, error, data } = useQuery({
    queryKey: ["singleGig"],
    queryFn: () => userRequest.get(`users/gig/${id}`).then((res) => res.data),
  });

  // const mutation = useMutation({
  //   mutationFn: (payInfo) => {
  //     return userRequest.post("users/payment", payInfo);
  //   },
  // });

  // const HandlePayment = async () => {
  //   console.log("kkkkkk");
  //   const detail = data.gig._id;
  //   // mutation.mutate({ detail });
  //  const response =  await userRequest.post("/users/payment",{detail})
  //  console.log(response);
  //  if (response.data.url) {
  //   window.location.href = response.data.url;
  // }
  // };

  if (isLoading) {
    return (
      <div className="flex justify-center  min-h-screen mt-52">
        <PuffLoader
          color={"#9c0ee8"}
          loading={isLoading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
  if (error) {
    return <h1>something went wrong</h1>;
  }

  return (
    <>
      <div className="bg-gray-100 py-4 px-4 md:px-10 lg:px-20 ">
        <div className="container mx-auto flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="md:flex-1 space-y-4 md:pr-5">
            <p className="text-sm font-light text-gray-600">
              Home &gt; Graphics & Design &gt; Sample Category
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800">
              {data.gig.title}
            </h1>
            <div className="flex items-center space-x-4">
              <img
                className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                src={data.gig.userId.img}
                alt="Profile"
              />
              <span className="text-base md:text-lg font-medium text-gray-700">
                {data.gig.userId.username}
              </span>
            </div>
            <div className="bg-gray-300 h-64 md:h-96">
              <img
                src={data.gig.images[0]}
                alt="Sample Image"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="bg-white p-4 rounded border border-gray-300 mt-4">
              <h2 className="text-lg font-semibold text-gray-800">
                About The Seller
              </h2>
              <div className="flex items-center space-x-4 mt-2">
                <img
                  src={data.gig.userId.img}
                  alt="Seller Profile"
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-base md:text-lg font-medium text-gray-700">
                    {data.gig.userId.username}
                  </span>
                  <div className="flex space-x-2 mt-2">
                    <Link to={`/chat/${data.gig.userId._id}`}>
                      <button
                        className="bg-violet-500 text-white font-semibold rounded px-3 py-1 mt-2 focus:outline-none"
                        disabled={data.gig.userId._id === userData.id}
                      >
                        Contact Me
                      </button>
                    </Link>
                    {/* <button className="bg-amber-400 text-white font-semibold rounded px-3 py-1 mt-2 focus:outline-none">
                      Proposal
                    </button> */}

                    <Sent sellerId={data.gig.userId._id} />
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-300 mt-4 pt-4">
                <p className="text-gray-600">{data.gig.userId.desc}</p>
                <div className="mb-2 text-blueGray-600 mr-4 border-t border-gray-300 mt-4 pt-4">
                <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
                  {data?.gig.userId.email} 
                  </div>
              </div>
              <hr className="border-t border-gray-300 my-4" />
              <div className="flex justify-center flex-wrap gap-2 mt-4">
              {/* <p className="text-gray-600  ">SKILLS</p> */}
                  {data.gig.userId.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-amber-400 text-white px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
            </div>
            {/* Placeholder for Reviews */}
          </div>

          <div className="md:flex-1 border border-gray-300 rounded p-4 sticky top-20 max-h-[500px] overflow-y-auto mt-4 md:mt-10">
            <h2 className="text-2xl font-semibold text-gray-800">
              About This Gig
            </h2>
            <hr className="border-t border-gray-300 my-4" />
            <h3 className="text-lg font-medium text-gray-700">
              {data.gig.shortDesc}
            </h3>

            <p className="text-gray-600">{data.gig.desc}</p>
            <hr className="border-t border-gray-300 my-4" />

            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 md:px-4">
              <h3 className="text-lg font-medium text-gray-700">
                Available Features
              </h3>
              <div className="flex items-center space-x-1">
                <img src="https://res.cloudinary.com/dvprhxg7x/image/upload/v1692804061/asset/clock_ukjpg6.png" alt="Clock" className="w-4 h-4" />
                <span>{data.gig.deliveryTime} Days Delivery</span>
              </div>
              <div className="flex items-center space-x-1">
                <img src="https://res.cloudinary.com/dvprhxg7x/image/upload/v1692803979/asset/recycle_twmk1r.png" alt="Recycle" className="w-4 h-4" />
                <span>{data.gig.revisionNumber} Revisions</span>
              </div>
              <div className="flex items-center ml-7 justify-between">
                <h2 className="font-semibold">$ {data.gig.price}</h2>
              </div>
            </div>

            <div className="mt-4 md:px-4">
              {data.gig.features.map((featureGroup, index) => (
                <div key={index}>
                  {featureGroup.split(",").map((feature, subIndex) => (
                    <div
                      className="flex items-center space-x-2 md:px-4"
                      key={subIndex}
                    >
                      <img
                        src="https://res.cloudinary.com/dvprhxg7x/image/upload/v1692803984/asset/greencheck_xj3f8e.png"
                        alt="Feature Icon"
                        className="w-4 h-4"
                      />
                      <span>{feature.trim()}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <Link to={`/pay/${id}`}>
              <button
                className="md:absolute md:bottom-0 md:right-0 bg-violet-500 text-white font-semibold rounded px-4 py-2 mt-4 md:mb-4 md:mr-4 focus:outline-none"
                disabled={data.gig.userId._id === userData.id}
              >
                Payment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gig;


