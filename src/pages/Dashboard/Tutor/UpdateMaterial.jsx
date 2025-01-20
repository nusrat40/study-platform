import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateMaterial = () => {
  const { _id, title, sessionId, tutorEmail, image, link } = useLoaderData();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const UpdatedMaterial = {
        title: data.title,
        sessionId: data.sessionId,
        tutorEmail: data.tutorEmail,
        image: res.data.data.display_url,
        link: data.link,
      };
      const materialRes = await axiosSecure.patch(
        `/materials/${_id}`,
        UpdatedMaterial
      );

      if (materialRes.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${data.title} is updated to the menu.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      navigate("/dashboard/viewMaterials");
    }
  };

  return (
    <div>
      <Helmet>
        <title>iLearning | Update Material</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-4">Update Materials</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
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
          <label className="label font-medium">Study Session ID</label>
          <input
            type="text"
            defaultValue={sessionId}
            {...register("sessionId")}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label font-medium">Tutor Email</label>
          <input
            type="text"
            defaultValue={tutorEmail}
            {...register("tutorEmail")}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label font-medium">Upload Image</label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label font-medium">Google Drive Link</label>
          <input
            type="text"
            defaultValue={link}
            {...register("link", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <button
          type="submit"
          className="btn bg-[#a054f4] text-white font-bold w-full"
        >
          Update Material
        </button>
      </form>
    </div>
  );
};

export default UpdateMaterial;
