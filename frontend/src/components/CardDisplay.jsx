import { useRef } from 'react';
import leftarrow from '../assets/icons/arrow-left-line.svg';
import rightarrow from '../assets/icons/arrow-right-line.svg';
import image from '../assets/images/sampleproduct.jpg';
import { Rating } from '@mui/material';
import product1 from '../assets/images/productImages/product1.jpg'; 
import product2 from '../assets/images/productImages/product2.jpg';
import product3 from '../assets/images/productImages/product3.jpg';


function CardDisplay({title,data}) {

const scrollRef=useRef(null);
const scroll = (dir) => {
    const scrollAmt = 300;
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -scrollAmt : scrollAmt,
      behavior: "smooth",
    });
  };


  return (
    <div className='flex flex-col w-full'>
    <div className='flex flex-row items-center justify-between w-full px-2 py-6 '>
        <h3 className='poppins-semibold !text-md md:!text-lg'>{title}</h3>
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
            data.map((product,idx)=>(
                 <div
            key={idx}
            className="w-46/100 md:w-64 flex flex-col flex-shrink-0 justify-evenly rounded-lg p-2 md:p-4 shadow-md bg-white mb-2"
          >
            <div className="text-[0.5rem] md:text-xs bg-red-100 text-red-600 px-2 py-1 rounded mb-2 w-fit">
              🚚 Ships within 24 hrs
            </div>
                 <img
              src={product2}
              alt={product.title}
              className="h-[80px] md:h-32 w-full object-contain"
            />
            <div className='flex flex-col gap-0'>
                 <div className="mt-2 font-semibold text-[0.7rem] md:text-sm">{product.title}</div>
            <div className="text-[0.65rem] md:text-xs text-blue-600 mt-1">By {product.brand}</div>
            <div className="text-[0.70rem] md:text-lg poppins-semibold mt-2 text-black">
              {product.discountedPrice ? <span className=" !text-[0.80rem] md:!text-sm line-through mr-1 md:mr-2 font-normal">₹{product.price}</span> : null}
              ₹{product.discountedPrice || product.price}
              {product.discountPercentage && <span className="!text-[0.6rem] md:!text-xs !text-green-600 !font-medium ml-4 md:ml-2">{product.discountPercentage}% off</span>}
            </div>
              {product.rating && <Rating name="read-only" value={product.rating} readOnly size='small' className='p-0 m-0'/>}

            </div>
            
               <div className="hidden md:flex gap-4 mt-3">
              <button className="border border-orange-500 text-orange-500 text-[0.6rem] md:text-sm px-3 py-1 rounded hover:bg-orange-50">
                Add to Cart
              </button>
              <button className="bg-blue-800 text-white !text-sm px-3 py-1 rounded hover:bg-blue-700">
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
