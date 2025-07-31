import { useEffect, useState } from "react";
import razorpay from "/razorpay.png";
import { useAuth } from "../contexts/AuthContext";
import { useLoader } from "../contexts/LoaderContext";
import { useAlert } from "../contexts/AlertContext";
import { useNavigate } from "react-router-dom";
import { CreateOrder } from "../apis/order";
import OrderSummary from "./OrderSummary";

function Paymentpage() {
  const [selectedOption, setSelectedOption] = useState("");
 const {
      user,
      setUser,
      cart,
      setCart,
      cartCount,
      setCartCount,
      cartDetails,
      setCartDetails
    } = useAuth();
    
const { setLoading } = useLoader();
  const { setMessage, setShowSnackBar } = useAlert();
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [showSummary,setShowSummary]=useState(false);
  const [orderSummary,setOrderSummary]=useState(null);

  useEffect(() => {
    if(cart==null || cart.length==0) 
    {
      setMessage("Cart is Empty!");
      setShowSnackBar(true);
      navigate("/order/cart");
    }

    if(cartDetails.shippingInfo==null || cartDetails.billingInfo==null)
    {
      setMessage("Please select a shipping address and a billing address");
      setShowSnackBar(true);
      navigate("/order/address");
    }
  }, []);


  const handleCOD=async()=>{
    
    setCartDetails({...cartDetails,paymentInfo:{method:"cod"}});
    if(cartDetails.paymentInfo){
      setLoading(true);
      const response=await CreateOrder({
        items:cart,
        totalItems:cartDetails.totalItems,
        totalPrice:cartDetails.totalPrice,
        totalGst:cartDetails.totalGst,
        shippingInfo:cartDetails.shippingInfo,
        billingInfo:cartDetails.billingInfo,
        paymentInfo:cartDetails.paymentInfo,
        currency:"INR",
        status:"processing",
      });
      setLoading(false);
      if(response.success)
      {
      //  setCart(null);
      //  setCartCount(0);
      //  setCartDetails({shippingInfo:null,billingInfo:null,paymentInfo:});
      setOrderSummary(response.order);
       setShowSummary(true);
       setMessage("Order Created Successfully");
       setShowSnackBar(true);
      }
      else
      {
        setMessage(response.message);
        setShowSnackBar(true);
      }
    }
  }

   const handleRazerpay=async()=>{
    
  }

  const handlePay=async()=>{
    if(selectedOption==="cod")
    {
      handleCOD();
    }
    else if(selectedOption==="razorpay")
    {
      handleRazerpay();
    }
  }


  return <>
    {showSummary?<OrderSummary orderData={orderSummary} />:<div className="flex flex-col md:flex-row p-2 mt-2 md:m-0 md:p-6 gap-2 md:h-screen ">
      {/* Left Div */}
      <div className=" flex flex-col gap-4 p-2 md:w-3/4 md:overflow-y-auto hide-scroll">
        <div className="flex flex-col gap1 bg-white rounded-md shadow-md p-4 w-full">
          <h3 className="!text-sm md:!text-md !font-semibold !text-gray-800">
            Select you Payment Method :
          </h3>
          <div className="flex flex-col gap-5 mt-6 w-fit">
            <div className="flex flex-row gap-4 justify-start bg-gray-50 rounded-md shadow-md px-10 py-3">
              <input
                className=""
                type="radio"
                name="cod"
                id="cod"
                value="cod"
                checked={selectedOption === "cod"}
                onChange={handleOptionChange}
              />
              <label
                className="!text-md md:!text-lg !font-semibold !text-gray-800"
                htmlFor="cod"
              >
                Cash On Delivery
              </label>
            </div>

            <div className="flex flex-row gap-2 justify-start bg-gray-50 rounded-md shadow-md px-10 py-3">
              <input
                className=""
                type="radio"
                name="razorpay"
                id="razorpay"
                value="razorpay"
                checked={selectedOption === "razorpay"}
                onChange={handleOptionChange}
              />
              <label
                className="!text-xs md:!text-sm font-medium !text-gray-800"
                htmlFor="cod"
              >
                <img src={razorpay} alt="razorpay" height={30} width={130} />
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* Right Div */}
      <div className="md:w-80 rounded-md md:h-screen flex flex-col gap-4 p-2 ">
        {/* Payment Summary */}
        <div className="bg-white p-4 max-w-sm rounded-sm shadow-md">
          <p className="!font-semibold !text-sm mb-2">
            Payment Summary <span className="!text-sm">({cartDetails?.totalItems?.toFixed(0) || 0} Items)</span>
          </p>
          <hr className="mb-2" />

          <div className="flex justify-between mb-1">
            <span className="!text-gray-800 !text-xs">Total Selling Price</span>
            <span className="!font-semibold !text-xs">₹{(cartDetails?.totalPrice - cartDetails?.totalGst).toFixed(2) ||
                0}</span>
          </div>

          <div className="flex justify-between mb-1">
            <span className="!text-gray-800 !text-xs">GST Amount</span>
            <span className="!font-semibold !text-xs">+₹{cartDetails?.totalGst?.toFixed(2) || 0}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="!text-gray-800 !text-xs">Shipping charges</span>
            <span className="!text-green-600 !text-xs !font-semibold">
              Free
            </span>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between">
            <span className="!text-sm !font-bold">Amount Payable</span>
            <span className="!text-sm !font-bold">₹{cartDetails?.totalPrice?.toFixed(2) || 0}</span>
          </div>
        </div>
        {/* Payment Summary  end*/}
        {selectedOption === "" ? (
          <button className="bg-gray-200 !text-sm text-gray-500 w-full p-2 rounded-sm shadow-md disabled">
            PROCEED TO PAY
          </button>
        ) : (
          <button
            className="bg-orange-600 !text-sm text-white w-full p-2 rounded-sm shadow-md"
            onClick={handlePay}
          >
            PROCEED TO PAY
          </button>
        )}
      </div>
      {/* Right Div end*/}
    </div>}
  </>
}

export default Paymentpage;
