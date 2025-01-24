import React from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import note from "../../../assets/note.json";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const navigate =useNavigate();

  const onSubmit = async (data) => {

    const allNotes = await axiosSecure.post("/notes", data);
    if (allNotes.data.insertedId) {
      reset();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Note is created",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    navigate('/dashboard/manageNotes');
  };

  return (
    <div>
      <Helmet>
        <title>iLearning | Create Note</title>
      </Helmet>

      <div className="flex flex-col lg:flex-row-reverse items-center  overflow-x-hidden" >

      <div className="w-[300px] sm:w-[400px] lg:w-[600px] flex justify-center">
            <Lottie animationData={note}></Lottie>
          </div>
  


        <div className="w-full lg:w-1/2 px-4 sm:px-8 lg:px-0">
          <h1 className="text-3xl font-bold mb-4">Create Notes</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
             <div>
                    <label className="label font-medium">Student Email</label>
                    <input
                        type="text"
                        value={user.email}
                        {...register('studentEmail')}
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>

            <div>
              <label className="label font-medium">Title</label>
              <input
                type="text"
                {...register("title", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label font-medium">Note Description</label>
              <textarea
                {...register("description", { required: true })}
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn bg-[#a054f4] text-white font-bold w-full"
            >
              Create Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
