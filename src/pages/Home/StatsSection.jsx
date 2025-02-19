import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaUserGraduate, FaAward, FaBook, FaChalkboardTeacher } from "react-icons/fa";

const StatsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Ensures the animation plays only once when in view
    threshold: 0.3, // Starts counting when 30% of the section is visible
  });

  return (
    <div ref={ref} className="bg-[#0a033c] text-white py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        
        <div className="flex flex-col items-center">
          <FaUserGraduate className="text-5xl text-[#ad6cf5]" />
          <h2 className="text-4xl font-bold mt-2">
            {inView && <CountUp start={0} end={550} duration={3} />}+
          </h2>
          <p className="text-gray-300">Students Enrolled</p>
        </div>

        <div className="flex flex-col items-center">
          <FaAward className="text-5xl text-[#ad6cf5]" />
          <h2 className="text-4xl font-bold mt-2">
            {inView && <CountUp start={0} end={100} duration={3} />}+
          </h2>
          <p className="text-gray-300">Satisfaction Rate</p>
        </div>

        <div className="flex flex-col items-center">
          <FaBook className="text-5xl text-[#ad6cf5]" />
          <h2 className="text-4xl font-bold mt-2">
            {inView && <CountUp start={0} end={300} duration={3} />}+
          </h2>
          <p className="text-gray-300">Academic Programs</p>
        </div>

        <div className="flex flex-col items-center">
          <FaChalkboardTeacher className="text-5xl text-[#ad6cf5]" />
          <h2 className="text-4xl font-bold mt-2">
            {inView && <CountUp start={0} end={40} duration={3} />}+
          </h2>
          <p className="text-gray-300">Online Instructors</p>
        </div>

      </div>
    </div>
  );
};

export default StatsSection;
