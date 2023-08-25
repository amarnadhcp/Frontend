import React from "react";
// import adminRequest from "../../utils/AdminRequest";

import { useQuery,useQueryClient } from "@tanstack/react-query";
import { PayFreelancer } from "../../api/adminApi";
import adminRequest from "../../utils/AdminRequest";

const CategoryTable = () => {
  const queryClient = useQueryClient();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["Allworks"],
    queryFn: () =>
    adminRequest.get("/works").then((res) => res.data),
  });



  const handlePay = async (freelancerId, price, ProposalId) => {
    await PayFreelancer(freelancerId, price, ProposalId);
    queryClient.invalidateQueries("Allworks");
  };

  if (isLoading) {
    return <h1>Loading.....</h1>;
  }
  if (error) {
    return <h1>something went wrong</h1>;
  }

  return (
    <>
      <div className="bg-white rounded-lg flex shadow overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="hidden sm:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                N0
              </th>
              <th className="hidden sm:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Seller
              </th>
              <th className="hidden sm:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Buyer
              </th>
              <th className="hidden sm:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Received
              </th>
              <th className="hidden sm:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                completed
              </th>
              <th className="hidden sm:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                payment
              </th>
            </tr>
          </thead>
          <tbody>
            {data.proposals.map((proposal, index) => (
              <tr key={proposal._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {index + 1}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {proposal.sellerId.username}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {proposal.buyerId.username}
                  </p>
                </td>

                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {proposal.received === "false"
                      ? " Recieved"
                      : "Not Recieved"}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {proposal.completed === "false"
                      ? " competed"
                      : "Not competed"}
                  </p>
                </td>

                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {proposal.status === "completed" ? (
                    <span className="text-green-500 font-bold">
                      Payment Successful
                    </span>
                  ) : proposal.completed === true &&
                    proposal.received === true ? (
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                      onClick={() =>
                        handlePay(
                          proposal.sellerId._id,
                          proposal.price,
                          proposal._id
                        )
                      }
                    >
                      Pay Freelancer
                    </button>
                  ) : (
                    <span className="text-red-500 font-bold">Work ongoing</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CategoryTable;
