import React from "react";
import { FaUserGraduate, FaAward, FaBook, FaChalkboardTeacher } from "react-icons/fa";

const StatsSection = () => {
  return (
    <div className="bg-[#0a043c] text-white py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        
        <div className="flex flex-col items-center">
          <FaUserGraduate className="text-5xl text-[#ff5e14]" />
          <h2 className="text-4xl font-bold mt-2">550+</h2>
          <p className="text-gray-300">Students Enrolled</p>
        </div>

        <div className="flex flex-col items-center">
          <FaAward className="text-5xl text-[#ff5e14]" />
          <h2 className="text-4xl font-bold mt-2">100+</h2>
          <p className="text-gray-300">Satisfaction Rate</p>
        </div>

        <div className="flex flex-col items-center">
          <FaBook className="text-5xl text-[#ff5e14]" />
          <h2 className="text-4xl font-bold mt-2">300+</h2>
          <p className="text-gray-300">Academic Programs</p>
        </div>

        <div className="flex flex-col items-center">
          <FaChalkboardTeacher className="text-5xl text-[#ff5e14]" />
          <h2 className="text-4xl font-bold mt-2">40+</h2>
          <p className="text-gray-300">Online Instructors</p>
        </div>

      </div>
    </div>
  );
};

export default StatsSection;
