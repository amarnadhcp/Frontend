import React from "react";
// import { useMutation } from "@tanstack/react-query";
import { Link, useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query"
import userRequest from '../../utils/userRequest';
import PuffLoader from "react-spinners/PuffLoader";
import Sent from "../userModal/Sent";



const Gig = () => {
  const { id } = useParams();

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
      <div className='flex justify-center  min-h-screen mt-52'>
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
              <h2 className="text-lg font-semibold text-gray-800">About The Seller</h2>
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
                    <button className="bg-violet-500 text-white font-semibold rounded px-3 py-1 mt-2 focus:outline-none">
                      Contact Me
                    </button>
                    </Link>
                    {/* <button className="bg-amber-400 text-white font-semibold rounded px-3 py-1 mt-2 focus:outline-none">
                      Proposal
                    </button> */}

                  <Sent sellerId={data.gig.userId._id}/>
                  </div>
          
                </div>
              </div>
              <div className="border-t border-gray-300 mt-4 pt-4">
              <p className="text-gray-600">
              {data.gig.userId.desc}
            </p>
              </div>
              <hr className="border-t border-gray-300 my-4" />
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus...
              </p>
            </div>
            {/* Placeholder for Reviews */}
          </div>

          <div className="md:flex-1 border border-gray-300 rounded p-4 sticky top-20 max-h-[500px] overflow-y-auto mt-4 md:mt-10">
            <h2 className="text-2xl font-semibold text-gray-800">About This Gig</h2>
            <hr className="border-t border-gray-300 my-4" />
            <h3 className="text-lg font-medium text-gray-700">{data.gig.shortDesc}</h3>

            <p className="text-gray-600">
              {data.gig.desc}
            </p>
            <hr className="border-t border-gray-300 my-4" />

            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 md:px-4">
              <h3 className="text-lg font-medium text-gray-700">Available Features</h3>
              <div className="flex items-center space-x-1"> {/* Adjust space-x value */}
                <img src="/img/clock.png" alt="Clock" className="w-4 h-4" />
                <span>{data.gig.deliveryTime} Days Delivery</span>
              </div>
              <div className="flex items-center space-x-1"> {/* Adjust space-x value */}
                <img src="/img/recycle.png" alt="Recycle" className="w-4 h-4" />
                <span>{data.gig.revisionNumber} Revisions</span>
              </div>
            </div>


            <div className="mt-4 md:px-4">
              {data.gig.features.map((featureGroup, index) => (
                <div key={index}>
                  {featureGroup.split(',').map((feature, subIndex) => (
                    <div className="flex items-center space-x-2 md:px-4" key={subIndex}>
                      <img src="/img/greencheck.png" alt="Feature Icon" className="w-4 h-4" />
                      <span>{feature.trim()}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
             
            <Link to={`/pay/${id}`}>
            <button  className="md:absolute md:bottom-0 md:right-0 bg-violet-500 text-white font-semibold rounded px-4 py-2 mt-4 md:mb-4 md:mr-4 focus:outline-none">
              Payment
            </button>
            </Link>
          </div>

        </div>
      </div>














    </>
  )
}


export default Gig






// <div className="gig">
// <div className="container mx-auto p-4">
//   <div className="flex flex-col md:flex-row">
//     <div className="md:w-2/3 md:pr-8">
//       <h1 className="text-3xl font-bold mb-4">Sample Gig Title</h1>
//       <div className="flex items-center mb-4">
//         <img
//           className="w-10 h-10 rounded-full mr-2"
//           src="/img/sample_avatar.jpg"
//           alt="User Avatar"
//         />
//         <span className="font-bold">Sample User</span>
//         <div className="flex items-center ml-4">
//           <img
//             className="w-4 h-4 mr-1"
//             src="/img/star.png"
//             alt="Star"
//           />
//           <img
//             className="w-4 h-4 mr-1"
//             src="/img/star.png"
//             alt="Star"
//           />
//           <img
//             className="w-4 h-4 mr-1"
//             src="/img/star.png"
//             alt="Star"
//           />
//           <img
//             className="w-4 h-4 mr-1"
//             src="/img/star.png"
//             alt="Star"
//           />
//           <img
//             className="w-4 h-4 mr-1"
//             src="/img/star.png"
//             alt="Star"
//           />
//           <span>5</span>
//         </div>
//       </div>
//       <div className="slider mb-4">
//         {/* Sample Slider Images */}
//       </div>
//       <h2 className="text-2xl font-bold mb-2">About This Gig</h2>
//       <p>
//         This is a sample gig description. It showcases the features and benefits of the service being offered.
//       </p>
//       <div className="seller mt-4">
//         <h2 className="text-2xl font-bold mb-2">About The Seller</h2>
//         <div className="flex items-center mb-4">
//           <img
//             className="w-10 h-10 rounded-full mr-4"
//             src="/img/sample_avatar.jpg"
//             alt="User Avatar"
//           />
//           <div>
//             <span className="font-bold">Sample User</span>
//             <div className="flex items-center">
//               <img
//                 className="w-4 h-4 mr-1"
//                 src="/img/star.png"
//                 alt="Star"
//               />
//               <img
//                 className="w-4 h-4 mr-1"
//                 src="/img/star.png"
//                 alt="Star"
//               />
//               <img
//                 className="w-4 h-4 mr-1"
//                 src="/img/star.png"
//                 alt="Star"
//               />
//               <img
//                 className="w-4 h-4 mr-1"
//                 src="/img/star.png"
//                 alt="Star"
//               />
//               <img
//                 className="w-4 h-4 mr-1"
//                 src="/img/star.png"
//                 alt="Star"
//               />
//               <span>5</span>
//             </div>
//             <button className="bg-blue-500 text-white py-1 px-3 rounded mt-2">
//               Contact Me
//             </button>
//           </div>
//         </div>
//         <div className="box">
//           {/* Seller Information */}
//         </div>
//       </div>
//       <div className="reviews mt-4">
//         {/* Sample Reviews Component */}
//       </div>
//     </div>
//     <div className="md:w-1/3 md:pl-8 mt-4 md:mt-0">
//       <div className="price mb-4">
//         <h3 className="text-xl font-bold">Sample Short Title</h3>
//         <h2 className="text-3xl font-bold text-green-500">$50</h2>
//       </div>
//       <p>
//         This is a sample short description of the gig.
//       </p>
//       <div className="details mt-4">
//         <div className="flex items-center mb-2">
//           <img
//             className="w-4 h-4 mr-2"
//             src="/img/clock.png"
//             alt=""
//           />
//           <span>3 Days Delivery</span>
//         </div>
//         <div className="flex items-center">
//           <img
//             className="w-4 h-4 mr-2"
//             src="/img/recycle.png"
//             alt=""
//           />
//           <span>2 Revisions</span>
//         </div>
//       </div>
//       <div className="features mt-4">
//         {/* Features */}
//       </div>
//       <a href="/pay/sample_id">
//         <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
//           Continue
//         </button>
//       </a>
//     </div>
//   </div>
// </div>
// </div>