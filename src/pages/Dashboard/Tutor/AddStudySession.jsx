import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';


const AddStudySession = () => {

    const {user}=useAuth();
    const axiosSecure =useAxiosSecure();
    const {register, handleSubmit, reset} = useForm();

    const onSubmit =async (data) =>{
        data.tutorName =user.displayName;
        data.tutorEmail =user.email;
        data.registrationFee =0;
        data.status= "pending";

        const allSession = await axiosSecure.post('/sessions', data);
        if(allSession.data.insertedId){
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'Session is added',
                showConfirmButton: false,
                timer: 1500
              });

        }
        

    }



    return (
        <div>
      <Helmet>
        <title>iLearning | Create Session</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-4">Create Study Session</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label font-medium">Session Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
    
        {/* form row */}
        <div className='md:flex gap-4'>
        <div className='form-control md:w-1/2'>
          <label className="label font-medium">Tutor Name</label>
          <input
            type="text"
            value={user.displayName}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div className='form-control md:w-1/2'>
          <label className="label font-medium">Tutor Email</label>
          <input
            type="text"
            value={user.email}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        </div>


        <div>
          <label className="label font-medium">Session Description</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        {/* form row */}
        <div className='md:flex gap-4'>
        <div className='form-control md:w-1/2'>
          <label className="label font-medium">Registration Start Date</label>
          <input
            type="date"
            {...register("registrationStartDate", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        <div className='form-control md:w-1/2'>
          <label className="label font-medium">Registration End Date</label>
          <input
            type="date"
            {...register("registrationEndDate", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        </div>


        {/* form row */}
        <div className='md:flex gap-4'>
        <div className='form-control md:w-1/2'>
          <label className="label font-medium">Class Start Date</label>
          <input
            type="date"
            {...register("classStartDate", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        <div className='form-control md:w-1/2'>
          <label className="label font-medium">Class End Date</label>
          <input
            type="date"
            {...register("classEndDate", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        </div>


        {/* form row */}
        <div className='md:flex gap-4'>
        <div className='form-control md:w-1/2'>
          <label className="label font-medium">Session Duration</label>
          <input
            type="text"
            {...register("duration", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        <div className='form-control md:w-1/2'>
          <label className="label font-medium">Registration Fee</label>
          <input
            type="number"
            value={0}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        </div>
      
        <button
          type="submit"
          className="btn bg-[#a054f4] text-white font-bold w-full"
        >
          Create Session
        </button>
      </form>
    </div>
    );
};

export default AddStudySession;