import React from 'react';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import userRequest from '../../utils/userRequest';
import PuffLoader from "react-spinners/PuffLoader";
import { AcceptRecieve } from '../../api/userApi';

export default function MyGig() {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['ongoing'],
    queryFn: () => userRequest.get("users/ongoing")
      .then((res) => res.data),
  });

  const handleAccept = async (proposalId) => {
    await AcceptRecieve(proposalId);
    queryClient.invalidateQueries("ongoing");
  }

  if (isLoading) {
    return (
      <div className='flex justify-center min-h-screen mt-44'>
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
    return <h1>Something went wrong</h1>;
  }

  if (!data || data.proposals.length === 0) {
    return (
      <div className='flex flex-col justify-center items-center min-h-screen'>
      <p className='text-lg md:text-xl lg:text-2xl text-gray-600 mb-60 md:mb-60 animate-bounce'>
        Oops! You don't have any ongoing.
      </p>
    </div>
    );
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
             profile
            </th>
            <th className="px-3 sm:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
              freelancer
            </th>
            <th className="px-3 sm:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
              Time
            </th>
            <th className="px-3 sm:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
              Price
            </th>
            <th className="px-3 sm:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {data.proposals.map((proposal, index) => (
            <tr key={proposal._id}>
              <td className="px-3 sm:px-5 py-4 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm md:text-base text-gray-900 whitespace-no-wrap">
                {index + 1}
              </td>
              <td className="px-3 sm:px-5 py-4 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm md:text-base">
                <div className="flex items-center">
                  <div className="ml-3">
                    <img className="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12 rounded-full" src={proposal.sellerId.img} alt="category" />
                  </div>
                </div>
              </td>
              <td className="px-3 sm:px-5 py-4 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm md:text-base text-gray-900 whitespace-no-wrap">
                {proposal.sellerId.username}
              </td>
              <td className="px-3 sm:px-5 py-4 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm md:text-base text-gray-900 whitespace-no-wrap">
                {proposal.timePeriod} days
              </td>
              <td className="px-3 sm:px-5 py-4 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm md:text-base text-gray-900 whitespace-no-wrap">
                {proposal.price}
              </td>
              {proposal.completed === true ? (
              <td className="px-3 sm:px-5 py-4 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm md:text-base text-gray-900 whitespace-no-wrap">
                {proposal.received === false ? (
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md mr-2"
                    onClick={() => handleAccept(proposal._id)}
                  >
                    Received
                  </button>
                ) : (
                  <span className='text-green-500 font-bold'>Received</span>
                )}
              </td>
              ):(
                <td className="px-3 sm:px-5 py-4 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm md:text-base text-gray-900 whitespace-no-wrap">
                <span className="text-red-500 font-bold">Work ongoing</span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
