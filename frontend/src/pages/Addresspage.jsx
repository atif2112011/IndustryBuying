import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditAddressModal from "../components/EditAddressModal";
import { useAuth } from "../contexts/AuthContext";
import { useLoader } from "../contexts/LoaderContext";
import { useAlert } from "../contexts/AlertContext";
import { UpdateUser } from "../apis/user";


function Addresspage() {
  const [addresses, setAddresses] = useState([]);
  const [selectedBilling, setselectedBilling] = useState({});
  const [selectedShipping, setselectedShipping] = useState(null);
  const navigate = useNavigate();
  const [editingAddress, seteditingAddress] = useState({});
  const [isModalOpenAddress, setIsModalOpenAddress] = useState(false);
  const [isCreateAddressModalOpen, setisCreateAddressModalOpen] =
    useState(false);
    const {
      user,
      setUser,
      cart,
      setCart,
      cartCount,
      setCartCount,
      cartDetails,
      setCartDetails,
    } = useAuth();
  const { setLoading } = useLoader();
  const { setMessage, setShowSnackBar } = useAlert();

  const handleCreateAddress = async (newAddress) => {
    let newUser = { ...user, address: [...user.address, newAddress] };
    setLoading(true);
    const response = await UpdateUser(newUser);
    setLoading(false);
    if (response.success) {
      setUser(response.user);
      setMessage("Address Updated Successfully");
      setShowSnackBar(true);
      setisCreateAddressModalOpen(false);
    } else {
      setMessage(response.message);
      setShowSnackBar(true);
    }
  };

  const handleProceedtoPay = () => {
    if (selectedShipping && selectedBilling) {
      setCartDetails({ ...cartDetails, shippingInfo: selectedShipping , billingInfo: selectedBilling});
      navigate("/order/payment")
    } else {
      setMessage("Please select a shipping address and a billing address");
      setShowSnackBar(true);
    }
  };

  useEffect(() => {
    if (cart==null || cart.length==0) {
      setMessage("Your cart is Empty");
      setShowSnackBar(true);
      navigate("/order/cart");
    }
  }, []);

  useEffect(() => {
    addresses.forEach((address) => {
      if (address.isShipping == false && address.isPrimary == true)
        setselectedBilling(address);
      if (address.isShipping == true && address.isPrimary == true)
        setselectedShipping(address);
    });
  }, [addresses]);

  useEffect(() => {
    setAddresses(user?.address || []);
  }, [user]);
  


  return (
    <div className="flex flex-col md:flex-row p-2 mt-2 md:m-0 md:p-6 gap-2 md:h-screen ">
      {/* Left Div */}
      <EditAddressModal
        isOpen={isCreateAddressModalOpen}
        onClose={() => setisCreateAddressModalOpen(false)}
        initialData={editingAddress}
        onSave={handleCreateAddress}
      />
      <div className=" flex flex-col gap-4 p-2 md:w-3/4 md:overflow-y-auto hide-scroll">
        {/* Billing Address select */}
        <div className="flex flex-col gap-4 mb-6">
          <p className=" !text-sm font-semibold !text-gray-800 mb-1">
            Select a Billing Address
          </p>
          <div className="flex flex-col md:flex-row flex-wrap gap-4">
            {addresses
              .filter((address) => !address.isShipping)
              .map((address) => {
                return (
                  <div className="bg-white p-3 md:p-4 md:px-8 rounded shadow-md md:w-2/5 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      {selectedBilling && address._id == selectedBilling._id ? (
                        <span className="bg-green-600 !text-white !text-[10px] md:!text-xs px-2 py-1 rounded font-medium">
                          Billing at this address
                        </span>
                      ) : (
                        <button
                          className="bg-white !text-green-600 border border-green-600 !text-[10px] md:!text-xs px-2 py-1 rounded font-medium cursor-pointer"
                          onClick={() => {
                            setselectedBilling(address);
                          }}
                        >
                          Ship Here
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col gap-1 text-sm text-gray-800 leading-relaxed w-full">
                      <p className="!text-xs md:!text-sm font-semibold">
                        {address.name} - [{address.type}]
                      </p>
                      <p className="!text-xs md:!text-sm">
                        <span className="!text-xs md:!text-sm font-medium">
                          Mobile :
                        </span>{" "}
                        {address?.mobile || address?.phone}
                      </p>
                      <p className="!text-xs md:!text-sm">
                        <span className="!text-xs md:!text-sm font-medium">
                          Alternate Mobile :
                        </span>{" "}
                        {address?.alternateMobile || address?.alternatePhone}
                      </p>
                      <p className="!text-xs md:!text-sm w-full">
                        <span className="!text-xs md:!text-sm font-medium">
                          Address :
                        </span>{" "}
                        {`${address.flat}, ${
                          address.landmark ? address.landmark : ""
                        }, ${address.area}, ${address.city}, `}
                        {address.state}- {address.pincode}
                      </p>
                      <p className="!text-xs md:!text-sm">
                        <span className="!text-xs md:!text-sm font-medium">
                          GSTIN:{" "}
                        </span>
                        {address.gstin}
                      </p>
                    </div>
                  </div>
                );
              })}

            <div
              className="flex items-center justify-center bg-white p-4 px-8 rounded shadow-md w-2/5 border border-gray-200 cursor-pointer"
              onClick={() => {
                seteditingAddress({
                  id: "",
                  name: "",
                  email: "",
                  phone: "",
                  alternatePhone: "",
                  gstin: "",
                  flat: "",
                  area: "",
                  landmark: "",
                  pincode: "",
                  city: "",
                  state: "",
                  type: "other",
                  isPrimary: false,
                  isShipping: false,
                });
                setisCreateAddressModalOpen(true);
              }}
            >
              <i class="ri-add-large-line"></i>
            </div>
          </div>
        </div>
        {/* Billing Address select end */}

        {/* Shipping Address select */}
        <div className="flex flex-col gap-4 mb-6">
          <p className=" !text-sm font-semibold !text-gray-800 mb-1">
            Select a Shipping Address
          </p>
          <div className="flex flex-row flex-wrap gap-4">
            {addresses
              .filter((address) => address.isShipping)
              .map((address) => {
                return (
                  <div className="bg-white p-3 md:p-4 md:px-8 rounded shadow-md md:w-2/5 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      {selectedShipping && address._id == selectedShipping._id ? (
                        <span className="bg-green-600 !text-white !text-[10px] md:!text-xs px-2 py-1 rounded font-medium">
                          Shipping at this address
                        </span>
                      ) : (
                        <button
                          className="bg-white !text-green-600 border border-green-600 !text-[ 10px] md:!text-xs px-2 py-1 rounded font-medium cursor-pointer"
                          onClick={() => {
                            setselectedShipping(address);
                          }}
                        >
                          Ship Here
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col gap-1 text-sm text-gray-800 leading-relaxed w-full">
                      <p className="!text-xs md:!text-sm font-semibold">
                        {address.name} - [{address.type}]
                      </p>
                      <p className="!text-xs md:!text-sm">
                        <span className="!text-xs md:!text-sm font-medium">
                          Mobile :
                        </span>{" "}
                        {address?.mobile || address?.phone}
                      </p>
                      <p className="!text-xs md:!text-sm">
                        <span className="!text-xs md:!text-sm font-medium">
                          Alternate Mobile :
                        </span>{" "}
                        {address?.alternateMobile || address?.alternatePhone}
                      </p>
                      <p className="!text-xs md:!text-sm w-full">
                        <span className="!text-xs md:!text-sm font-medium">
                          Address :
                        </span>{" "}
                        {`${address.flat}, ${
                          address.landmark ? address.landmark : ""
                        }, ${address.area}, ${address.city}, `}
                        {address.state}- {address.pincode}
                      </p>
                      <p className="!text-xs md:!text-sm">
                        <span className="!text-xs md:!text-sm font-medium">
                          GSTIN:{" "}
                        </span>
                        {address.gstin}
                      </p>
                    </div>
                  </div>
                );
              })}

            <div
              className="flex items-center justify-center bg-white p-4 px-8 rounded shadow-md w-2/5 border border-gray-200 cursor-pointer"
              onClick={() => {
                seteditingAddress({
                  id: "",
                  name: "",
                  email: "",
                  mobile: "",
                  alternateMobile: "",
                  gstin: "",
                  flat: "",
                  area: "",
                  landmark: "",
                  pincode: "",
                  city: "",
                  state: "",
                  type: "other",
                  isPrimary: false,
                  isShipping: true,
                });
                setisCreateAddressModalOpen(true);
              }}
            >
              <i class="ri-add-large-line"></i>
            </div>
          </div>
        </div>
        {/* Shipping Address select end */}
      </div>
      {/* Left Div end*/}

      {/* Right Div */}
      <div className="md:w-80 rounded-md md:h-screen flex flex-col gap-4 p-2 ">
        {/* Payment Summary */}
        <div className="bg-white p-4 max-w-sm rounded-sm shadow-md">
          <p className="!font-semibold !text-sm mb-2">
            Payment Summary{" "}
            <span className="!text-sm">
              ({cartDetails?.totalItems?.toFixed(0) || 0} Items)
            </span>
          </p>
          <hr className="mb-2" />

          <div className="flex justify-between mb-1">
            <span className="!text-gray-800 !text-xs">Total Selling Price</span>
            <span className="!font-semibold !text-xs">
              ₹
              {(cartDetails?.totalPrice - cartDetails?.totalGst).toFixed(2) ||
                0}
            </span>
          </div>

          <div className="flex justify-between mb-1">
            <span className="!text-gray-800 !text-xs">GST Amount</span>
            <span className="!font-semibold !text-xs">
              +₹{cartDetails?.totalGst?.toFixed(2) || 0}
            </span>
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
            <span className="!text-sm !font-bold">
              ₹{cartDetails?.totalPrice?.toFixed(2) || 0}
            </span>
          </div>
        </div>
        {/* Payment Summary  end*/}
        {selectedBilling == null || selectedShipping == null ? (
          <button className="bg-gray-200 !text-sm text-gray-500 w-full p-2 rounded-sm shadow-md disabled">
            PROCEED TO PAY
          </button>
        ) : (
          <button
            className="bg-orange-600 !text-sm text-white w-full p-2 rounded-sm shadow-md"
            onClick={() => handleProceedtoPay()}
          >
            PROCEED TO PAY
          </button>
        )}
        {(selectedBilling == null || selectedShipping == null) && (
          <div className="bg-orange-100 border border-orange-300 !text-sm text-orange-600  w-full p-2 rounded-sm shadow-md">
            Please select a billing and shipping address
          </div>
        )}
      </div>
      {/* Right Div end*/}
    </div>
  );
}

export default Addresspage;
