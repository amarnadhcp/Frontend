import React from "react";
import { FaTasks, FaProjectDiagram, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const Home = () => {
  const statBoxVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-gradient-to-b from-blue-600 to-blue-800 h-screen text-white">
      <div className="flex justify-center items-center h-20 text-3xl font-semibold">
        Freelancer Hub Admin Dashboard
      </div>
      <div className="flex justify-center mt-8">
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 w-2/3"
          initial="hidden"
          animate="visible"
          variants={statBoxVariants}
        >
          <h2 className="text-2xl font-semibold mb-4">Welcome to the Dashboard</h2>
          <p className="text-gray-600">
            Manage and monitor your freelancer hub activities here.
          </p>
        </motion.div>
      </div>
      <div className="flex justify-around mt-12 mx-16">
        <motion.div
          className="flex flex-col items-center justify-center bg-yellow-400 p-6 rounded-lg w-1/4 cursor-pointer"
          initial="hidden"
          animate="visible"
          variants={statBoxVariants}
        >
          <FaTasks className="text-4xl mb-4" />
          <h3 className="text-lg font-semibold mb-2">Tasks</h3>
          <p className="text-gray-700">You have 5 pending tasks.</p>
        </motion.div>
        <motion.div
          className="flex flex-col items-center justify-center bg-green-400 p-6 rounded-lg w-1/4 cursor-pointer"
          initial="hidden"
          animate="visible"
          variants={statBoxVariants}
          transition={{ delay: 0.2 }}
        >
          <FaProjectDiagram className="text-4xl mb-4" />
          <h3 className="text-lg font-semibold mb-2">Projects</h3>
          <p className="text-gray-700">You are managing 3 projects.</p>
        </motion.div>
        <motion.div
          className="flex flex-col items-center justify-center bg-purple-400 p-6 rounded-lg w-1/4 cursor-pointer"
          initial="hidden"
          animate="visible"
          variants={statBoxVariants}
          transition={{ delay: 0.4 }}
        >
          <FaEnvelope className="text-4xl mb-4" />
          <h3 className="text-lg font-semibold mb-2">Messages</h3>
          <p className="text-gray-700">You have 2 unread messages.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
