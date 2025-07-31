import { Pagination, Rating } from "@mui/material";
import product2 from "../assets/images/productImages/product2.jpg"; // Adjust the path as necessary
import { useNavigate, useParams } from "react-router-dom";
import { useLoader } from "../contexts/LoaderContext";
import { getProductsBySubCategory } from "../apis/category";
import { useAuth } from "../contexts/AuthContext";
import { addToCart } from "../apis/cart";
import { useAlert } from "../contexts/AlertContext";

function ProductShowcase({
  products,
  setProducts,
  page,
  rowsPerPage,
  setPage,
  totalPages,
  setTotalPages,
  totalProducts,
  setTotalProducts,
  sort,
}) {
  const navigate = useNavigate();
  const { subcategoryId, categoryId } = useParams();
  const { setLoading } = useLoader();
  const { productFilters, setProductFilters } = useAuth();
  const {setCart, setCartCount} = useAuth();
  const {setMessage,setShowSnackBar}=useAlert();
  const {user,setUser}=useAuth();
  const handleChange = async (event, value) => {
    setLoading(true);
    const response = await getProductsBySubCategory(
      subcategoryId,
      value,
      rowsPerPage,
      sort,
      productFilters.priceRanges,
      productFilters.brands,
      productFilters.discountRange
    );
    setLoading(false);
    if (response.success) {
      setProducts(response.products);
      setTotalPages(response.totalPages);
      setTotalProducts(response.totalProducts);
      setPage(value);
    } else {
      console.log("error", response.message);
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

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-x-12 md:gap-y-4 py-4 ">
        {products &&
          products.map((product, idx) => (
            <div
              key={idx}
              className="min-w-46/100 md:w-64 flex flex-col flex-shrink-0 justify-evenly rounded-lg p-3 md:p-4 shadow-md bg-white mb-2"
            >
              <div className="text-[0.5rem] md:text-xs bg-red-100 text-red-600 px-2 py-1 rounded mb-2 w-fit">
                🚚 Ships within 24 hrs
              </div>
              <img
                src={product?.images[0] || product2}
                alt={product?.title || ""}
                className="h-[80px] md:h-32 w-full object-contain cursor-pointer"
                onClick={() =>
                  navigate(
                    `/categories/${categoryId}/${subcategoryId}/${product._id}`
                  )
                }
              />
              <div className="flex flex-col gap-0">
                <div className="mt-2 font-semibold text-[0.7rem] md:text-sm">
                  {product?.name || ""}
                </div>
                <div className="text-[0.65rem] md:text-xs text-blue-600 mt-1">
                  By {product?.brand || ""}
                </div>
                <div className="text-[0.70rem] md:text-lg poppins-semibold mt-2 text-black">
                  {product?.discount == 0 ? (
                    <span className=" !text-[0.80rem] md:!text-sm mr-1 md:mr-2 ">
                      ₹{product?.price || ""}
                    </span>
                  ) : (
                    <span className=" !text-[0.80rem] md:!text-sm line-through mr-1 md:mr-2 ">
                      ₹{product?.price || ""}
                    </span>
                  )}
                  {product?.discount > 0 && (
                    <span className="!text-[0.80rem] md:!text-sm mr-1 md:mr-2 font-normal">
                      ₹
                      {calculateDiscountedPrice(
                        product.price,
                        product.discount
                      )}
                    </span>
                  )}
                  {product?.discount > 0 && (
                    <span className="!text-[0.6rem] md:!text-xs !text-green-600 !font-medium ml-4 md:ml-2">
                      {product.discount}% off
                    </span>
                  )}
                </div>
                {product?.rating && (
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
                <button onClick={()=>handleAddtoCart(product)} className="border border-orange-500 text-orange-500 text-[0.6rem] md:text-sm px-3 py-1 rounded hover:bg-orange-50">
                  Add to Cart
                </button>
                <button onClick={()=>handleBuyNow(product)} className="bg-blue-800 text-white !text-sm px-3 py-1 rounded hover:bg-blue-700">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
      </div>
      <Pagination
        count={totalPages} // total number of pages
        page={page} // controlled page value
        onChange={handleChange} // updates the page on click
        className="flex w-full justify-center"
        color="primary"
      />
    </>
  );
}

export default ProductShowcase;

function calculateDiscountedPrice(price, discountPercentage) {
  const discountAmount = (price * discountPercentage) / 100;
  const discountedPrice = price - discountAmount;
  return parseFloat(discountedPrice.toFixed(2));
}
