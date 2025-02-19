import React from "react";
import { useNavigate } from "react-router-dom";
import pic from '../../assets/sub.webp'

const Subscribe= () => {
  const navigate = useNavigate();

  return (
    <div className=" py-16 px-6 rounded-lg">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left Section */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Subscribe to Get Updates on New Courses
          </h2>
          <p className="text-gray-400 text-lg">
            20k+ students learn daily with us. Join now and explore endless learning opportunities.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-[#a054f4] text-white px-6 py-3 rounded-md text-lg font-semibold transition duration-300"
          >
            Register Now
          </button>
        </div>

        {/* Right Section - Image */}
        <div>
          <img
            src={pic}
            alt="Student Learning"
            className="rounded-lg w-full object-cover"
          />
        </div>

      </div>
    </div>
  );
};

export default Subscribe;
