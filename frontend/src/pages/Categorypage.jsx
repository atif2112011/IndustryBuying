import { useParams } from "react-router-dom";
import DynamicBreadcrumbs from "../components/DynamicBread";
import category1 from '../assets/images/bannerimages/category1.png';
import category2 from '../assets/images/bannerimages/category2.png';
import img1 from "../assets/images/carousel/Gemini_Generated_Image_n5zdu8n5zdu8n5zd.webp";
import img2 from "../assets/images/carousel/Gemini_Generated_Image_5zonw75zonw75zon.webp";
import img0 from "../assets/images/carousel/Gemini_Generated_Image_b3rmnnb3rmnnb3rm.webp";
import img3 from "../assets/images/carousel/Gemini_Generated_Image_dncu63dncu63dncu.webp";
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
import { useAlert } from "../contexts/AlertContext";
import { getBestSellerProducts, getProductbyTags, getRecommendedProducts } from "../apis/products";

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
// const [dealoftheday, setDealoftheday] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const { setMessage, setShowSnackBar } = useAlert();

  useEffect(()=>{

    

    const fetchCategory=async()=>{
      setLoading(true);
      const response=await getCategories({categoryId,populateProducts:true})
      setLoading(false);
      if(response.success)
      {
        setCategoryData(response.categories);
        console.log(response.categories);
      }
    }
    
    fetchCategory();
    
  },[categoryId])

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
        // setLoading(true);
        // const resp3 = await getProductbyTags({page:1,limit: 10,tags: "dealoftheday"});
        // setLoading(false);
        // if (resp3.success) {
        //   setDealoftheday(resp3.products);
        // } else {
        //   setMessage(resp3.message);
        //   setShowSnackBar(true);
        // }
      };
      fetchData();
    },[]);

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
      <h3 className="mt-6 !text-sm md:!text-lg !font-semibold ">{categoryName.toUpperCase()}</h3>

     {/* {<CategoryShowcase/>} */}
      {categoryData && <CategoryShowcase categoryData={categoryData}/>}
     {/* {<CategoryShowcase/>} */}

     {/* {Recommended Products} */}
        {recommended && recommended.length > 0 && <CardDisplay title="RECOMMENDED PRODUCTS" data={recommended} />}
     {/* {Recommended Products end} */}

      {/* {Bestseller Products} */}
        {bestsellers && bestsellers.length > 0 && <CardDisplay title="BESTSELLER" data={bestsellers} />}
     {/* {Recommended Products end} */}

    </div>
  );
}

export default CategoryPage;