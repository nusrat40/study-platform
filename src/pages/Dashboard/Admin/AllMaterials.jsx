import React from "react";
import useAllMaterials from "../../../hooks/useAllMaterials";
import { FaTrashAlt } from "react-icons/fa";
import Lottie from "lottie-react";
import noPost from '../../../assets/noPost.json'
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllMaterials = () => {
  const [materials, loading, refetch] = useAllMaterials();

  const axiosSecure = useAxiosSecure();

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
              const res = await axiosSecure.delete(`/materials/${id}`);
          
              if (res.data.deletedCount > 0) {
                refetch();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: 'Material has been deleted',
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
        <title>iLearning | All Materials</title>
      </Helmet>

      {materials.length === 0 ? (
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
          <h1 className="text-3xl font-bold mb-4">All Materials</h1>
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Tutor Mail</th>
                  <th>Image</th>
                  <th>Link</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.tutorEmail}</td>
                    <td>
                      <img className="rounded-lg" src={item.image} alt="" />
                    </td>
                    <td>
                      <a href={item.link}>{item.link}</a>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-ghost btn-sm bg-red-500 text-white"
                      >
                        <FaTrashAlt />
                      </button>
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

export default AllMaterials;
