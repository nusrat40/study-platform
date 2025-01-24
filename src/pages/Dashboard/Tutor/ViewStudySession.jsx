import React, { useEffect, useState } from "react";
import useStudySession from "../../../hooks/useStudySession";
import { Helmet } from "react-helmet-async";
import noPost from "../../../assets/noPost.json";
import Lottie from "lottie-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ViewStudySession = () => {
  const [session,loading, refetch,] = useStudySession();

  const axiosSecure =useAxiosSecure();

  const [rejectionDetails, setRejectionDetails] = useState({});
  const [selectedRejection, setSelectedRejection] = useState(null);

  useEffect(() => {
    const fetchRejections = async () => {
      const rejectedSessions = session.filter((s) => s.status === "rejected");
      const details = await Promise.all(
        rejectedSessions.map(async (item) => {
          const { data } = await axiosSecure.get(`/rejections/${item._id}`);
          return { sessionId: item._id, ...data };
        })
      );
      setRejectionDetails(
        details.reduce((acc, curr) => {
          acc[curr.sessionId] = curr;
          return acc;
        }, {})
      );
    };

    if (session.length > 0) {
      fetchRejections();
    }
  }, [session]);


  return (
    <div >
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
                  <th></th>
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
                    <td>
                    {item.status === "rejected" && (
                        <button
                          onClick={() => setSelectedRejection(rejectionDetails[item._id])}
                          className="btn btn-sm btn-primary"
                        >
                          Reason
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}


      {/* Modal */}
      {selectedRejection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Rejection Details</h2>
            <p>
              <strong>Reason:</strong> {selectedRejection.rejectionReason || "No reason provided"}
            </p>
            <p>
              <strong>Feedback:</strong> {selectedRejection.feedback || "No feedback provided"}
            </p>
            <button
              onClick={() => setSelectedRejection(null)}
              className="mt-4 btn btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      )}


    </div>
  );
};

export default ViewStudySession;
