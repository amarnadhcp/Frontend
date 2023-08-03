import React from "react";
import adminRequest from "../../utils/AdminRequest";
import AddCategoryModal from "./AddCategoryModal";

import { useQuery } from "@tanstack/react-query";

const CategoryTable = () => {

  const { isLoading, error, data } = useQuery({
    queryKey: ['categorys'],
    queryFn: () => adminRequest.get("/categorys")
      .then((res) => res.data)
  });

  if (isLoading) {
    return <h1>Loading.....</h1>
  }
  if (error) {
    return <h1>something went wrong</h1>
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <AddCategoryModal/>
      </div>

      <div className="bg-white rounded-lg flex shadow overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="hidden sm:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                N0
              </th>
              <th className="hidden sm:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                image
              </th>
              <th className="hidden sm:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Title
              </th>
              <th className="hidden sm:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
               description
              </th>
              <th className="hidden sm:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((category, index) => (
              <tr key={category._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <img className="h-10 w-10"  src={category.img} alt="category image" />
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">{category.title}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{category.desc}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">Active</p>
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
