import React from "react";
import useStudySession from "../../../hooks/useStudySession";
import { Helmet } from "react-helmet-async";
import noPost from "../../../assets/noPost.json";
import Lottie from "lottie-react";

const ViewStudySession = () => {
  const [session, refetch, loading] = useStudySession();

  return (
    <div>
      <Helmet>
        <title>iLearning | Study Sessions</title>
      </Helmet>

      {session.length === 0 ? (
        <div className="">
          <h2 className="text-3xl text-center font-bold">
            No Post Available At This Moment
          </h2>
          <div className="w-[400px] lg:w-[600px] mx-auto">
            <Lottie animationData={noPost}></Lottie>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4">My Study Sessions</h1>
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Duration</th>
                  <th>Registration Fee</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {session.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.duration}</td>
                    <td>{item.registrationFee}</td>
                    <td>{item.status}</td>
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

export default ViewStudySession;
