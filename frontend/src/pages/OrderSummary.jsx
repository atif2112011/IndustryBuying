import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function OrderSummary({orderData}) {
  const [order, setOrder] = useState(null);
  const {
    user,
    setUser,
    cart,
    setCart,
    cartCount,
    setCartCount,
    cartDetails,
    setCartDetails,
    setOrderSummary
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("orderData", orderData);
    setOrder(orderData);
  
    
  }, [orderData]);
  


  const formatAddress = (info) => {
    return `${info.name}\n${info.flat}, ${info.area}\n${info.landmark}\n${info.city}, ${info.state} - ${info.pincode}\nPhone: ${info.phone}\nAlt: ${info.alternatePhone}`;
  };

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);


  return (
    <div className="flex flex-col p-2 mt-2 md:m-0 md:p-6 gap-2 md:h-screen overflow-y-auto ">
      <h2 className="!text-sm md:!text-xl !font-semibold mb-2 w-full text-center">
            Success ! Your order has been placed Successfully.
          </h2>
      
      {order && <div className="bg-white rounded-lg shadow-md p-4 md:p-6 max-w-2xl mx-auto mt-6  w-full h-fit">
        {/* Order Summary */}
        <div className="mb-4">
          <h2 className="!text-sm md:!text-xl font-semibold mb-2">
            Order Summary
          </h2>
          <div className="space-y-1 bg-gray-50 p-3 rounded-sm">
            <div className="flex justify-between">
              <p className=" !text-xs md:!text-sm">Order No:</p>
              <p className="!text-xs md:!text-sm font-medium">{order._id}</p>
            </div>
            <div className="flex justify-between">
              <p className="!text-xs md:!text-sm">Date:</p>
              <p className="!text-xs md:!text-sm font-medium">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="!text-xs md:!text-sm">Email:</p>
              <p className="!text-xs md:!text-sm font-medium">
                {user?.email || order?.userName}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="!text-xs md:!text-sm">Total:</p>
              <p className="!text-xs md:!text-sm font-medium">
                {" "}
                ₹{order.totalPrice.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="!text-xs md:!text-sm">Payment Method :</p>
              <p className="!text-xs md:!text-sm font-medium">
                {" "}
                {order.paymentInfo.method.toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="mb-4">
          <h2 className="!text-sm md:!text-xl font-semibold mb-2">
            Order Details
          </h2>
          <div className="bg-gray-50 p-3 rounded-sm space-y-4">
            {order.items.map((item, index) => (
              <div className="flex flex-col border-b border-gray-300 pb-2">
                <div key={index} className="flex justify-between gap-8 items-center">
                  <span className="!text-xs md:!text-sm">
                    {item.productName} x {item.quantity}
                  </span>
                  <span className="!text-xs md:!text-sm font-medium">
                    ₹{(item.subtotal.toFixed(2) - item.gst.toFixed(2)).toFixed(2)}
                  </span>
                </div>
                <div key={index} className="flex justify-between items-center">
                  <span className="!text-xs md:!text-sm">
                    GST @ {item.gstPercentage}%
                  </span>
                  <span className="!text-xs md:!text-sm font-medium">
                    ₹{item.gst.toFixed(2)}
                  </span>
                </div>
                <div key={index} className="flex justify-between items-center">
                  <span className="!text-xs md:!text-sm font-semibold">
                    Subtotal
                  </span>
                  <span className="!text-xs md:!text-sm font-medium">
                    ₹{item.subtotal.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Info */}
        <div className="mb-4">
          <h2 className="!text-sm md:!text-xl font-semibold mb-2">
            Payment Info
          </h2>
          <div className="bg-gray-50 p-3 rounded-sm space-y-1">
            <div className="flex justify-between">
              <p className="!text-xs md:!text-sm">Method of Payment:</p>
              <p className="!text-xs md:!text-sm font-medium">
                {order.paymentInfo.method.toUpperCase()}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="!text-xs md:!text-sm">Payment Status:</p>
              <p className="!text-xs md:!text-sm font-medium">
                {order.paymentInfo.status}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="!text-xs md:!text-sm">Total Items:</p>
              <p className="!text-xs md:!text-sm font-medium">
                {order.totalItems}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="!text-xs md:!text-sm">Total Amount:</p>
              <p className="!text-xs md:!text-sm font-medium">
                ₹{order.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="mb-4">
          <h2 className="!text-sm md:!text-xl font-semibold mb-2">
            Shipping Address
          </h2>
          <div className="bg-gray-50 p-3 rounded-sm space-y-1">
            <pre className="whitespace-pre-wrap !text-xs md:!text-sm font-[poppins]">
              {formatAddress(order.shippingInfo)}
            </pre>
          </div>
        </div>

        {/* Billing Address */}
        <div className="mb-4">
          <h2 className="!text-sm md:!text-xl font-semibold mb-2">
            Billing Address
          </h2>

          <div className="bg-gray-50 p-3 rounded-sm space-y-1">
            <pre className="whitespace-pre-wrap !text-xs md:!text-sm font-[poppins]">
              {formatAddress(order.billingInfo)}
            </pre>
          </div>
        </div>

        {/* Order Status */}
        <div className="mb-4">
          <h2 className="!text-sm md:!text-xl font-semibold mb-2">
            Order Status
          </h2>
          <div className="bg-gray-50 p-3 rounded-sm space-y-1">
            <p className="!text-xs md:!text-sm font-medium capitalize">
              {order.status}
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-2 mt-6">
          <button
            onClick={() => navigate("/user/order-and-billing")}
            className="bg-orange-500 hover:bg-orange-600 text-white !text-xs md:!text-sm font-semibold font-medium py-2 px-4 rounded"
          >
            View All Orders
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-700 hover:bg-gray-800 text-white !text-xs md:!text-sm font-medium py-2 px-4 rounded"
          >
            Continue Shopping
          </button>
        </div>
      </div>}
    </div>
  );
}

export default OrderSummary;
