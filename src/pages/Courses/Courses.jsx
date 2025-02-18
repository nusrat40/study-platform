import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Courses = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("lowToHigh"); // Sorting order state

  const { data: allSessions = [] } = useQuery({
    queryKey: ["allSessions"],
    queryFn: async () => {
      const res = await axiosPublic.get("/sessions/allApproved");
      return res.data;
    },
  });

  // Sorting function
  const sortedSessions = [...allSessions].sort((a, b) => {
    return sortOrder === "lowToHigh"
      ? a.registrationFee - b.registrationFee
      : b.registrationFee - a.registrationFee;
  });

  return (
    <div className="">
      {/* Header Section */}
      <div className="text-center bg-[#f5edfe] p-20">
        <h1 className="text-5xl font-bold text-[#6C3DBD]">Explore Our Courses</h1>
        <p className="text-lg mt-6 max-w-2xl mx-auto text-gray-600">
          Here we offer a diverse range of courses designed to meet the educational needs of learners. 
          Explore and discover the path that's right for you.
        </p>
      </div>

      {/* Sorting Dropdown */}
      <div className="flex justify-end px-6 py-4">
        <label className="mr-2 text-lg font-semibold text-gray-700">Sort by Fee:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6C3DBD]"
        >
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-10">
        {sortedSessions.map((session, index) => {
          const isOngoing =
            new Date() >= new Date(session.registrationStartDate) &&
            new Date() <= new Date(session.registrationEndDate);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-2xl overflow-hidden p-6 transform transition-all border border-gray-200 hover:shadow-xl"
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#6C3DBD]">{session.title}</h2>
                <p className="mt-3 text-gray-700">{session.description}</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">
                  Fee: ${session.registrationFee}
                </p>
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <span
                  className={`px-4 py-2 rounded-full text-lg font-semibold ${
                    isOngoing ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                  }`}
                >
                  {isOngoing ? "Ongoing" : "Closed"}
                </span>
                <button
                  onClick={() => navigate(`/sessionDetails/${session._id}`)}
                  className="bg-[#6C3DBD] hover:bg-[#502F94] transition px-6 py-2 rounded-full text-white font-semibold shadow-md"
                >
                  Read More
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
