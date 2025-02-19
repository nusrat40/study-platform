import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Gamer & Reviewer",
    image: "https://i.ibb.co.com/JRnspF4x/testimonial-1.png",
    review:
      "This platform helped me connect with expert tutors and improve my coding skills. The interactive sessions were incredibly useful!",
    rating: 5.0,
  },
  {
    id: 2,
    name: "Samantha Lee",
    role: "Game Developer",
    image: "https://i.ibb.co.com/39891pT2/testimonial-2.png",
    review:
      "The study sessions are well-structured, and the tutors are highly knowledgeable. I feel more confident in my coursework now!",
    rating: 5.0,
  },
  {
    id: 3,
    name: "David Parker",
    role: "Esports Enthusiast",
    image: "https://i.ibb.co.com/VpDvm7TN/testimonial-3.png",
    review:
      "I love the personalized learning experience. The resources and guidance have been crucial in preparing for my exams!",
    rating: 5.0,
  },
];

const Testimonial = () => {
  return (
    <div className="py-16 bg-[#f7f5fa] text-center">
      <h2 className="text-5xl font-bold text-[#3b3563] mb-8">
        What Our Student Says
      </h2>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-6xl mx-auto"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 mx-auto rounded-full mb-4 border-4 border-[#ad6cf5]"
              />
              <h3 className="text-xl font-bold text-[#3b3563]">
                {testimonial.name}
              </h3>
              <p className="text-gray-500 text-sm">{testimonial.role}</p>
              <p className="mt-3 text-gray-700">{testimonial.review}</p>
              <div className="mt-4 text-yellow-500 text-lg">
                {"⭐".repeat(5)} <span className="text-gray-600">({testimonial.rating})</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
