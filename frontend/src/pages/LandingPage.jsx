import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../assets/images/carousel/Gemini_Generated_Image_n5zdu8n5zdu8n5zd.webp";
import img2 from "../assets/images/carousel/Gemini_Generated_Image_5zonw75zonw75zon.webp";
import img0 from "../assets/images/carousel/Gemini_Generated_Image_b3rmnnb3rmnnb3rm.webp";
import img3 from "../assets/images/carousel/Gemini_Generated_Image_dncu63dncu63dncu.webp";
import img4 from "../assets/images/carousel/Gemini_Generated_Image_o4do9mo4do9mo4do.webp";
import img5 from "../assets/images/carousel/Gemini_Generated_Image_2avf0r2avf0r2avf.webp";
import img6 from "../assets/images/carousel/Gemini_Generated_Image_nwremvnwremvnwre.webp";
import img7 from "../assets/images/carousel/Gemini_Generated_Image_n5zdu8n5zdu8n5zd.webp";
import img8 from "../assets/images/carousel/Gemini_Generated_Image_nhp17gnhp17gnhp1.webp";

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
import { useEffect, useState } from "react";
import { useLoader } from "../contexts/LoaderContext";
import { useAlert } from "../contexts/AlertContext";
import {
  getBestSellerProducts,
  getProductbyTags,
  getRecommendedProducts,
} from "../apis/products";


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
  const [dealoftheday, setDealoftheday] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const { setLoading } = useLoader();
  const { setMessage, setShowSnackBar } = useAlert();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const resp1 = await getBestSellerProducts({page:1,limit: 10});
      setLoading(false);
      if (resp1.success) {
        setBestsellers(resp1.products);
      } else {
        setMessage(resp1.message);
        setShowSnackBar(true);
      }
      setLoading(true);
      const resp2 = await getRecommendedProducts({page:1,limit: 10});
      setLoading(false);
      if (resp2.success) {
        setRecommended(resp2.products);
      } else {
        setMessage(resp2.message);
        setShowSnackBar(true);
      }
      setLoading(true);
      const resp3 = await getProductbyTags({page:1,limit: 10,tags: "dealoftheday"});
      setLoading(false);
      if (resp3.success) {
        setDealoftheday(resp3.products);
      } else {
        setMessage(resp3.message);
        setShowSnackBar(true);
      }
    };
    fetchData();
  },[]);
  return (
    <div className="flex flex-col items-center ">
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
          <img loading="lazy" src={img0} className="md:h-90 h-30 w-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img loading="lazy" src={img3} className="md:h-90 h-30 w-full object-cover object-[0%_60%]" />
        </SwiperSlide>
        <SwiperSlide>
          <img loading="lazy" src={img2} className="md:h-90 h-30 w-full object-cover object-[0%_70%]" />
        </SwiperSlide>
        
      </Swiper>
      {/* {Ads} */}
      <div className="flex md:flex-row items-center justify-between w-full md:p-0">
        <img loading="lazy" src={img4} alt="img4" className="rounded-md w-49/100 md:h-60 h-20 object-cover object-[0%_20%]" />
        <img loading="lazy" src={img5} alt="img5" className="rounded-md w-49/100 md:h-60 h-20 object-cover object-[0%_50%]" />
      </div>
      {/* {Ads end} */}

      {/* {Deal of the Day} */}
      {dealoftheday && dealoftheday.length > 0 && <CardDisplay title="DEAL OF THE DAY" data={dealoftheday} />
      }{/* {Deal of the Day end} */}

      {/* {Ads Display} */}
      <div className="hidden md:flex flex-row items-center justify-center w-full px-4 py-4 gap-4">
        <img loading="lazy" src={img6} alt="img6" className=" w-1/3 h-60 object-cover rounded-md" />
        <img loading="lazy" src={img7} alt="img7" className=" w-1/3 h-60 object-cover rounded-md" />
        <img loading="lazy" src={img8} alt="img8" className=" w-1/3 h-60 object-cover rounded-md" />
      </div>

      <div className="w-full md:hidden ">
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
            <img loading="lazy" src={img6} className="h-45 w-full object-cover object-center rounded-md" />
          </SwiperSlide>
          <SwiperSlide>
            <img loading="lazy" src={img7} className="h-45 w-full object-cover object-center rounded-md "/>
          </SwiperSlide>
          <SwiperSlide>
            <img loading="lazy" src={img8} className="h-45 w-full object-cover object-center rounded-md"/>
          </SwiperSlide>
        </Swiper>
        {/* {Ads Display end} */}

        

       

      

        
      </div>

      {/* {Pocket Friendly Price Display end} */}

      {/* {Recommended for you} */}
      {recommended && recommended.length > 0 && <CardDisplay title="RECOMMENDED FOR YOU" data={recommended} />
      }{/* {Recommended for you end} */}

      {/* {BEST SELLERS} */}
      {bestsellers && bestsellers.length > 0 && <CardDisplay title="BEST SELLERS" data={bestsellers} />
      }{/* {BEST SELLERS end} */}

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
