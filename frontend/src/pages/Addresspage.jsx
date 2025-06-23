import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Addresspage() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Mohd Atif",
      email: "atif2511171@gmail.com",
      type: "office",
      isShipping: false,
      isPrimary: true,
      mobile: "+91-8303331713",
      alternateMobile: "+91-9005926608",
      flat: "188/12/1, Hata Durga Prasad",
      area: "Mashagganj",
      landmark: "near Railway Line",
      addressLine:
        "C/O, Rahul Srivastava 188/12/1, Hata Durga Prasad, Mashagganj, Lucknow",
      state: "Uttar Pradesh",
      city: "Lucknow",
      pincode: "226001",
      gstin: "09ABBFR6844F1OZ",
    },
    {
      id: 3,
      name: "Mohd Atif",
      email: "atif2511171@gmail.com",
      type: "office",
      isShipping: false,
      isPrimary: false,
      mobile: "+91-8303331713",
      alternateMobile: "+91-9005926608",
      flat: "188/12/1, Hata Durga Prasad",
      area: "Mashagganj",
      landmark: "near Railway Line",
      addressLine:
        "C/O, Rahul Srivastava 188/12/1, Hata Durga Prasad, Mashagganj, Lucknow",
      state: "Uttar Pradesh",
      city: "Lucknow",
      pincode: "226001",
      gstin: "09ABBFR6844F1OZ",
    },
    {
      id: 2,
      name: "Mohd Atif",
      email: "atif2511171@gmail.com",
      type: "home",
      isShipping: true,
      isPrimary: true,
      mobile: "+91-9876543210",
      alternateMobile: "+91-9123456789",
      flat: "12-B, Rosewood Apartments",
      area: "Sector 62",
      landmark: "",
      addressLine:
        "C/O, Priya Mehra 12-B, Rosewood Apartments, Sector 62, Noida",
      state: "Uttar Pradesh",
      city: "Noida",
      pincode: "201309",
      gstin: "09PRYM1234F1ZX",
    },
  ]);
  const [selectedBilling, setselectedBilling] = useState({});
  const [selectedShipping, setselectedShipping] = useState(null);
  const navigate=useNavigate();
  useEffect(() => {
    addresses.forEach((address) => {
      if (address.isShipping == false && address.isPrimary == true)
        setselectedBilling(address);
      if (address.isShipping == true && address.isPrimary == true)
        setselectedShipping(address);
    });
  }, [addresses]);
  return (
    <div className="flex flex-row p-6 gap-2 h-screen ">
      {/* Left Div */}
      <div className=" flex flex-col gap-4 p-2 w-3/4 overflow-y-auto hide-scroll">
        {/* Billing Address select */}
        <div className="flex flex-col gap-4 mb-6">
          <p className=" !text-sm font-semibold !text-gray-800 mb-1">
            Select a Billing Address
          </p>
          <div className="flex flex-row flex-wrap gap-4">
            {addresses
              .filter((address) => !address.isShipping)
              .map((address) => {
                return (
                  <div className="bg-white p-4 px-8 rounded shadow-md w-2/5 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      {selectedBilling && address.id == selectedBilling.id ? (
                        <span className="bg-green-600 !text-white !text-xs px-2 py-1 rounded font-medium">
                          Billing at this address
                        </span>
                      ) : (
                        <button
                          className="bg-white !text-green-600 border border-green-600 !text-xs px-2 py-1 rounded font-medium cursor-pointer"
                          onClick={() => {
                            setselectedBilling(address);
                          }}
                        >
                          Ship Here
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col gap-1 text-sm text-gray-800 leading-relaxed w-full">
                      <p className="!text-sm font-semibold">
                        {address.name} - [{address.type}]
                      </p>
                      <p className="!text-sm">
                        <span className="!text-sm font-medium">Mobile :</span>{" "}
                        {address.mobile}
                      </p>
                      <p className="!text-sm">
                        <span className="!text-sm font-medium">
                          Alternate Mobile :
                        </span>{" "}
                        {address.alternateMobile}
                      </p>
                      <p className="!text-sm w-full">
                        <span className="!text-sm font-medium">Address :</span>{" "}
                        {`${address.flat}, ${
                          address.landmark ? address.landmark : ""
                        }, ${address.area}, ${address.city}, `}
                        {address.state}- {address.pincode}
                      </p>
                      <p className="!text-sm">
                        <span className="!text-sm font-medium">GSTIN: </span>
                        {address.gstin}
                      </p>
                    </div>
                  </div>
                );
              })}
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
                  <div className="bg-white p-4 px-8 rounded shadow-md w-2/5 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      {selectedShipping && address.id == selectedShipping.id ? (
                        <span className="bg-green-600 !text-white !text-xs px-2 py-1 rounded font-medium">
                          Shipping at this address
                        </span>
                      ) : (
                        <button
                          className="bg-white !text-green-600 border border-green-600 !text-xs px-2 py-1 rounded font-medium cursor-pointer"
                          onClick={() => {
                            setselectedShipping(address);
                          }}
                        >
                          Ship Here
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col gap-1 text-sm text-gray-800 leading-relaxed w-full">
                      <p className="!text-sm font-semibold">
                        {address.name} - [{address.type}]
                      </p>
                      <p className="!text-sm">
                        <span className="!text-sm font-medium">Mobile :</span>{" "}
                        {address.mobile}
                      </p>
                      <p className="!text-sm">
                        <span className="!text-sm font-medium">
                          Alternate Mobile :
                        </span>{" "}
                        {address.alternateMobile}
                      </p>
                      <p className="!text-sm w-full">
                        <span className="!text-sm font-medium">Address :</span>{" "}
                        {`${address.flat}, ${
                          address.landmark ? address.landmark : ""
                        }, ${address.area}, ${address.city}, `}
                        {address.state}- {address.pincode}
                      </p>
                      <p className="!text-sm">
                        <span className="!text-sm font-medium">GSTIN: </span>
                        {address.gstin}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {/* Shipping Address select end */}
      </div>
      {/* Left Div end*/}

      {/* Right Div */}
      <div className="w-80 rounded-md h-screen flex flex-col gap-4 p-2 ">
        {/* Payment Summary */}
          <div className="bg-white p-4 max-w-sm rounded-sm shadow-md">
        <p className="!font-semibold !text-sm mb-2">
            Payment Summary <span className="!text-sm">(2 Items)</span>
        </p>
        <hr className="mb-2" />

        <div className="flex justify-between mb-1">
            <span className="!text-gray-800 !text-xs">Total Selling Price</span>
            <span className="!font-semibold !text-xs">₹2,268</span>
        </div>

        <div className="flex justify-between mb-1">
            <span className="!text-gray-800 !text-xs">GST Amount</span>
            <span className="!font-semibold !text-xs">+₹408</span>
        </div>

        <div className="flex justify-between mb-2">
            <span className="!text-gray-800 !text-xs">Shipping charges</span>
            <span className="!text-green-600 !text-xs !font-semibold">Free</span>
        </div>

        <hr className="my-2" />

        <div className="flex justify-between">
            <span className="!text-sm !font-bold">Amount Payable</span>
            <span className="!text-sm !font-bold">₹2,676</span>
        </div>
        </div>
        {/* Payment Summary  end*/}
        {(selectedBilling==null || selectedShipping==null) ?<button className="bg-gray-200 !text-sm text-gray-500 w-full p-2 rounded-sm shadow-md disabled" >PROCEED TO PAY</button>:<button className="bg-orange-600 !text-sm text-white w-full p-2 rounded-sm shadow-md" onClick={()=>navigate('/order/payment')}>PROCEED TO PAY</button> }             
        {(selectedBilling==null || selectedShipping==null ) &&<div className="bg-orange-100 border border-orange-300 !text-sm text-orange-600  w-full p-2 rounded-sm shadow-md">Please select a billing and shipping address</div>}               
      </div>
      {/* Right Div end*/}
    </div>
  );
}

export default Addresspage;
