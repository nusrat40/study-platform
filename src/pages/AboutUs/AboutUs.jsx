import React from "react";
import pic from '../../assets/about.jpg'

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="text-center bg-[#f5edfe] p-20">
        <h1 className="text-5xl font-bold text-[#6C3DBD]">Welcome to iLearning</h1>
        <p className="text-lg mt-2 max-w-2xl mx-auto">
          An innovative platform connecting tutors and students for an engaging and seamless learning experience.
        </p>
      </div>

      {/* Our Mission Section */}
      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <img
          src={pic}
          alt="Volunteer Work"
          className="rounded-lg shadow-lg w-full"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          Our mission is to empower learners and educators by providing an intuitive, technology-driven platform that simplifies learning, fosters engagement, and streamlines study management.
          </p>
        </div>
      </div>


      {/* Key Features Section */}
      <div className="max-w-5xl mx-auto mt-16 text-center">
      <h2 className="text-3xl font-bold text-gray-800">Why Choose Us?</h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-10 px-6">
        <div className="bg-white p-7 shadow-lg rounded-xl text-center">
          <h3 className="text-xl font-semibold text-[#ad6cf5]"> Interactive Learning</h3>
          <p className="text-gray-600 mt-2">
            Engage in real-time study sessions with tutors and fellow learners.
          </p>
        </div>

        <div className="bg-white p-6 shadow-lg rounded-xl text-center">
          <h3 className="text-xl font-semibold text-[#ad6cf5]"> Study Session Management</h3>
          <p className="text-gray-600 mt-2">
            Easily organize and schedule lessons to fit your learning needs.
          </p>
        </div>

        <div className="bg-white p-6 shadow-lg rounded-xl text-center">
          <h3 className="text-xl font-semibold text-[#ad6cf5]"> Secure Payments</h3>
          <p className="text-gray-600 mt-2">
            Integrated Stripe payments ensure seamless and secure transactions.
          </p>
        </div>

      
      </div>
      </div>

      {/* Call to Action Section */}
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800">Ready to Begin Your Learning Journey?</h2>
        <p className="text-lg text-gray-600 mt-2">Join iLearning today and take your education to the next level.</p>
        <a
          href="/signup"
          className="mt-4 inline-block bg-[#ad6cf5] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
