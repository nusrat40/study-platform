import React from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const SessionDetails = () => {
  const sessionData = useLoaderData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    _id,
    title,
    description,
    registrationStartDate,
    registrationEndDate,
    classStartDate,
    classEndDate,
    duration,
    tutorName,
    tutorEmail,
    registrationFee,
  } = sessionData;

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews/${_id}`);
      return res.data;
    },
  });

  const isOngoing =
    new Date() >= new Date(registrationStartDate) &&
    new Date() <= new Date(registrationEndDate);

  const isAdminOrTutor = user?.role === "admin" || user?.role === "tutor";

  const handleBooking = async () => {
    if (registrationFee === 0) {
      const response = await fetch("https://study-platform-server-gold.vercel.app/bookedSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ sessionId: _id, studentEmail: user.email }),
      });
      const data = await response.json();
      if (data.insertedId) {
        toast.success("Session booked successfully!");
      } else {
        toast.error("Failed to book session.");
      }
    } else {
      // Redirect to payment page
      navigate("/payment", {
        state: {
          price: registrationFee,
          sessionId: _id,
          sessionDetails: {
            title,
            description,
            registrationStartDate,
            registrationEndDate,
            classStartDate,
            classEndDate,
            duration,
            tutorName,
            tutorEmail,
            registrationFee,
          },
        },
      });
    }
  };

  return (
    <div className="mt-10">
      <Helmet>
        <title>iLearning | Session Details</title>
      </Helmet>

      {/* Page Title */}
      <h1 className="text-5xl font-bold text-center text-[#6C3DBD] mb-6">
        Session Details
      </h1>

      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-200"
      >
        {/* Session Title */}
        <h2 className="text-3xl font-bold text-[#6C3DBD]">{title}</h2>
        <p className="mt-2 text-gray-600">{description}</p>

        {/* Session Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-gray-700">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold">Tutor:</p>
            <p className="text-lg">{tutorName}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold">Duration:</p>
            <p className="text-lg">{duration}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold">Class Start:</p>
            <p className="text-lg">{classStartDate}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold">Class End:</p>
            <p className="text-lg">{classEndDate}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold">Registration Start:</p>
            <p className="text-lg">{registrationStartDate}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold">Registration End:</p>
            <p className="text-lg">{registrationEndDate}</p>
          </div>
        </div>

        {/* Registration Fee */}
        <div className="mt-6">
          <span className="inline-block bg-[#6C3DBD] text-white px-4 py-2 rounded-full text-lg font-semibold">
            Fee: ${registrationFee}
          </span>
        </div>

        {/* Booking Button */}
        <div className="mt-6">
          {isOngoing ? (
            <button
              onClick={handleBooking}
              disabled={isAdminOrTutor}
              className="w-full bg-[#6C3DBD] hover:bg-[#502F94] transition px-6 py-3 rounded-lg text-white font-semibold shadow-md"
            >
              {isAdminOrTutor ? "Admins & Tutors Can't Book" : "Book Now"}
            </button>
          ) : (
            <button
              disabled
              className="w-full bg-gray-500 px-6 py-3 rounded-lg text-white font-semibold shadow-md cursor-not-allowed"
            >
              Registration Closed
            </button>
          )}
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-[#6C3DBD]">Reviews</h3>
          {reviews.length > 0 ? (
            <div className="mt-4 space-y-4">
              {reviews.map((item, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-lg font-semibold">"{item.review}"</p>
                  <p className="text-sm text-gray-600">⭐ Rating: {item.rating}/5</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 mt-2">No reviews available for this session.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SessionDetails;
