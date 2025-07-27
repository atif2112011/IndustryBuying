import { useParams } from "react-router-dom";
import DynamicBreadcrumbs from "../components/DynamicBread";
import category1 from '../assets/images/bannerimages/category1.png';
import category2 from '../assets/images/bannerimages/category2.png';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules for Swiper
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import ProductShowcaseElectrical from "../components/CategoryShowcase";
import CardDisplay from "../components/CardDisplay";
import CategoryShowcase from "../components/CategoryShowcase";
import { use, useEffect, useState } from "react";
import { getCategories } from "../apis/category";
import { useLoader } from "../contexts/LoaderContext";

const dummydata1 = [
  {
    title: "Duracell AAA Batteries (Pack of 10)",
    brand: "Duracell",
    price: 179,
    rating:3.5,
    discountedPrice: 149,
    discountPercentage: 16.00,
    image: "https://m.media-amazon.com/images/I/81o1qXrjRLL._SX679_.jpg",
  },
  {
    title: "WD-40 Multipurpose Spray 420ml",
    brand: "WD-40",
    price: 353,
    rating: 4.0,
    discountedPrice: 299,
    discountPercentage: 15.30,
    image: "https://m.media-amazon.com/images/I/61v51tdU2RL._SX679_.jpg",
  },
  {
    title: "Box Index Files (Pack of 8)",
    brand: "IB BASICS",
    discountedPrice: 399,
    discountPercentage: 9.10,
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
function CategoryPage() {

const { categoryId } = useParams();
let categories =categoryId.split('-');
let categoryName=(categories.map((category)=>{
    return category.charAt(0).toUpperCase() +category.slice(1);
})).join(' ');

const [categoryData,setCategoryData]=useState([]);
const {setLoading}=useLoader();

  useEffect(()=>{

    

    const fetchCategory=async()=>{
      const response=await getCategories({categoryId,populateProducts:true})
      if(response.success)
      {
        setCategoryData(response.categories);
        console.log(response.categories);
      }
    }
    setLoading(true);
    fetchCategory();
    setLoading(false);
  },[categoryId])

  return (
    <div>
        <DynamicBreadcrumbs/>
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
        <SwiperSlide><img src={category1} /></SwiperSlide>
        <SwiperSlide><img src={category2} /></SwiperSlide>

      </Swiper>
      <h3 className="mt-4 !text-md md:!text-lg !font-semibold ">{categoryName.toUpperCase()}</h3>

     {/* {<CategoryShowcase/>} */}
      {categoryData && <CategoryShowcase categoryData={categoryData}/>}
     {/* {<CategoryShowcase/>} */}

     {/* {Recommended Products} */}
        <CardDisplay title="RECOMMENDED PRODUCTS" data={dummydata1} />
     {/* {Recommended Products end} */}

      {/* {Bestseller Products} */}
        <CardDisplay title="BESTSELLER" data={dummydata1} />
     {/* {Recommended Products end} */}

    </div>
  );
}

export default CategoryPage;