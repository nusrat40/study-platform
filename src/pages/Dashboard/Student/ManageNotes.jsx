import React from 'react';
import useNotes from '../../../hooks/useNotes';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import noPost from '../../../assets/noPost.json';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const ManageNotes = () => {

    const  [notes, loading, refetch] =useNotes();
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
            const res = await axiosSecure.delete(`/notes/${id}`);
        
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                position: "center",
                icon: "success",
                title: 'Note has been deleted',
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
          <title>iLearning | All Notes</title>
        </Helmet>
  
        {notes.length === 0 ? (
          <div className="">
            <h2 className="text-3xl text-center font-bold">
              No Notes Available At This Moment
            </h2>
            <div className="w-[400px] lg:w-[600px] mx-auto">
              <Lottie animationData={noPost}></Lottie>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-4">My Notes</h1>
            <div className="overflow-x-auto">
              <table className="table w-full">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {notes.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                     
                      <td>
                          <div className='flex flex-col lg:flex-row gap-2'>
                          <Link to={`/dashboard/updateNote/${item._id}`}>
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

export default ManageNotes;