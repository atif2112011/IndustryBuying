import { Pagination } from "@mui/material";
import product2 from "../assets/images/productImages/product2.jpg"; // Adjust the path as necessary
import { useNavigate, useParams } from "react-router-dom";

const data = [
  {
    productId: 1,
    title: "MaxPower Copper Submersible Flat Cable 3 Core",
    brand: "MaxPower",
    price: 2850,
    discountedPrice: 1999,
    discountPercentage: 29.82
  },
  {
    productId: 2,
    title: "ElectraLite Aluminium Twin Flat Cable, 6 Sqmm, 90 m",
    brand: "ElectraLite",
    price: 5200,
    discountedPrice: 3750,
    discountPercentage: 27.88
  },
  {
    productId: 3,
    title: "SubraPro Copper Submersible Flat Cable 4 Core",
    brand: "SubraPro",
    price: 3420,
    discountedPrice: 2950,
    discountPercentage: 13.74
  },
  {
    productId: 4,
    title: "PowerX 2.5 Sqmm Solid Copper Flat Cable, 100 m",
    brand: "PowerX",
    price: 6700,
    discountedPrice: 5290,
    discountPercentage: 21.04
  },
  {
    productId: 5,
    title: "SafeCable Aluminium Flat Cable 1.5 Sqmm, 50 m",
    brand: "SafeCable",
    price: 2500,
    discountedPrice: 1999,
    discountPercentage: 20.04
  },
  {
    productId: 6,
    title: "UltraVolt Submersible Flat Cable, Copper, 90 m",
    brand: "UltraVolt",
    price: 4900,
    discountedPrice: 3549,
    discountPercentage: 27.55
  },
  {
    productId: 7,
    title: "GreenCable Eco Aluminium Twin Flat Cable, 4 Sqmm",
    brand: "GreenCable",
    price: 3100,
    discountedPrice: 2450,
    discountPercentage: 20.97
  },
  {
    productId: 8,
    title: "FlexiFlow Submersible Copper Cable, 2 Core, 30 m",
    brand: "FlexiFlow",
    price: 1890,
    discountedPrice: 1425,
    discountPercentage: 24.60
  },
  {
    productId: 9,
    title: "RapidConnect Twin Flat Cable Aluminium 10 Sqmm",
    brand: "RapidConnect",
    price: 5700,
    discountedPrice: 3899,
    discountPercentage: 31.57
  },
  {
    productId: 10,
    title: "Duron Copper Flat Cable, 3 Core, 50 metre roll",
    brand: "Duron",
    price: 3299,
    discountedPrice: 2675,
    discountPercentage: 18.92
  }
];

function ProductShowcase() {

  const navigate=useNavigate();
const { subcategoryId,categoryId } = useParams();
  return (
    
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 ">
        {data.map((product,idx)=>(
                 <div
            key={idx}
            className="max-w-64 flex flex-col flex-shrink-0 justify-evenly rounded-lg p-4 shadow-md bg-white mb-2 "
           
          >
            <div className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded mb-2 w-fit">
              🚚 Ships within 24 hrs
            </div>
                 <img
              src={product2}
              alt={product.title}
              className="h-32 w-full object-contain cursor-pointer"
               onClick={()=>{
              navigate(`/categories/${categoryId}/${subcategoryId}/${product.productId}`)
            }}
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
        <Pagination count={10} className="flex w-full justify-center"/>
        </>
    
  );
}

export default ProductShowcase