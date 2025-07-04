import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../assets/images/carousel/img1.png";
import img2 from "../assets/images/carousel/img2.png";
import img3 from "../assets/images/carousel/img3.png";
import img4 from "../assets/images/landingpage/img4.png";
import img5 from "../assets/images/landingpage/img5.png";
import img6 from "../assets/images/landingpage/img6.png";
import img7 from "../assets/images/landingpage/img7.png";
import img8 from "../assets/images/landingpage/img8.png";
import price1 from "../assets/images/landingpage/price1.png";
import price2 from "../assets/images/landingpage/price2.png";
import price3 from "../assets/images/landingpage/price3.png";
import price4 from "../assets/images/landingpage/price4.png";
import CardDisplay from "../components/CardDisplay";
import BrandCarousel from "../components/BrandCarousel";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules for Swiper
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import TestimonialCarousel from "../components/Testimonials";

const dummydata2 = [
  {
    title: "Logitech Wireless Mouse M235",
    brand: "Logitech",
    price: 799,
    image: "https://m.media-amazon.com/images/I/61LtuGzXeaL._SX679_.jpg",
    rating: 4.2,
  },
  {
    title: "HP Wired USB Keyboard K1500",
    brand: "HP",
    price: 499,
    image: "https://m.media-amazon.com/images/I/81IbI6vO7GL._SX679_.jpg",
    rating: 3.8,
  },
  {
    title: "Samsung 64GB EVO microSD Card",
    brand: "Samsung",
    price: 699,
    image: "https://m.media-amazon.com/images/I/71wG2k-eY-L._SX679_.jpg",
    rating: 4.6,
  },
  {
    title: "Sony MDR-ZX110A Wired Headphones",
    brand: "Sony",
    price: 1099,
    image: "https://m.media-amazon.com/images/I/71m3VdyxvLL._SX679_.jpg",
    rating: 4.0,
  },
  {
    title: "TP-Link WiFi Router TL-WR841N",
    brand: "TP-Link",
    price: 1199,
    image: "https://m.media-amazon.com/images/I/61LtuGzXeaL._SX679_.jpg",
    rating: 4.1,
  },
  {
    title: "Zebronics Zeb-Rush Gaming Keyboard",
    brand: "Zebronics",
    price: 849,
    image: "https://m.media-amazon.com/images/I/51KeYwBBTkL._SX679_.jpg",
    rating: 3.9,
  },
  {
    title: "boAt Bassheads 100 Wired Earphones",
    brand: "boAt",
    price: 449,
    image: "https://m.media-amazon.com/images/I/61+Q6Rh3OQL._SX679_.jpg",
    rating: 4.3,
  },
  {
    title: "Dell 15.6 Inch Laptop Backpack",
    brand: "Dell",
    price: 999,
    image: "https://m.media-amazon.com/images/I/61Q93pD-ZnL._SX679_.jpg",
    rating: 4.5,
  },
];

const dummydata1 = [
  {
    title: "Duracell AAA Batteries (Pack of 10)",
    brand: "Duracell",
    price: 179,
    rating: 3.5,
    discountedPrice: 149,
    discountPercentage: 16.0,
    image: "https://m.media-amazon.com/images/I/81o1qXrjRLL._SX679_.jpg",
  },
  {
    title: "WD-40 Multipurpose Spray 420ml",
    brand: "WD-40",
    price: 353,
    rating: 4.0,
    discountedPrice: 299,
    discountPercentage: 15.3,
    image: "https://m.media-amazon.com/images/I/61v51tdU2RL._SX679_.jpg",
  },
  {
    title: "Box Index Files (Pack of 8)",
    brand: "IB BASICS",
    discountedPrice: 399,
    discountPercentage: 9.1,
    rating: 4.2,
    price: 439,
    image: "https://m.media-amazon.com/images/I/81My9owuZuL._SX679_.jpg",
  },
  {
    title: "Generic 12A Black Cartridge",
    brand: "GENERIC",
    price: 339,
    image: "https://m.media-amazon.com/images/I/71Z3-+a3bpL._SX679_.jpg",
  },
  {
    title: "Cello Ball Pens (Pack of 25)",
    brand: "GENERIC",
    price: 99,
    image: "https://m.media-amazon.com/images/I/61-vv9kdzpL._SX679_.jpg",
  },
];

function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-full mb-4"
      >
        <SwiperSlide>
          <img src={img1} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img1} />
        </SwiperSlide>
      </Swiper>
      {/* {Ads} */}
      <div className="flex flex-row items-center justify-between w-full md:p-0">
        <img src={img4} alt="img4" className="rounded-md w-49/100 " />
        <img src={img5} alt="img5" className="rounded-md w-49/100" />
      </div>
      {/* {Ads end} */}

      {/* {Deal of the Day} */}
      <CardDisplay title="DEAL OF THE DAY" data={dummydata1} />
      {/* {Deal of the Day end} */}

      {/* {Ads Display} */}
      <div className="hidden md:flex flex-row items-center justify-center w-full px-4 py-4 gap-4">
        <img src={img6} alt="img6" className=" w-1/3 " />
        <img src={img7} alt="img7" className=" w-1/3" />
        <img src={img8} alt="img8" className=" w-1/3 " />
      </div>

        <div className="w-full md:hidden px-2">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="md:!hidden mySwiper w-full my-4"
      >
        <SwiperSlide>
          <img src={img6} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img7} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img8} />
        </SwiperSlide>
      </Swiper>
      {/* {Ads Display end} */}

      {/* {Popular Picks} */}
      <CardDisplay title="POPULAR PICKS" data={dummydata2} />
      {/* {Popular Picks end} */}

      {/* {Pocket Friendly Price Display} */}

      <h3 className="w-full poppins-semibold mt-6">POCKET FRIENDLY PRICES</h3>

      <div className="hidden md:flex flex-row items-center justify-center w-full px-4 py-4 gap-4">
        <img src={price1} alt="price1" className=" w-1/4 " />
        <img src={price2} alt="price2" className=" w-1/4" />
        <img src={price3} alt="price3" className=" w-1/4 " />
        <img src={price4} alt="price4" className=" w-1/4 " />
      </div>
      
        <div className="w-full md:hidden">
        <Swiper
        spaceBetween={20}
        slidesPerView={2}
        centeredSlides={false}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="md:!hidden mySwiper w-full my-4"
      >
        <SwiperSlide>
          <img src={price1} className="w-full" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={price2} className="w-full" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={price3} className="w-full" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={price4} className="w-full" />
        </SwiperSlide>
      </Swiper>
      </div>
        </div>
      
      {/* {Pocket Friendly Price Display end} */}

      {/* {Recommended for you} */}
      <CardDisplay title="RECOMMENDED FOR YOU" data={dummydata2} />
      {/* {Recommended for you end} */}

      {/* {BEST SELLERS} */}
      <CardDisplay title="BEST SELLERS" data={dummydata1} />
      {/* {BEST SELLERS end} */}

      {/* {Trusted Brands} */}

      <BrandCarousel />
      {/* {Trusted Brands end} */}

      {/* {Testimonials} */}
      <TestimonialCarousel />
      {/* {Testimonials ends} */}
    </div>
  );
}
export default LandingPage;
