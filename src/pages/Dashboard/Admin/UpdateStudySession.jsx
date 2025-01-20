import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useLoaderData, useNavigate } from 'react-router-dom';

const UpdateStudySession = () => {

    const sessionData =useLoaderData();
    const {title,tutorName,duration,registrationFee,_id}=sessionData || {};

    const axiosSecure =useAxiosSecure();
    const {register, handleSubmit, reset,setValue} = useForm();
    const navigate=useNavigate();

    // Set initial form values when data is loaded
    useEffect(() => {
        if (sessionData) {
            setValue('title', title);
            setValue('duration', duration);
            setValue('registrationFee', registrationFee);
        }
    }, [sessionData, setValue]);

    const onSubmit =async (data) =>{
         
        const updatedSession = {
            ...sessionData,
            title: data.title,
            duration:data.duration,
            registrationFee:data.registrationFee
        }

        const sessionRes = await axiosSecure.patch(`sessions/${_id}`,updatedSession);
        if(sessionRes.data.modifiedCount > 0){
           
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.title} is updated.`,
                showConfirmButton: false,
                timer: 1500
              });
        }
        reset();
        navigate('/dashboard/allStudySession')

        

    }



    return (
         <div>
              <Helmet>
                <title>iLearning | Update Session</title>
              </Helmet>
              <h1 className="text-3xl font-bold mb-4">Update Study Session</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
                {/* form row */}
                <div className='md:flex gap-4'>
                <div className='form-control md:w-1/2'>
                <label className="label font-medium">Session Title</label>
                  <input
                    type="text"
                    {...register("title", { required: true })}
                    className="input input-bordered w-full"
                    
                  />
                </div>
                <div className='form-control md:w-1/2'>
                  <label className="label font-medium">Tutor Name</label>
                  <input
                    type="text"
                    value={tutorName}
                    readOnly
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
                <div className="form-control md:w-1/2">
                        <label className="label font-medium">Registration Fee</label>
                        <input
                            type="number"
                            {...register('registrationFee', { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>
              
                <button
                  type="submit"
                  className="btn bg-[#a054f4] text-white font-bold w-full"
                >
                  Update Session
                </button>
              </form>
            </div>
    );
};

export default UpdateStudySession;