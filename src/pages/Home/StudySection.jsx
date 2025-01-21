import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const StudySection = () => {

    const axiosPublic = useAxiosPublic();
    const navigate=useNavigate();

  const { data: allSessions = [], refetch } = useQuery({
    queryKey: ["allSessions"],
    queryFn: async () => {
      const res = await axiosPublic.get("/sessions/allApproved");
      return res.data;
    },
  });


    return (
        <div className="space-y-10 my-20">
        <h1 className="text-5xl font-bold text-center">Explore Our Study Sessions</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
          {allSessions.map((session, index) => {
             const isOngoing =
             new Date() >= new Date(session.registrationStartDate) &&
             new Date() <= new Date(session.registrationEndDate);

           return (
            <div key={index} className="card bg-base-100  shadow-xl p-3" style={{
                background: "linear-gradient(92.09deg, #ebdbfd 1.49%, #ffeeeb 99.1%)",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                margin: "10px",
                color: "#333",
              }}>
            <div className="card-body items-center">
            <h2 className='text-2xl font-bold'>{session.title}</h2>
            <p className='text-gray-500'>{session.description}</p>
            <div className='flex gap-6'>
                <button className='btn bg-[#a054f4] text-white font-bold'>{isOngoing ? "Ongoing" : "Closed"}</button>
                <button
                onClick={()=>navigate(`/sessionDetails/${session._id}`)}
                 className='btn bg-[#a054f4] text-white font-bold'>Read More</button>

            </div>
            </div>
          </div>
           )
       })}
        </div>
      </div>
    );
};

export default StudySection;