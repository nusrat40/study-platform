import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import Lottie from 'lottie-react';
import noPost from '../../../assets/noPost.json';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UploadMaterials = () => {

    const [approvedSessions,setApprovedSessions]=useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const axiosSecure=useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset } = useForm();
    const{user}=useAuth();

    useEffect(() => {
        const fetchSessions = async () => {
            const res = await axiosSecure.get(`/sessions/approved?email=${user.email}`); 
            setApprovedSessions(res.data);
        };
        fetchSessions();
    }, [axiosSecure,user.email]);


    const onSubmit =async (data) =>{
        console.log(data);
        
        const imageFile = { image: data.image[0] }
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            if (res.data.success) {
                // now send the menu item data to the server with the image url
                const materialItem = {
                    title: data.title,
                    sessionId:selectedSession._id,
                    tutorEmail: data.tutorEmail,
                    image: res.data.data.display_url,
                    link: data.link
                    
                };
    
            const materialRes = await axiosSecure.post('/materials', materialItem);
        
            if(materialRes.data.insertedId){
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: 'Material is added',
                    showConfirmButton: false,
                    timer: 1500
                  });
    
            }
            
            }
        }


    return (
        <div>
            <Helmet>
                <title>iLearning | Upload Materials</title>
            </Helmet>
        <h1 className="text-3xl font-bold mb-4">Upload Materials</h1>

        {/* Approved Sessions List */}
        <div>
            <h2 className="text-2xl font-semibold mb-2">Approved Sessions</h2>


            {
                approvedSessions.length === 0 ? (
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
                        {approvedSessions.map((session) => (
                <div key={session._id} className="border rounded-lg p-4 mb-2 space-y-2">
                    <p><strong>Title:</strong> {session.title}</p>
                    <p><strong>Tutor:</strong> {session.tutorName}</p>
                    <button
                        className="btn bg-[#a054f4] text-white font-bold"
                        onClick={() => setSelectedSession(session)}
                    >
                        Upload Materials
                    </button>
                </div>
            ))}

                    </div>
                )
            }


        </div>

        {/* Upload Materials Form */}
        {selectedSession && (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                <h2 className="text-xl font-semibold mb-2">Upload Materials for: {selectedSession.title}</h2>

                <div>
                    <label className="label font-medium">Title</label>
                    <input
                        type="text"
                        value={selectedSession.title}
                        {...register('title', { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="label font-medium">Study Session ID</label>
                    <input
                        type="text"
                        value={selectedSession._id}
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="label font-medium">Tutor Email</label>
                    <input
                        type="text"
                        value={selectedSession.tutorEmail}
                        {...register('tutorEmail')}
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="label font-medium">Upload Image</label>
                    <input
                        type="file"
                        {...register('image', { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="label font-medium">Google Drive Link</label>
                    <input
                        type="text"
                        {...register('link', { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                <button type="submit" className="btn bg-[#a054f4] text-white font-bold w-full">Upload Material</button>
            </form>
        )}
    </div>
    );
};

export default UploadMaterials;