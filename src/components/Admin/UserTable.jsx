import React from "react";
import adminRequest from "../../utils/AdminRequest";
import { useQuery,useQueryClient  } from "@tanstack/react-query";
import { userManage } from "../../api/adminApi";
const UserTable = () => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: () => adminRequest.get("/users")
      .then((res) => res.data)
  });

  if (isLoading) {
    console.log("is loafing");
    return <h1>Loading......</h1>
  }
  if (error) {
    return <h1>something went wrong</h1>
  }

  const handleAction =async(userId)=> {
    await userManage(userId)
    queryClient.invalidateQueries("users");
  }

  return (

    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="hidden sm:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              N0
            </th>
            <th className="hidden sm:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              User Name
            </th>
            <th className="hidden sm:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              User Type
            </th>
            <th className="hidden sm:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              status
            </th>
            <th className="hidden sm:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((user,index) => (
            <tr key={user._id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{index+1}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">{user.username}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{user.isSeller ? "user" : "freelancer"}</p>
              </td>

              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{user.status ? "Active" : "Blocked"}</p>
              </td>

              <td>
                <button onClick={()=>handleAction(user._id)}
                  className={`${user.status ? 'bg-red-500' : 'bg-green-500'
                    } hover:bg-opacity-75 text-white font-bold py-2 px-4 rounded`}
                >
                  {user.status ? 'Block' : 'Activate'}
                </button>
              </td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
