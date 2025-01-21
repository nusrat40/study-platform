import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const UpdateNote = () => {

    const { _id, title, description} = useLoaderData();
  const navigate = useNavigate();

  const { register, handleSubmit,reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit =async (data) =>{
          
         const updatedNote = {
           
             title: data.title,
             description:data.description
         }
 
         const noteRes = await axiosSecure.patch(`notes/${_id}`,updatedNote);
         if(noteRes.data.modifiedCount > 0){
            
             Swal.fire({
                 position: "center",
                 icon: "success",
                 title: `${data.title} is updated.`,
                 showConfirmButton: false,
                 timer: 1500
               });
         }
         reset();
         navigate('/dashboard/manageNotes')

 
     }


    return (
      <div>
            <Helmet>
              <title>iLearning | Update Note</title>
            </Helmet>
            <h1 className="text-3xl font-bold mb-4">Update Notes</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div>
              <label className="label font-medium">Title</label>
              <input
                type="text"
                defaultValue={title}
                {...register("title", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label font-medium">Session Description</label>
              <textarea
              defaultValue={description}
                {...register("description", { required: true })}
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn bg-[#a054f4] text-white font-bold w-full"
            >
              Update Note
            </button>
          </form>
          </div>
    );
};

export default UpdateNote;