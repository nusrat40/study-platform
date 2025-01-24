import React from 'react';
import useBookedSession from '../../../hooks/useBookedSession';
import { Helmet } from 'react-helmet-async';
import Lottie from 'lottie-react';
import noPost from '../../../assets/noPost.json'
import { Link } from 'react-router-dom';

const BookedSession = () => {

    const  [sessions, loading, refetch] =useBookedSession();

    return (
          <div>
      <Helmet>
        <title>iLearning | Booked Sessions</title>
      </Helmet>

      {sessions.length === 0 ? (
        <div className="">
          <h2 className="text-3xl text-center font-bold">
            You have not booked any session.
          </h2>
          <div className="w-[400px] lg:w-[600px] mx-auto">
            <Lottie animationData={noPost}></Lottie>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4">All Booked Session</h1>
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Tutor Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.tutorName}</td>
                    <td>
                    <Link to={`/dashboard/bookedSessionDetail/${item._id}`}>
                          <button
                            className="btn bg-[#a054f4] text-white font-bold"
                          >
                            Details
                          </button>
                          </Link>
                    </td>  
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
    );
};

export default BookedSession;