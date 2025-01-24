import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const BookedSessionDetail = () => {

  const {
    sessionId,
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
  } = useLoaderData();


const axiosSecure =useAxiosSecure();
    const {register, handleSubmit, reset} = useForm();

    const onSubmit = async (data) => {

        const reviewData = {
          sessionId, 
          ...data, 
        };
        // mutation.mutate(reviewData);
        // reset(); 
        const reviewRes = await axiosSecure.post('/reviews', reviewData);
        if(reviewRes.data.insertedId){
            reset();
            Swal.fire({
                position: "center",
                icon: "success",
                title: 'Review is added',
                showConfirmButton: false,
                timer: 1500
              });

        }
      };

  return (
    <div className="mt-8">
    <Helmet>
      <title>iLearning | Session Details</title>
    </Helmet>
    <h1 className="text-5xl font-bold text-center">
      Here is the Session Details
    </h1>
    <div className="card bg-[#f7f5fa] shadow-xl m-10 p-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-gray-500">{description}</p>
        <h3 className="font-bold">Tutor: <span className="font-normal">{tutorName}</span></h3>
        <h3 className="font-bold">Tutor Mail: <span className="font-normal">{tutorEmail}</span></h3>
        <div className="flex gap-3">
          <p className="font-bold">
            Registration Start :
            <span className="font-normal"> {registrationStartDate}</span>
          </p>
          <p className="font-bold">
            Registration End : <span className="font-normal">{registrationEndDate}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <p className="font-bold">
            Class Start :
            <span className="font-normal"> {classStartDate}</span>
          </p>
          <p className="font-bold">
            Class End : <span className="font-normal">{classEndDate}</span>
          </p>
        </div>
        <p className="font-bold">
            Session Duration : <span className="font-normal">{duration}</span>
          </p>
        <p className="font-bold">
            Registration Fee : <span className="font-normal">{registrationFee}</span>
          </p>

          
            {/* Review Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <textarea
        {...register("review", { required: "Review is required" })}
        className="textarea textarea-bordered w-full"
        placeholder="Write your review here..."
      ></textarea>
      <div className="flex items-center mt-3 gap-3">
        <label>Rating:</label>
        <input
          type="number"
          {...register("rating", {
            required: "Rating is required",
            min: { value: 1, message: "Minimum rating is 1" },
            max: { value: 10, message: "Maximum rating is 10" },
          })}
          className="input input-bordered w-16"
        />
      </div>
      <button className="btn bg-[#a054f4] text-white mt-4" type="submit">
        Submit Review
      </button>
        </form>  
        
      </div>
    </div>
  </div>
  )
};

export default BookedSessionDetail;
