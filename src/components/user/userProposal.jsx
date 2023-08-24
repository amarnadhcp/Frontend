import React from "react";
import { useQuery } from "@tanstack/react-query";
import userRequest from "../../utils/userRequest";
import PuffLoader from "react-spinners/PuffLoader";
import { Link } from "react-router-dom";

export default function MyGig() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["myproposal"],
    queryFn: () => userRequest.get("users/mypreposal").then((res) => res.data),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center  min-h-screen mt-44">
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

  if (data.proposals.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-60 md:mb-60 animate-bounce">
          Oops! You don't have any proposals.
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
              Profile
            </th>
            <th className="px-3 sm:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
              Freelancer
            </th>
            <th className="px-3 sm:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
              time
            </th>
            <th className="px-3 sm:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
              price
            </th>
            <th className="px-3 sm:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
              status
            </th>
          </tr>
        </thead>
        <tbody>
          {data.proposals.map((proposal, index) => (
            <tr key={proposal._id}>
              <td className="px-3 sm:px-5 py-4 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm md:text-base text-gray-900 whitespace-no-wrap">
                {index + 1}
              </td>
              <td className="px-3 sm:px-5 py-4 sm:py-5 border-b border-gray-200 bg-white">
                <div className="flex items-center">
                  <div className="ml-3">
                    <img
                      className="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12 rounded-full"
                      src={proposal.sellerId.img}
                      alt="category image"
                    />
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
              <th className="px-3 sm:px-5 py-4 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm md:text-base text-gray-900 whitespace-no-wrap">
                <div className="flex items-center justify-center">
                  {" "}
                  {/* Flexbox to center content */}
                  {proposal.status === "Accepted" ? (
                    <Link to={`/pay-preposal/${proposal._id}`}>
                      <button className="bg-violet-500 text-white font-semibold rounded px-4 py-2 focus:outline-none">
                        Payment
                      </button>
                    </Link>
                  ) : (
                    <span className="text-red-500 font-bold">
                      {proposal.status}
                    </span>
                  )}
                </div>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
