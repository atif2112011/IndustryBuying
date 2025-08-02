import DynamicBreadcrumbs from "../components/DynamicBread";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import product1 from "../assets/images/productImages/product1.jpg";
import product2 from "../assets/images/productImages/product2.jpg";
import product3 from "../assets/images/productImages/product3.jpg";
import needHelp from "../assets/images/bannerimages/need-help-purchase.png";
import { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation, Pagination, Thumbs } from "swiper/modules";
import DescriptionTabs from "../components/DescriptionTabs";
import CardDisplay from "../components/CardDisplay";
import {
  Box,
  IconButton,
  Typography,
  InputBase,
  Paper,
  Rating,
} from "@mui/material";
import SnackBar from "../components/SnackBar";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "../contexts/AlertContext";
import { useLoader } from "../contexts/LoaderContext";
import { getProductDetails } from "../apis/products";
import { addToCart } from "../apis/cart";
import { useAuth } from "../contexts/AuthContext";

const productImages = [product1, product2, product3];
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

function Productpage() {
  const [color, setColor] = useState("Blue");
  const [area, setArea] = useState("1.5 Sq. mm");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [thumbnailIndex, setthumbnailIndex] = useState(0);
  const [checkPin, setcheckPin] = useState({
    data: {
      pincode: 211016,
      city: "Allahabad",
      shippingCharge: 0,
      deliveryDate: "Tue Jul 22 2025",
    },
    visible: false,
  });
  const [product, setProduct] = useState({});
  const [openSnackBar, setopenSnackBar] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [gst, setGst] = useState(18);
  const { productId } = useParams();
  const navigate = useNavigate();
  const { setLoading } = useLoader();
  const { setMessage, setShowSnackBar } = useAlert();
  const { user, setCart, setCartCount } = useAuth();
  const [deliveryType, setDeliveryType] = useState([]);
  const [returnDays, setReturnDays] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getProductDetails(productId);
      
      setLoading(false);
      if (response.success) {
        setProduct(response.product);
        setPrice(response.product.price);
        setGst(response.product.gst);
        setDiscountAmount(
          response.product.price -
            (response.product.price * response.product.discount) / 100
        );
        if (response.product?.cod)
          setDeliveryType((prevData) => [...prevData, "COD"]);
        if (response.product?.partCod)
          setDeliveryType((prevData) => [...prevData, "PARTCOD"]);
        if (response.product?.prepaid)
          setDeliveryType((prevData) => [...prevData, "PREPAID"]);
        if (response.product?.return)
          setDeliveryType((prevData) => [...prevData, "RETURN"]);

        if (response.product?.returnTime) setReturnDays(response.product.returnTime);
      } else {
        setMessage(response.message);
        setShowSnackBar(true);
      }
    };
    fetchData();
  }, []);

  // Quantity Selector

  const minQuantity = 1;

  const myDivRef = useRef(null);

  const handleScroll = () => {
    if (myDivRef.current) {
      myDivRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDecrement = () => {
    if (quantity > minQuantity) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      // calculatePrice(newQty);
    }
  };

  const handleIncrement = () => {
    if (quantity == 10) {
      return;
    }
    const newQty = quantity + 1;
    setQuantity(newQty);
    // calculatePrice(newQty);
  };

  const handleAddToCart = async () => {
    if(!user){
      setMessage("Please login to add to cart");
      setShowSnackBar(true);
      return
    }
    setLoading(true);
    const response = await addToCart(product._id, quantity);
    setLoading(false);
    if (response.success) {
      setMessage(response.message);
      setShowSnackBar(true);
      setCart(response.cart);
      setCartCount(response.totalItems);
    } else {
      setMessage(response.message);
      setShowSnackBar(true);
    }
  };

  const handleBuyNow = async () => {
    if(!user){
      setMessage("Please login to add to cart");
      setShowSnackBar(true);
      return
    }
    setLoading(true);
    const response = await addToCart(product._id, quantity);
    setLoading(false);
    if (response.success) {
      setMessage(response.message);
      setShowSnackBar(true);
      setCart(response.cart);
      setCartCount(response.totalItems);
      navigate("/order/cart");
    } else {
      setMessage(response.message);
      setShowSnackBar(true);
    }
  };
  // const calculatePrice = (qty) => {
  //   let total = qty * 1399;
  //   let finalPrice = parseFloat((total + (gst / 100) * total).toFixed(2));
  //   setproductPrice(finalPrice);
  // };

  return (
    <div className="flex flex-col md:flex-row gap-4 h-screen ">
      <div className=" flex flex-col gap-4 md:w-3/4 md:overflow-y-auto hide-scroll">
        <div className="flex-flex-col bg-white p-4 rounded-md shadow-md">
          <DynamicBreadcrumbs />
          <hr className="!text-gray-300"></hr>

          {/* Product Details */}
          <div className="flex flex-col lg:flex-row gap-8 p-2 md:p-6">
            {/* Left: Image Slider */}
            <div className="w-full lg:w-2/5">
              <Swiper
                spaceBetween={10}
                centeredSlides={true}
                slidesPerView={1}
                pagination={{
                  clickable: true,
                }}
                navigation={false}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Autoplay, Pagination, Navigation, Thumbs]}
                className="w-full aspect-[1/1]"
              >
                {product &&
                  product.images &&
                  product.images.map((img, index) => (
                    <SwiperSlide>
                      <img
                        src={img}
                        alt={`Product ${index}`}
                        className="w-full h-full rounded-md object-contain"
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>

              {/* Thumbnails */}
              <Swiper
                modules={[Thumbs]}
                onSwiper={(swiper) => setThumbsSwiper(swiper)}
                spaceBetween={10}
                slidesPerView={4}
                watchSlidesProgress
                className="my-4"
              >
                {product &&
                  product.images &&
                  product.images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <div className="w-full aspect-[1/1] cursor-pointer">
                        <img
                          src={img}
                          alt={`Thumbnail ${index}`}
                          className={`w-full h-full object-cover rounded-md ${
                            thumbnailIndex == index
                              ? "border-orange-400"
                              : "border-gray-300"
                          } border-1`}
                          onClick={() => {
                            setthumbnailIndex(index);
                          }}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>

            {/* Right: Product Info */}
            <div className="w-full flex flex-col gap-2">
              <h3 className="!text-sm md:!text-lg">
                {product?.name?.toUpperCase() || ""}
              </h3>

              {product?.rating && (
                <Rating
                  name="read-only"
                  value={product.rating}
                  readOnly
                  size="small"
                  className="p-0 mb-4 mt-[-0.2rem]"
                />
              )}

              {product.shortDescription && (
                <p className="!text-xs md:!text-sm text-gray-600 mb-4 font-semibold">
                  {product.shortDescription}
                </p>
              )}

              {/* Offers */}
              <div className="bg-red-50 p-4 rounded-md border-none">
                <h4 className="font-semibold text-sm mb-2">AVAILABLE OFFERS</h4>
                <ul className="!text-xs space-y-1">
                  <li>
                    Flat ₹200 off on order above ₹5,000. Valid for your next
                    order.{" "}
                    <span className=" !text-xs text-blue-500 cursor-pointer">
                      View
                    </span>
                  </li>
                  <li>
                    Flat ₹500 off on order above ₹10,000. Valid for your next
                    order.{" "}
                    <span className=" !text-xs text-blue-500 cursor-pointer">
                      View
                    </span>
                  </li>
                  <li>
                    Flat ₹100 off on order above ₹4,000. Valid for new GST
                    customers.{" "}
                    <span className=" !text-xs text-blue-500 cursor-pointer">
                      View
                    </span>
                  </li>
                </ul>
              </div>

              {/* Recommendation */}
              {/* <div className="mt-4">
          <h4 className="font-semibold text-sm mb-2">You may also like</h4>
          <div className="border rounded-md p-2 text-sm">
            <p>Havells Life Line Plus 1.5 Sq.mm 1 Core Flame Retardant HRFR House Cable Black, 90 m</p>
            <span className="font-bold text-red-500">₹2,595</span>
          </div>
        </div> */}

              {/* Features */}

              {product && product.technicalAspects && (
                <div className="border rounded-sm mt-6 shadow-sm overflow-hidden !border-gray-200">
                  {/* Header */}
                  <div className=" p-2 md:p-3 font-semibold text-sm bg-white-100 border-b flex justify-between items-center !border-gray-300">
                    <span className="!text-sm !uppercase !tracking-wide !text-blue-900">
                      Features
                    </span>
                    <span
                      onClick={handleScroll}
                      className="!text-sm !text-blue-900 !text-md hover:underline cursor-pointer"
                    >
                      More Details
                    </span>
                  </div>

                  {/* Feature List */}
                  <div className=" p-2  md:p-4 text-sm space-y-3 text-gray-800 bg-gray-100 m-2">
                    {product &&
                      product.technicalAspects &&
                      product.technicalAspects.slice(0, 3).map((item, index) => (
                        <div className="flex justify-between gap-6">
                          <span className=" !text-xs text-gray-700 w-3/4">
                            {item?.label || ""}
                          </span>
                          <span className="!text-xs font-medium w-1/4">
                            {item?.value || ""}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Footer Links */}
              {product && product.brand && (
                <div className="text-sm mt-2 space-y-1 text-blue-600 underline cursor-pointer">
                  <p
                    className="!text-xs"
                    onClick={() => navigate(`/search/?q=${product.brand}`)}
                  >
                    More {product.brand} products
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* Product Details end */}
        </div>

        {/* Description Tab */}
        <div
          className="border rounded-md p-4 bg-white border-gray-300 shadow-md"
          ref={myDivRef}
        >
          {product && <DescriptionTabs productData={product} />}
        </div>
        {/* Description Tab ends */}

        {/* Ad banner */}
        <div className="border rounded-md p-4 bg-white border-gray-300 shadow-md">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center text-sm text-black font-semibold ">
            {/* Item 1 */}
            <div className="flex flex-col items-center space-y-2">
              <i className="ri-shield-check-line text-orange-500 text-2xl md:text-3xl"></i>
              <span className="!text-xs md:!text-sm font-semibold">
                Warranty as per brand
              </span>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col items-center space-y-2">
              <i className="ri-award-line text-orange-500 text-2xl md:text-3xl"></i>
              <span className="!text-xs md:!text-sm font-semibold">
                100% Original Products
              </span>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col items-center space-y-2">
              <i className="ri-secure-payment-line text-orange-500 text-2xl md:text-3xl"></i>
              <span className="!text-xs md:!text-sm font-semibold">
                Secure payments
              </span>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col items-center space-y-2">
              <i className="ri-shield-user-line text-orange-500 text-2xl md:text-3xl"></i>
              <span className="!text-xs md:!text-sm font-semibold">
                100% Buyer protection
              </span>
            </div>

            {/* Item 5 */}
            <div className="flex flex-col items-center space-y-2">
              <i className="ri-vip-crown-line text-orange-500 text-2xl md:text-3xl"></i>
              <span className="!text-xs md:!text-sm font-semibold">
                Top Brands
              </span>
            </div>
          </div>
        </div>

        {/* Ad banner end */}

        <div className="hidden md:flex width-full">
          {/* {Frequently Bought Together} */}
          <CardDisplay title="FREQUENTLY BOUGHT TOGETHER" data={dummydata2} />
          {/* Frequently Bought Together end} */}
        </div>

        {/* {Recommended Products} */}
        <div className="hidden md:flex width-full">
          <CardDisplay title="RECOMMENDED PRODUCTS" data={dummydata2} />
          {/* Recommended Products end} */}
        </div>
      </div>

      {/* Right Div */}
      <div className="md:w-80 rounded-md h-screen flex flex-col gap-4">
        {/* Price Display */}
        <div className="flex flex-col rounded-md gap-3 bg-white rounded-md p-4 shadow-md">
          <p className="!text-md md:!text-lg font-semibold">
            ₹{" "}
            {discountAmount * quantity +
              (discountAmount * quantity * gst) / 100}{" "}
            <span className="!text-xs md:!text-sm text-gray-800 font-normal ml-2">
              ( ₹ {discountAmount * quantity} + {product.gst}% GST )
            </span>
          </p>

          {product && product.discount && product.discount > 0 ? (
            <p className="!text-xs md:!text-sm !text-gray-700">
              UNIT MRP :{" "}
              <span className="!text-xs md:!text-sm text-gray-500 text-decoration-line: line-through">
                ₹{price}
              </span>
              <span className="!text-xs md:!text-sm text-gray-700 ml-2">
                ₹{price - (price * product.discount) / 100}
              </span>
              <span className="!text-xs !text-green-600 ml-2 font-semibold ml-6 border border-green-500  rounded-sm md:p-1 px-[4px] py-[1px]">
                {product?.discount || 0}% OFF
              </span>
            </p>
          ) : (
            <p className="!text-xs md:!text-sm !text-gray-700">
              UNIT MRP :{" "}
              <span className="!text-xs md:!text-sm text-gray-700">
                ₹{price}
              </span>
            </p>
          )}
          <Box display="flex" alignItems="center" gap={2}>
            {/* Quantity Control Box */}
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "50px",
                border: "2px solid #d1d5db", // light grey border
                padding: "0px 2px",
              }}
            >
              <IconButton onClick={handleDecrement} size="small">
                <i class="ri-indeterminate-circle-line text-xl md:text-2xl"></i>
              </IconButton>
              <Typography sx={{ mx: 2 }}>{quantity}</Typography>
              <IconButton onClick={handleIncrement} size="small">
                <i class="ri-add-circle-line text-xl md:text-2xl"></i>
              </IconButton>
            </Paper>

            {/* MOQ Text */}
            <p className="!text-xs">
              Minimum Quantity - <strong>{minQuantity}</strong>
            </p>
          </Box>
        </div>
        {/* Price Display ends */}

        {/* Buttons */}
        <div className="flex flex row w-full gap-2 ">
          <button
            className="bg-orange-600 !text-sm text-white w-1/2 p-2 rounded-sm shadow-md"
            onClick={() => {
              handleAddToCart();
            }}
          >
            ADD TO CART
          </button>
          <SnackBar
            openSnackBar={openSnackBar}
            setopenSnackBar={setopenSnackBar}
            message={"Product added to cart successfully !"}
          />
          <button
            onClick={() => handleBuyNow()}
            className="bg-blue-900 !text-sm text-white w-1/2 p-2 rounded-sm shadow-md"
          >
            BUY NOW
          </button>
        </div>
        {/* Buttons end */}

        {/* {Check Delivery} */}
        <div className="flex flex-col gap-2 bg-white rounded-md shadow-md p-4">
          <span className="!font-sm font-semibold">
            <i class="ri-map-pin-line mr-1"></i> Check Delivery Details
          </span>

          <div className="flex flex-row"></div>

          <div className="flex flex-row border border-gray-300 p-1 rounded-sm justify-between items-center w-full">
            <input
              className="text-gray-500 !text-xs md:!text-sm border-none w-full p-2 outline-none"
              type="text"
              placeholder="Enter Pincode"
            ></input>
            <button
              className="h-8 bg-orange-600 !text-xs md:!text-sm text-white md:py-2 px-4 rounded-sm"
              onClick={() => setcheckPin({ ...checkPin, visible: true })}
            >
              Check
            </button>
          </div>

          {/* CheckPin */}
          {checkPin.visible && (
            <div className="flex flex-col gap-1 mt-2 ">
              <p className="!text-xs">
                Delivery at{" "}
                <span className="!text-xs font-semibold">
                  {checkPin.data.pincode}
                </span>
                -{" "}
                <span className="!text-xs font-semibold">
                  {checkPin.data.city}
                </span>
              </p>
              <p className="!text-xs">
                Shipping Charges:{" "}
                <span className="!text-xs font-semibold !text-green-600">
                  {checkPin.data.shippingCharge == 0
                    ? "FREE"
                    : checkPin.data.shippingCharge}
                </span>
              </p>
              <p className="!text-xs">
                Delivery by:{" "}
                <span className="!text-xs font-semibold !text-green-700">
                  {checkPin.data.deliveryDate
                    ? checkPin.data.deliveryDate
                    : "NULL"}
                </span>
              </p>
            </div>
          )}
          {/* CheckPin end */}

          <div className="flex flex-col gap-2 mt-2">
            <div className="flex flex-row items-center justify-start gap-6">
              <button
                className={`${
                  deliveryType.includes("PREPAID")
                    ? "bg-green-600 text-white"
                    : "bg-white text-black"
                } !text-xs w-1/2 p-2 rounded-sm shadow-lg`}
              >
                PREPAID
              </button>
              <p className="!text-xs justify-center w-1/2 text-center">
                {deliveryType.includes("PREPAID")
                  ? "Available"
                  : "Not Available"}
              </p>
            </div>
            <div className="flex flex-row items-center justify-start gap-6">
              <button
                className={`${
                  deliveryType.includes("COD")
                    ? "bg-green-600 text-white"
                    : "bg-white text-black"
                } !text-xs w-1/2 p-2 rounded-sm shadow-lg`}
              >
                COD
              </button>
              <p className="!text-xs justify-center w-1/2 text-center">
                {deliveryType.includes("COD") ? "Available" : "Not Available"}
              </p>
            </div>

            <div className="flex flex-row items-center justify-start gap-6">
              <button
                className={`${
                  deliveryType.includes("PARTCOD")
                    ? "bg-green-600 text-white"
                    : "bg-white text-black"
                } !text-xs w-1/2 p-2 rounded-sm shadow-lg`}
              >
                PART COD
              </button>
              <p className="!text-xs justify-center w-1/2 text-center">
                {deliveryType.includes("PARTCOD")
                  ? "Available"
                  : "Not Available"}
              </p>
            </div>

            <div className="flex flex-row items-center justify-start gap-6">
              <button
                className={`${
                  deliveryType.includes("RETURN")
                    ? "bg-green-600 text-white"
                    : "bg-white text-black"
                } !text-xs w-1/2 p-2 rounded-sm shadow-lg`}
              >
                RETURN
              </button>
              <p className="!text-xs justify-center w-1/2 text-center">
                {deliveryType.includes("RETURN") ? `${returnDays} Days `: "Not Available"}
              </p>
            </div>
          </div>
        </div>
        {/* {Check Delivery end} */}

        {/* Need Help Banner */}
        <img src={needHelp} alt="need-help" className="w-full my-2"></img>
        {/* Need Help Banner ends */}
      </div>
      {/* Right Div ends*/}
    </div>
  );
}

export default Productpage;
