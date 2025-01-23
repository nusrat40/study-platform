import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const SessionDetails = () => {
  const sessionData = useLoaderData();
  const {user}=useAuth();
  const navigate=useNavigate();

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

  const isOngoing =
             new Date() >= new Date(registrationStartDate) &&
             new Date() <= new Date(registrationEndDate);

    const isAdminOrTutor = user?.role === "admin" || user?.role === "tutor";


    const handleBooking = async () => {

      if (registrationFee === 0) {
          // Free session, book directly
          const response = await fetch('http://localhost:5000/bookedSession', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify({ sessionId: _id, studentEmail: user.email }),
          });
          const data = await response.json();
          if (data.insertedId) {
              toast.success("Session booked successfully!");
          } else {
              toast.error( "Failed to book session.");
          }
      } else {
          // Redirect to payment page
          navigate('/payment', { 
            state: { 
              price: registrationFee, 
              sessionId: _id, 
              sessionDetails:{
                title,
              description,
              registrationStartDate,
              registrationEndDate,
              classStartDate,
              classEndDate,
              duration,
              tutorName,
              tutorEmail,
              registrationFee 
              }
            } 
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
          <h3 className="font-bold">Tutor: <span className="font-normal">{tutorName}</span></h3>
          <p className="font-bold">Rating:</p>
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
            <p>Reviews</p>
            {
              isOngoing ? (

                <button
                onClick={handleBooking}
                 disabled={isAdminOrTutor} className='btn bg-[#a054f4] text-white font-bold'>
                    Book Now
                </button>
                

              ) : (
               <button disabled className='btn bg-[#a054f4] text-white font-bold'>Registration Closed</button>

              )
            }
          
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
