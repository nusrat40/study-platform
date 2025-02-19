import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const PopularCourse = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

   const { data: allSessions = [], refetch } = useQuery({
      queryKey: ["allSessions"],
      queryFn: async () => {
        const res = await axiosPublic.get("/sessions/allApproved");
        return res.data;
      },
    });

  const popularCourses = allSessions.slice(0, 3); // Select the first 3 courses

  return (
    <div className="my-20 container mx-auto px-12">
      <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">
     Most Popular Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {popularCourses.map((course, index) => (
          <div
            key={index}
            className=" rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            {/* <img
              src={course.image}
              alt={course.title}
              className="w-full h-56 object-cover"
            /> */}
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {course.title}
              </h2>
              <p className="text-gray-600 mt-2">{course.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-[#a054f4]">
                  ${course.registrationFee}
                </span>
                <button
                 onClick={()=>navigate('/courses')}
                  className="px-4 py-2 bg-[#a054f4] text-white font-bold rounded-lg hover:bg-[#8a3ee5] transition"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCourse;
