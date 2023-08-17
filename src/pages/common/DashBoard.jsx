import React from "react";
import { useSelector } from "react-redux";
import FreelancerDashboard from "../../components/seller/FreelancerDashboard";
import UserDashboard from "../../components/user/UserDashboard";

const Dashboard = () => {
  const { isSeller } = useSelector((state) => state.user);

  return (
    <div>
      {isSeller ? <FreelancerDashboard /> : <UserDashboard />}
    </div>
  );
};

export default Dashboard;
