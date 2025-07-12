import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";

import duracell from '../assets/images/brands/duracell.png';
import aristo from '../assets/images/brands/aristo.png';
import bosch from '../assets/images/brands/bosch.png';
import threem from '../assets/images/brands/3m.png';
import uno from '../assets/images/brands/uno.png';
import safari from '../assets/images/brands/safari.png';



function BrandCarousel() {
  



  return (
    <div className="w-full py-6">
      <h3 className="!text-md md:!text-lg !font-semibold mb-4">TRUSTED BRANDS</h3>
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={20}
        observer={true}
        observeParents={true}
        centeredSlides={false}
        breakpoints={{
          0: { slidesPerView: 3 },       // Mobile
          1024: { slidesPerView: 5 },    // Laptop and up
        }}
        className="w-full bg-white p-4 shadow-md"
      >
        {[duracell, threem, uno, safari, bosch, aristo].map((brand, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <img src={brand} alt={`brand-${index}`} className="h-24 object-contain w-full max-w-[100px]" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BrandCarousel;
