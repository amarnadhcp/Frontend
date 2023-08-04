import React from 'react';
import {useQuery} from "@tanstack/react-query"
import userRequest from '../../utils/userRequest';
import PuffLoader from "react-spinners/PuffLoader";

export default function MyGig() {

  const{isLoading,error,data}=useQuery({
    queryKey:['MyGigs'],
    queryFn:()=>userRequest.get("freelancer/mygigs")
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

    return (
      <div className="bg-white rounded-lg shadow overflow-x-auto mx-4 md:mx-8 lg:mx-12">
  <table className="w-full leading-normal">
    <thead>
      <tr>
        <th className="px-3 sm:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
          No
        </th>
        <th className="px-3 sm:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
          Image
        </th>
        <th className="px-3 sm:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
          Title
        </th>
        <th className="px-3 sm:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
          Category
        </th>
        <th className="px-3 sm:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
          Description
        </th>
      </tr>
    </thead>
    <tbody>
      {data.allpost.map((user, index) => (
        <tr key={user._id}>
          <td className="px-3 sm:px-5 py-4 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm md:text-base text-gray-900 whitespace-no-wrap">
            {index + 1}
          </td>
          <td className="px-3 sm:px-5 py-4 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm md:text-base">
            <div className="flex items-center">
              <div className="ml-3">
                <img className="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12" src={user.images} alt="category image" />
              </div>
            </div>
          </td>
          <td className="px-3 sm:px-5 py-4 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm md:text-base text-gray-900 whitespace-no-wrap">
            {user.title}
          </td>
          <td className="px-3 sm:px-5 py-4 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm md:text-base text-gray-900 whitespace-no-wrap">
            {user.cat}
          </td>
          <td className="px-3 sm:px-5 py-4 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm md:text-base text-gray-900 whitespace-no-wrap">
            {user.shortDesc}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    
    
    );
}
