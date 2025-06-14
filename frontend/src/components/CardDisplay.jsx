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
        <h3 className='poppins-semibold'>{title}</h3>
        <div className='flex flex-row gap-2'>
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
       className="flex overflow-x-auto gap-4 hide-scroll scroll-smooth max-w-full">
        {
            data.map((product,idx)=>(
                 <div
            key={idx}
            className="w-64 flex flex-col flex-shrink-0 justify-evenly rounded-lg p-4 shadow-md bg-white mb-2"
          >
            <div className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded mb-2 w-fit">
              🚚 Ships within 24 hrs
            </div>
                 <img
              src={product2}
              alt={product.title}
              className="h-32 w-full object-contain"
            />
            <div className='flex flex-col gap-0'>
                 <div className="mt-2 font-semibold text-sm">{product.title}</div>
            <div className="text-xs text-blue-600 mt-1">By {product.brand}</div>
            <div className="text-lg poppins-semibold mt-2 text-black">
              {product.discountedPrice ? <span className="line-through mr-2 font-normal">₹{product.price}</span> : null}
              ₹{product.discountedPrice || product.price}
              {product.discountPercentage && <span className="!text-xs !text-green-600 ml-2">{product.discountPercentage}% off</span>}
            </div>
              {product.rating && <Rating name="read-only" value={product.rating} readOnly size='small' className='p-0 m-0'/>}

            </div>
            
               <div className="flex gap-4 mt-3">
              <button className="border border-orange-500 text-orange-500 text-sm px-3 py-1 rounded hover:bg-orange-50">
                Add to Cart
              </button>
              <button className="bg-blue-800 text-white text-sm px-3 py-1 rounded hover:bg-blue-700">
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
