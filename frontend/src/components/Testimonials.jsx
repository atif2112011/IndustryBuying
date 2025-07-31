// TestimonialCarousel.jsx
import threem from '../assets/images/brands/3m.png';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import { useEffect, useState } from 'react';
import { getTestimonials } from '../apis/content';



const TestimonialCarousel = () => {

  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getTestimonials();
      if (response.success) {
        setTestimonials(response.testimonials);
      }
    }
    fetchData();

  },[])

    return (
    <div className="w-full py-6">
      <div className="text-center mb-4">
        <h2 className="!text-blue-950 !text-md md:!text-lg !font-semibold">TESTIMONIALS</h2>
        <p className="!text-sm !text-gray-600">What our clients say about us</p>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full px-4"
      >
        {testimonials && testimonials.length > 0 && testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-6 rounded-md shadow-lg h-86 overflow-hidden">
              <div className="flex items-center space-x-4 mb-4">
                <img src={testimonial?.logo?.secure_url || ""} alt={testimonial?.company || ""} className="w-12 h-12 object-contain" />
                <div>
                  <h3 className="!text-lg !font-semibold">{testimonial?.name || ""} </h3>
                  <p className="!text-sm !text-gray-500">{testimonial?.designation || ""}</p>
                </div>
              </div>
              <p className="!text-xs md:!text-sm !text-gray-800 !leading-relaxed h-full">{testimonial?.message || ""}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialCarousel;
