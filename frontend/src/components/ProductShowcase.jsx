import { Pagination, Rating } from "@mui/material";
import product2 from "../assets/images/productImages/product2.jpg"; // Adjust the path as necessary
import { useNavigate, useParams } from "react-router-dom";



function ProductShowcase({products }) {
  const navigate = useNavigate();
  const { subcategoryId, categoryId } = useParams();
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-x-12 md:gap-y-4 py-4 ">
        {products && products.map((product, idx) => (
          <div
            key={idx}
            className="min-w-46/100 md:w-64 flex flex-col flex-shrink-0 justify-evenly rounded-lg p-3 md:p-4 shadow-md bg-white mb-2"
          >
            <div className="text-[0.5rem] md:text-xs bg-red-100 text-red-600 px-2 py-1 rounded mb-2 w-fit">
              🚚 Ships within 24 hrs
            </div>
            <img
              src={product2}
              alt={product.title}
              className="h-[80px] md:h-32 w-full object-contain cursor-pointer"
              onClick={() => navigate(`/categories/${categoryId}/${subcategoryId}/${product._id}`)}
            />
            <div className="flex flex-col gap-0">
              <div className="mt-2 font-semibold text-[0.7rem] md:text-sm">
                {product.name}
              </div>
              <div className="text-[0.65rem] md:text-xs text-blue-600 mt-1">
                By {product.brand}
              </div>
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
              <button className="border border-orange-500 text-orange-500 text-[0.6rem] md:text-sm px-3 py-1 rounded hover:bg-orange-50">
                Add to Cart
              </button>
              <button className="bg-blue-800 text-white !text-sm px-3 py-1 rounded hover:bg-blue-700">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <Pagination count={10} className="flex w-full justify-center" />
    </>
  );
}

export default ProductShowcase;

function calculateDiscountedPrice(price, discountPercentage) {
  const discountAmount = (price * discountPercentage) / 100;
  const discountedPrice = price - discountAmount;
  return parseFloat(discountedPrice.toFixed(2));
}
