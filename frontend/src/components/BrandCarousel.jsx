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
    <div className="w-full py-6 ">
      <div className="overflow-hidden">
        <h3 className="poppins-semibold w-full">
            TRUSTED BRANDS
        </h3>

        <Swiper
  modules={[Pagination, Autoplay]}
  spaceBetween={30}
  slidesPerView={5}
  autoplay={{ delay: 2000 }}
  pagination={{ clickable: true }}
   breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
  loop={true}
  className="bg-white my-4 shadow-lg"
 
>
         <SwiperSlide className="flex items-center justify-center">
            <img src={duracell} alt="brandicon" className="h-32 object-contain" />
          </SwiperSlide>
         <SwiperSlide className="flex items-center justify-center">
            <img src={threem} alt="brandicon" className="h-32 object-contain" />
          </SwiperSlide>
         <SwiperSlide className="flex items-center justify-center">
            <img src={uno} alt="brandicon" className="h-32 object-contain" />
          </SwiperSlide>
         <SwiperSlide className="flex items-center justify-center">
            <img src={safari} alt="brandicon" className="h-32 object-contain" />
          </SwiperSlide>
         <SwiperSlide className="flex items-center justify-center">
            <img src={bosch} alt="brandicon" className="h-32 object-contain" />
          </SwiperSlide>
         <SwiperSlide className="flex items-center justify-center">
            <img src={aristo} alt="brandicon" className="h-32 object-contain" />
          </SwiperSlide>
      </Swiper>
        </div>
    </div>
  );
}

export default BrandCarousel;
