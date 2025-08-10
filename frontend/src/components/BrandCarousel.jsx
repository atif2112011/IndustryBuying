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
import { getBrandIcons } from "../apis/content";



function BrandCarousel() {
  

const [brands,setBrands]=useState([])
useEffect(()=>{
  const fetchData = async () => {
    const response = await getBrandIcons();
    if (response.success) {
      setBrands(response.brands);
    }
  }
  fetchData();

},[])

  return (
    <div className="w-full py-6">
      <h3 className="!text-sm md:!text-lg !font-semibold mb-4">TRUSTED BRANDS</h3>
      {brands && brands.length>0 && <Swiper
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
        {brands.map((brand, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <img loading="lazy" src={brand.img.secure_url} alt={`brand-${brand.name}`} className="h-24 object-contain w-full max-w-[100px]" />
          </SwiperSlide>
        ))}
      </Swiper>}
    </div>
  );
}

export default BrandCarousel;
