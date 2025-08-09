import { useRef } from 'react';
import leftarrow from '../assets/icons/arrow-left-line.svg';
import rightarrow from '../assets/icons/arrow-right-line.svg';
import image from '../assets/images/sampleproduct.jpg';
import { Rating } from '@mui/material';
import product1 from '../assets/images/productImages/product1.jpg'; 
import product2 from '../assets/images/productImages/product2.jpg';
import product3 from '../assets/images/productImages/product3.jpg';
import { addToCart } from '../apis/cart';
import { useAuth } from '../contexts/AuthContext';
import { useLoader } from '../contexts/LoaderContext';
import { useAlert } from '../contexts/AlertContext';
import { useNavigate } from 'react-router-dom';


function CardDisplay({title,data}) {


  const {user,setCartCount,setCart}=useAuth();
  const {setLoading}=useLoader();
  const {setMessage,setShowSnackBar}=useAlert();
  const navigate=useNavigate();

const scrollRef=useRef(null);
const scroll = (dir) => {
    const scrollAmt = 300;
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -scrollAmt : scrollAmt,
      behavior: "smooth",
    });
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

  return (
    <div className='flex flex-col w-full'>
    <div className='flex flex-row items-center justify-between w-full px-2 py-6 '>
        <h3 className='poppins-semibold !text-md md:!text-lg'>{title || "Null"}</h3>
        <div className='hidden md:flex flex-row gap-2'>
          <button className="bg-white border-2 border-gray-300 rounded-md p-2">
            <img src={leftarrow} alt="left arrow" height={16} width={16} onClick={()=>scroll("left")} />
          </button>
          <button className="bg-white border-2 border-gray-300 rounded-md p-2">
            <img src={rightarrow} alt="right arrow" height={16} width={16} onClick={()=>scroll("right")}/>
          </button>
        </div>
        </div>
       {/* Scrollable Container */}
       <div 
       ref={scrollRef}
       className="flex justify-start p-0 md:overflow-x-auto gap-4 hide-scroll scroll-smooth max-w-full flex-wrap md:flex-nowrap">
        {
            data && data.map((product,idx)=>(
                 <div
            key={idx}
            className="w-46/100 md:w-64 flex flex-col flex-shrink-0 justify-evenly rounded-lg p-2 md:p-4 shadow-md bg-white mb-2"
          >
            <div className="text-[0.5rem] md:text-xs bg-red-100 text-red-600 px-2 py-1 rounded mb-2 w-fit">
              🚚 Ships within 48 hrs
            </div>
                 <img
              src={product && product.images && product.images.length > 0 ? product.images[0]: product2}
              alt={product?.name || "Null"}
              onClick={() => navigate(`/categories/${product.category.slug}/${product.subCategory.slug}/${product._id}`)}
              className="h-[80px] md:h-32 w-full object-contain cursor-pointer"
            />
            <div className='flex flex-col gap-0'>
                 <div className="mt-2 font-semibold text-[0.7rem] md:text-sm">{product?.name || "Null"}</div>
            <div className="text-[0.65rem] md:text-xs text-blue-600 mt-1">By {product?.brand || "Null"}</div>
            <div className="text-[0.70rem] md:text-lg poppins-semibold mt-2 text-black">
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
              {product?.rating && <Rating name="read-only" value={product.rating} readOnly size='small' className='p-0 m-0'/>}

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
            ))
        }
       </div>
       {/* Scrollable Container end*/}
</div>
  );
}
export default CardDisplay;

function calculateDiscountedPrice(price, discountPercentage) {
  const discountAmount = (price * discountPercentage) / 100;
  const discountedPrice = price - discountAmount;
  return parseFloat(discountedPrice.toFixed(2));
}