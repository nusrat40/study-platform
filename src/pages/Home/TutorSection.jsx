import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const TutorSection = () => {
  const axiosPublic = useAxiosPublic();

  const { data: tutors = [], refetch } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users/tutors");
      return res.data;
    },
  });

  return (
    <div className="space-y-10 my-20">
      <h1 className="text-5xl font-bold text-center">Meet Our Mentors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-4">
        {tutors.map((tutor, index) => (
          <div key={index} className="card bg-base-100  shadow-xl p-3">
            <figure>
              <img
                src={tutor.photo}
                alt="photo"
              />
            </figure>
            <div className="card-body items-center">
              <h2 className="card-title font-bold">{tutor.name}</h2>
              <p>{tutor.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorSection;
