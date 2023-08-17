import React from 'react';
import { useMutation, useQuery } from "@tanstack/react-query"
import userRequest from '../../utils/userRequest';
import PuffLoader from "react-spinners/PuffLoader";
import KnowMore from './KnowMore';

export default function MyGig() {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['IncomeProposal'],
    queryFn: () => userRequest.get("freelancer/mypreposal")
      .then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (data) => {
      return userRequest.post("freelancer/accept", data);
    },
    onSuccess: () => {
      refetch();
    }
  });

  const handelAccept = (status, id) => {
    mutation.mutate({ status, id });
  };

  if (isLoading) {
    return (
      <div className='flex justify-center  min-h-screen mt-44'>
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
    <div className="bg-white rounded-lg shadow overflow-x-auto mx-4 md:mx-8 lg:mx-12">
      <table className="w-full leading-normal">
        <thead>
          <tr>
            <th className="px-3 sm:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
              No
            </th>
            <th className="px-3 sm:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
              user
            </th>
            <th className="px-3 sm:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
              time
            </th>
            <th className="px-3 sm:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
              price
            </th>
            <th className="px-3 sm:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
              Requirement
            </th>
            <th className="px-3 sm:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
              status
            </th>
          </tr>
        </thead>
        <tbody>
          {data.proposal.map((user, index) => (
            <tr key={user._id}>
              <td className="px-3 sm:px-5 py-4 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm md:text-base text-gray-900 whitespace-no-wrap">
                {index + 1}
              </td>
              <td className="px-3 sm:px-5 py-4 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm md:text-base">
                <div className="flex items-center">
                  <div className="ml-3">
                    <img className="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12 rounded-full" src={user.buyerId.img} alt="user image" />
                  </div>
                  <div className="ml-3">
                    {user.buyerId.username}
                  </div>
                </div>
              </td>
              <td className="px-3 sm:px-5 py-4 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm md:text-base text-gray-900 whitespace-no-wrap">
                {user.timePeriod} days
              </td>
              <td className="px-3 sm:px-5 py-4 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm md:text-base text-gray-900 whitespace-no-wrap">
                {user.price}
              </td>
              <td className="px-3 sm:px-5 py-4 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm md:text-base text-gray-900 whitespace-no-wrap">
                <KnowMore data={user.recuriment} />
              </td>
              <td className="px-3 sm:px-5 py-4 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm md:text-base text-gray-900 whitespace-no-wrap">
                {user.status === "sent" ? (
                  <>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md mr-2"
                      onClick={() => handelAccept("ongoing", user._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                      onClick={() => handelAccept("reject", user._id)}
                    >
                      Reject
                    </button>
                  </>
                ) : user.status === "ongoing" ? (
                  <td className="px-3 sm:px-5 py-4 sm:py-5 border-gray-200 text-xs sm:text-sm md:text-base text-green-500 whitespace-no-wrap">
                    Active
                  </td>
                ) : (
                  <td className="px-3 sm:px-5 py-4 sm:py-5 border-gray-200 text-xs sm:text-sm md:text-base text-red-500 whitespace-no-wrap">
                    rejected
                  </td>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
