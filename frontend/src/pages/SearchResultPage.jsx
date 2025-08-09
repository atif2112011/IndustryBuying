import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import DynamicBreadcrumbs from "../components/DynamicBread";
import category1 from '../assets/images/bannerimages/category1.png';
import category2 from '../assets/images/bannerimages/category2.png';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules for Swiper
import { Autoplay, Navigation,Pagination } from 'swiper/modules';
import ProductShowcaseElectrical from "../components/CategoryShowcase";
import CardDisplay from "../components/CardDisplay";
import CategoryShowcase from "../components/CategoryShowcase";
import { use, useEffect, useState } from "react";
import { getCategories } from "../apis/category";
import { Rating} from "@mui/material";
import { Pagination as MuiPagination } from "@mui/material";
import { useLoader } from "../contexts/LoaderContext";
import { useAlert } from "../contexts/AlertContext";

import { getAllProducts } from "../apis/products";
import { addToCart } from "../apis/cart";
import { useAuth } from "../contexts/AuthContext";


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
function SearchPage({}) {

const {setLoading}=useLoader();
const {setMessage,setShowSnackBar}=useAlert();
const [rowsPerPage,setRowsPerPage]=useState(10);
const [searchData,setSearchData]=useState([]);
const {cart,setCart,cartCount,setCartCount,user}=useAuth();
    const [searchParams] = useSearchParams();
 
    // const [query,setQuery]=useState(searchParams.get("q") || "");
   const [totalPages,settotalPages]=useState(0);
   const [totalProducts,settotalProducts]=useState(0);
   const navigate=useNavigate();


    const [page, setPage] = useState(1);

  const handleChange = async(event, value) => {
    setPage(value);
    const response=await getAllProducts(value,rowsPerPage,query,null,null);
    if(response.success){
        setSearchData(response.products);
        settotalPages(response.totalPages);
        settotalProducts(response.totalProducts);
        setPage(value);
    }
  };

const handleAddtoCart=async(product)=>{
  if(!user){
      setMessage("Please login to add to cart");
      setShowSnackBar(true);
      return
    }
    setLoading(true);
    const response=await addToCart(product._id,1);
    setLoading(false);
    if(response.success){
        setMessage(response.message);
        setShowSnackBar(true);
        setCart(response.cart);
        setCartCount(response.totalItems);
    }
    else{
        setMessage(response.message);
        setShowSnackBar(true);
    }
}

const handleBuyNow=async(product)=>{
  if(!user){
      setMessage("Please login to add to cart");
      setShowSnackBar(true);
      return
    }
    setLoading(true);
    const response=await addToCart(product._id,1);
    setLoading(false);
    if(response.success){
        setMessage(response.message);
        setShowSnackBar(true);
        setCart(response.cart);
        setCartCount(response.totalItems);
        navigate("/order/cart");

    }
    else{
        setMessage(response.message);
        setShowSnackBar(true);
    }
}

  useEffect(()=>{

    const fetchResult=async()=>{
      setLoading(true);
        const response=await getAllProducts(1,rowsPerPage,query,null,null);
        setLoading(false);
        if(response.success){
            setSearchData(response.products);
            settotalPages(response.totalPages);
            settotalProducts(response.totalProducts);
            setPage(1);
        }
        else
        {
            setMessage(response.message);
            setShowSnackBar(true);
        }
    }
    const query = searchParams.get("q") || "";
    //  console.log("Search param changed:", query);
    
    fetchResult();
    


    
  },[searchParams])

   

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
      <h3 className="mt-4 !text-md md:!text-lg !font-semibold ">{`Seach results for: ${searchParams.get("q") || ""}`}</h3>

     {/* {<CategoryShowcase/>} */}
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-x-12 md:gap-y-4 py-4 ">
        {searchData && searchData.length > 0 && searchData.map((product, idx) => (
          <div
            key={idx}
            className="min-w-46/100 md:w-64 flex flex-col flex-shrink-0 justify-evenly rounded-lg p-3 md:p-4 shadow-md bg-white mb-2"
          >
            <div className="text-[0.5rem] md:text-xs bg-red-100 text-red-600 px-2 py-1 rounded mb-2 w-fit">
              🚚 Ships within 24 hrs
            </div>
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-[80px] md:h-32 w-full object-contain cursor-pointer"
              onClick={() => navigate(`/categories/${product.category.slug}/${product.subCategory.slug}/${product._id}`)}
            />
            <div className="flex flex-col gap-0">
              <div className="mt-2 font-semibold text-[0.7rem] md:text-sm">
                {product.name}
              </div>
              <div className="text-[0.65rem] md:text-xs text-blue-600 mt-1">
                By {product.brand}
              </div>
              <div className="text-[0.70rem] md:text-lg poppins-medium mt-2 text-black">
                {(product?.discount==0) ? (
                  <span className=" !text-[0.80rem] md:!text-sm mr-1 md:mr-2 ">
                    ₹{product.price}
                  </span>
                ) : <span className=" !text-[0.80rem] md:!text-sm line-through mr-1 md:mr-2 ">
                    ₹{product.price}
                  </span>}
                {product?.discount>0 && <span className="!text-[0.80rem] md:!text-sm mr-1 md:mr-2 font-normal">₹{calculateDiscountedPrice(product.price, product.discount)}</span>} 
                {product?.discount>0 && (
                  <span className="!text-[0.6rem] md:!text-xs !text-green-600 !font-medium ml-4 md:ml-2">
                    {product.discount}% off
                  </span>
                )}
              </div>
              {product.rating && (
                <Rating
                  name="read-only"
                  value={product.rating}
                  readOnly
                  size="small"
                  className="p-0 m-0"
                />
              )}
            </div>

            <div className="hidden md:flex gap-4 mt-3">
              <button onClick={() => handleAddtoCart(product)} className="border border-orange-500 text-orange-500 text-[0.6rem] md:text-sm px-3 py-1 rounded hover:bg-orange-50">
                Add to Cart
              </button>
              <button onClick={() => handleBuyNow(product)} className="bg-blue-800 text-white !text-sm px-3 py-1 rounded hover:bg-blue-700">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
      {searchData && searchData.length > 0 && (
          <MuiPagination count={totalPages} page={page} onChange={handleChange} className="flex w-full justify-center" />
      )}
       
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

export default SearchPage;

function calculateDiscountedPrice(price, discountPercentage) {
  const discountAmount = (price * discountPercentage) / 100;
  const discountedPrice = price - discountAmount;
  return parseFloat(discountedPrice.toFixed(2));
}