import React from "react";
import useAllStudySession from "../../../hooks/useAllStudySession";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";
import noPost from "../../../assets/noPost.json";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheck, FaEdit, FaTimes, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AllStudySession = () => {
  const [session,loading, refetch] = useAllStudySession();
  
  const axiosSecure = useAxiosSecure();

  const handleApprove = async (id) => {
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
        const registrationFee = isFree
          ? 0
          : parseFloat(document.getElementById("registrationFee").value || "0");
        return { isFree, registrationFee };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { isFree, registrationFee } = result.value;
        await axiosSecure.patch(`/sessions/approve/${id}`, {
          isFree,
          registrationFee,
        });
        Swal.fire("Success", "Session approved successfully!", "success");
        refetch();
      }
    });
  };

  const handleReject = async (id) => {
    Swal.fire({
      title: "Reject Study Session",
      html: `
      <form id="rejectForm">
        <div>
          <label for="rejectionReason">Reason for Rejection:</label>
          <input type="text" id="rejectionReason" placeholder="Enter reason" class="swal2-input" required />
        </div>
        <div>
          <label for="feedback">Feedback:</label>
          <textarea id="feedback" placeholder="Provide feedback" class="swal2-textarea" required></textarea>
        </div>
      </form>
    `,
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
      preConfirm: () => {
        const rejectionReason = document.getElementById("rejectionReason").value;
        const feedback = document.getElementById("feedback").value;
        if (!rejectionReason || !feedback) {
          Swal.showValidationMessage("Both fields are required");
        }
        return { rejectionReason, feedback };
      },
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { rejectionReason, feedback } = result.value;
        try {
          await axiosSecure.patch(`/sessions/reject/${id}`);
          await axiosSecure.post(`/rejections`, { sessionId: id, rejectionReason, feedback });
          Swal.fire("Rejected!", "The session has been rejected.", "success");
          refetch(); // Refetch data to update the UI
        } catch (error) {
          console.log(error);

          Swal.fire(
            "Error",
            "Failed to reject the session. Please try again.",
            "error"
          );
        }
      }
    });
  };


  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/sessions/${id}`);
    
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: 'Session has been deleted',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };



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
                      {item.status === "pending" ||
                      item.status === "rejected" ? (
                        <div className="flex flex-col lg:flex-row gap-2">
                          <button
                            onClick={() => handleApprove(item._id)}
                            className="btn btn-ghost btn-sm bg-green-500 text-white"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => handleReject(item._id)}
                            className="btn btn-ghost btn-sm bg-red-500 text-white"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ) : item.status === "approved" ? (
                        <div className="flex flex-col lg:flex-row gap-2">
                          <Link to={`/dashboard/updateItem/${item._id}`}>
                          <button
                            className="btn btn-ghost btn-sm bg-blue-500 text-white"
                          >
                            <FaEdit />
                          </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="btn btn-ghost btn-sm bg-red-500 text-white"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
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
