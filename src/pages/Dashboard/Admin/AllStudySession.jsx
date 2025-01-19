import React from "react";
import useAllStudySession from "../../../hooks/useAllStudySession";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";
import noPost from "../../../assets/noPost.json";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheck, FaEdit, FaTimes, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const AllStudySession = () => {
  const [session, refetch] = useAllStudySession();
  const axiosSecure = useAxiosSecure();

  const handleApprove = async (id)=>{
    Swal.fire({
        title: "Approve Study Session",
        html: `
          <form id="approveForm">
            <div>
              <label>Is the session free?</label>
              <select id="isFree">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
              <label>Registration Fee</label>
              <input type="number" id="registrationFee" placeholder="Enter amount if paid" />
            </div>
          </form>
        `,
        showCancelButton: true,
        confirmButtonText: "Approve",
        preConfirm: () => {
          const isFree = document.getElementById("isFree").value === "true";
          const registrationFee = isFree ? 0 : parseFloat(document.getElementById("registrationFee").value || "0");
          return { isFree, registrationFee };
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { isFree, registrationFee } = result.value;
          await axiosSecure.patch(`/sessions/approve/${id}`, { isFree, registrationFee });
          Swal.fire("Success", "Session approved successfully!", "success");
          refetch();
        }
      });

  };

  const handleReject = async(id)=>{
    Swal.fire({
        title: "Reject Study Session",
        text: "Are you sure you want to reject this session?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Reject",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axiosSecure.patch(`/sessions/reject/${id}`);
            Swal.fire("Rejected!", "The session has been rejected.", "success");
            refetch(); // Refetch data to update the UI
          } catch (error) {
            console.log(error);
            
            Swal.fire("Error", "Failed to reject the session. Please try again.", "error");
          }
        }
      });

  };

  const handleUpdate=(id)=>{

  };

  const handleDelete = id=>{

  }

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
          <h1 className="text-3xl font-bold mb-4">All Study Sessions</h1>
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Tutor</th>
                  <th>Registration Fee</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {session.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.tutorName}</td>
                    <td>{item.registrationFee}</td>
                    <td>{item.status}</td>
                    <td>
                  {item.status === "pending"|| item.status === "rejected" ? (
                    <>
                      <button
                        onClick={() => handleApprove(item._id)}
                        className="btn btn-ghost btn-sm bg-green-500 text-white"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleReject(item._id)}
                        className="btn btn-ghost btn-sm bg-red-500 text-white ml-3"
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : item.status === "approved" ? (
                    <>
                      <button
                        onClick={() => handleUpdate(item._id)}
                        className="btn btn-ghost btn-sm bg-blue-500 text-white"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-ghost btn-sm bg-red-500 text-white ml-3"
                      >
                        <FaTrashAlt />
                      </button>
                    </>
                  ) : null}
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

export default AllStudySession;
