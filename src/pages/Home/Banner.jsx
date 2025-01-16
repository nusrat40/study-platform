import React from "react";
import heroBg from "../../assets/hero-bg.png";

const Banner = () => {
  return (
    <div className="hero bg-[#f5edfe] min-h-screen container mx-auto px-12">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-4 p-3 lg:p-6">
        <div>
          <h1 className="text-6xl font-bold">
            Find The Best Course To Grow Your Skills
          </h1>
          <p className=" text-xl text-gray-500 py-6">
            Learn Something new every day and get inspired by the diversity of
            online learning
          </p>
          <button className="btn bg-[#ad6cf5] text-white font-bold ">Sign Up To Find Our Courses</button>
        </div>
        <img src={heroBg} />
      </div>
    </div>
  );
};

export default Banner;
