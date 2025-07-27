import { useState } from "react";
import EditUserModal from "../components/EditUserModal";
import EditAddressModal from "../components/EditAddressModal";

function User() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress,seteditingAddress]=useState({})
  const [isModalOpenAddress, setIsModalOpenAddress] = useState(false);
  const [isCreateAddressModalOpen,setisCreateAddressModalOpen]=useState(false)
  
  const [user, setUser] = useState({
    name: "user",
    email: "ratradelinks2020@gmail.com",
    phone: "1234567890",
    gstin: "",
    emailVerified: true,
  });

  const [company, setCompany] = useState({
    name: "company name",
    gstin: "09ABBFR6844F1OZ",
    pan: "ABBCD1234F",
    businessType: "manufacturer",
    gstVerified: true,
    panVerified: false,
  });

  const [addresses,setAddresses]=useState([
    {
        id:1,
      name:"Mohd Atif", 
      email:'atif2511171@gmail.com', 
      type: "office",
      isShipping: false,
      isPrimary: true,
      mobile: "+91-8303331713",
      alternateMobile: "+91-9005926608",
      flat:"188/12/1, Hata Durga Prasad",
      area:"Mashagganj",
      landmark:'near Railway Line',
      addressLine:
        "C/O, Rahul Srivastava 188/12/1, Hata Durga Prasad, Mashagganj, Lucknow",
      state: "Uttar Pradesh",
      city:"Lucknow",
      pincode: "226001",
      gstin: "09ABBFR6844F1OZ",
    },
    {
        id:3,
      name:"Mohd Atif", 
      email:'atif2511171@gmail.com', 
      type: "office",
      isShipping: false,
      isPrimary: false,
      mobile: "+91-8303331713",
      alternateMobile: "+91-9005926608",
      flat:"188/12/1, Hata Durga Prasad",
      area:"Mashagganj",
      landmark:'near Railway Line',
      addressLine:
        "C/O, Rahul Srivastava 188/12/1, Hata Durga Prasad, Mashagganj, Lucknow",
      state: "Uttar Pradesh",
      city:"Lucknow",
      pincode: "226001",
      gstin: "09ABBFR6844F1OZ",
    },
    {
        id:2,
        name:"Mohd Atif", 
        email:'atif2511171@gmail.com', 
      type: "home",
      isShipping: true,
      isPrimary: false,
      mobile: "+91-9876543210",
      alternateMobile: "+91-9123456789",
      flat:'12-B, Rosewood Apartments',
      area:"Sector 62",
      landmark:'',
      addressLine:
        "C/O, Priya Mehra 12-B, Rosewood Apartments, Sector 62, Noida",
      state: "Uttar Pradesh",
      city:"Noida",
      pincode: "201309",
      gstin: "09PRYM1234F1ZX",
    },
  ])



  const handleSave = (updatedData) => {
    setUser(updatedData); // Here you can also call API to update user
  };

   const handleSaveAddress = (updatedAddress) => {

   setAddresses((addresses) =>
  addresses.map((address) => {
    if (address.id == updatedAddress.id) {
      return updatedAddress;
    } else {
      return address;
    }
  })
);




  };

const handleChangePrimary = (isShipping, Changedaddress) => {
  setAddresses(
    addresses.map((address) => {
      if (address.isShipping === isShipping) {
        return {
          ...address,
          isPrimary: address.id === Changedaddress.id,
        };
      }
      return address; // ← fix: always return the address
    })
  );
};

   const handleCreateAddress = (newAddress) => {

        setAddresses([...addresses,newAddress])
    ; // Here you can also call API to update user
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Personal Information */}
      <div className="bg-white p-3 md:p-6 rounded-lg shadow-md w-full">
        <h3 className="!text-sm md:!text-md font-semibold text-gray-800 mb-4">
          Personal Information
        </h3>

        {/* Name */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex bg-gray-100 p-2 rounded-full h-8 w-8 md:h-10 md:w-10 items-center justify-center">
            <i class="ri-user-line text-md md:text-lg !text-blue-900"></i>
          </div>
          <div>
            <p className="font-semibold !text-xs md:!text-sm">Name</p>
            <p className="text-gray-700 !text-xs md:!text-sm">{user.name}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-4 mb-4 flex-wrap">
          <div className="flex bg-gray-100 p-2 rounded-full h-8 w-8 md:h-10 md:w-10 items-center justify-center">
            <i class="ri-mail-line text-md md:text-lg !text-blue-900"></i>
          </div>
          <div className="flex flex-col ">
            <p className="font-semibold !text-xs md:!text-sm">Email</p>
            <p className="text-gray-700 !text-xs md:!text-sm break-words">
              {user.email}
            </p>
          </div>
          <VerifiedBtn/>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex bg-gray-100 p-2 rounded-full h-8 w-8 md:h-10 md:w-10 items-center justify-center">
            <i class="ri-phone-line  text-md md:text-lg !text-blue-900"></i>
          </div>
          <div>
            <p className="font-semibold !text-xs md:!text-sm">Phone</p>
            <p className="text-gray-700 !text-xs md:!text-sm">{user.phone}</p>
          </div>
        </div>

        {/* GSTIN */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex bg-gray-100 p-2 rounded-full h-8 w-8 md:h-10 md:w-10 items-center justify-center">
            <i class="ri-hashtag text-md md:text-lg !text-blue-900"></i>
          </div>
          <div>
            <p className="font-semibold !text-xs md:!text-sm ">GSTIN</p>
            <p className="text-gray-700 !text-xs md:!text-sm">{user.gstin}</p>
          </div>
        </div>

        {/* Edit Button */}
        <button
          className="border border-orange-500 text-orange-500 p-1 px-4 md:px-4 md:py-1 rounded-sm !text-xs md:!text-sm hover:bg-orange-50"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Edit
        </button>
      </div>

      <EditUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={user}
        onSave={handleSave}
      />

      {/* Personal Information end */}

      {/* Company Profile */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <h3 className="font-semibold !text-sm md:!text-md text-gray-800 mb-4">Company Profile</h3>

        {/* Name */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex bg-gray-100 p-2 rounded-full h-8 w-8 md:h-10 md:w-10 items-center justify-center">
            <i class="ri-user-line text-md md:text-lg !text-blue-900"></i>
          </div>
          <div>
            <p className="font-semibold !text-xs md:!text-sm">Company Name</p>
            <p className="text-gray-700 !text-xs md:!text-sm">{company.name}</p>
          </div>
        </div>

        {/* GSTIN */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex bg-gray-100 p-2 rounded-full h-8 w-8 md:h-10 md:w-10 items-center justify-center">
            <i class="ri-hashtag text-md md:text-lg !text-blue-900"></i>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold !text-xs md:!text-sm">GSTIN</p>
            <p className="text-gray-700 !text-xs md:!text-sm break-words">
              {company.gstin}
            </p>
          </div>
          <VerifiedBtn IsVerified={company.gstVerified} />
        </div>

        {/* Pan */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex bg-gray-100 p-2 rounded-full h-8 w-8 md:h-10 md:w-10 items-center justify-center">
            <i class="ri-hashtag text-md md:text-lg !text-blue-900"></i>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold !text-xs md:!text-sm">PAN</p>
            <p className="text-gray-700 !text-xs md:!text-sm break-words">{company.pan}</p>
          </div>
          <VerifiedBtn IsVerified={company.panVerified} />
        </div>

        {/* Business Type */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex bg-gray-100 p-2 rounded-full h-8 w-8 md:h-10 md:w-10 items-center justify-center">
            <i class="ri-shake-hands-line text-md md:text-lg !text-blue-900"></i>
          </div>
          <div>
            <p className="font-semibold !text-xs md:!text-sm">Business Type</p>
            <p className="text-gray-700 !text-xs md:!text-sm">{company.businessType}</p>
          </div>
        </div>
      </div>

      {/* Company Profile end */}

      {/* Address Edit Modal */}
      <EditAddressModal
        isOpen={isModalOpenAddress}
        onClose={() => setIsModalOpenAddress(false)}
        initialData={editingAddress}
        onSave={handleSaveAddress}
      />

      <EditAddressModal
        isOpen={isCreateAddressModalOpen}
        onClose={() => setisCreateAddressModalOpen(false)}
        initialData={editingAddress}
        onSave={handleCreateAddress}
      />

      {/* Addresses */}
      <div className="flex flex-col bg-white p-6 rounded-lg shadow-md w-full">
        <h3 className="!text-sm md:!text-md font-semibold text-gray-800 mb-4">Address Book</h3>

        {/* Billing Address */}

        <div className="flex flex-col gap-4 mb-6">
          <p className=" !text-sm font-semibold !text-gray-800 mb-1">
            Billing Addresses
          </p>
          <div className="flex flex-col md:flex-row flex-wrap gap-4">
            
            {addresses
              .filter((address) => !address.isShipping)
              .map((address) => {
                return (
                  <div className="bg-white p-3 md:p-4 md:px-8 rounded shadow-md md:w-2/5 border border-gray-200">

                   
                   
                   
                    <div className="flex items-center justify-between mb-2">
                      {address.isPrimary ? (
                        <span className="bg-green-600 !text-white !text-[10px] md:!text-xs px-2 py-1 rounded font-medium">
                          Primary Address
                        </span>
                      ) : (
                        <button className="bg-white !text-green-600 border border-green-600 !text-[10px] md:!text-xs px-2 py-1 rounded font-medium cursor-pointer" onClick={()=>{handleChangePrimary(false,address)}}>Make Primary</button>
                      )}
                      <div className="flex items-center gap-2">
                        <button className="text-red-500 hover:text-red-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                        <button className="border border-orange-500 text-orange-500 !text-[10px] md:!text-xs px-3 py-1 rounded hover:bg-orange-50 font-medium" onClick={()=>{seteditingAddress(address); setIsModalOpenAddress(true)}}>
                          Edit
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 text-sm text-gray-800 leading-relaxed w-full">
                      <p className="!text-xs md:!text-sm font-semibold">{address.name} - [{address.type}]</p>
                      <p className="!text-xs md:!text-sm">
                        <span className="!text-xs md:!text-sm font-medium">Mobile :</span>{" "}
                        {address.mobile}
                      </p>
                      <p className="!text-xs md:!text-sm">
                        <span className="!text-xs md:!text-sm font-medium">
                          Alternate Mobile :
                        </span>{" "}
                        {address.alternateMobile}
                      </p>
                      <p className="!text-xs md:!text-sm w-full">
                        <span className="!text-xs md:!text-sm font-medium">
                          Address :
                        </span>{" "}
                        
                        
                        {`${address.flat}, ${address.landmark?address.landmark:""}, ${address.area}, ${address.city}, `}
                        {address.state}- {address.pincode}
                      </p>
                      <p className="!text-xs md:!text-sm">
                        <span className="!text-xs md:!text-sm font-medium">GSTIN: </span>
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
                  isShipping: false,
                });
                setisCreateAddressModalOpen(true);
              }}
            >
              <i class="ri-add-large-line"></i>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="flex flex-col gap-4">
          <p className=" !text-sm font-semibold !text-gray-800 mb-4">
            Shipping Addresses
          </p>
          <div className="flex flex-col md:flex-row flex-wrap gap-4">
            {addresses
              .filter((address) => address.isShipping)
              .map((address) => {
                return (
                  <div className="bg-white p-3 md:p-4 md:px-8 rounded shadow-md md:w-2/5 border border-gray-200">
                    
                    
                    
                    <div className="flex items-center justify-between mb-2">
                      {address.isPrimary ? (
                        <span className="bg-green-600 !text-white !text-xs px-2 py-1 rounded font-medium">
                          Primary Address
                        </span>
                      ) : (
                        <span
                          className="bg-white !text-green-600 border border-green-600 !text-xs px-2 py-1 rounded font-medium cursor-pointer"
                          onClick={() => handleChangePrimary(true, address)}
                        >
                          Make Primary
                        </span>
                      )}
                      <div className="flex items-center gap-2">
                        <button className="text-red-500 hover:text-red-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                        <button
                          className="border border-orange-500 text-orange-500 text-xs px-3 py-1 rounded hover:bg-orange-50 font-medium cursor-pointer"
                          onClick={() => {
                            seteditingAddress(address);
                            setIsModalOpenAddress(true);
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 text-sm text-gray-800 leading-relaxed w-full">
                      <p className="!text-xs md:!text-sm font-semibold">{address.name} - [{address.type}]</p>
                      <p className="!text-xs md:!text-sm">
                        <span className="!text-xs md:!text-sm font-medium">Mobile :</span>{" "}
                        {address.mobile}
                      </p>
                      <p className="!text-xs md:!text-sm">
                        <span className="!text-xs md:!text-sm font-medium">
                          Alternate Mobile :
                        </span>{" "}
                        {address.alternateMobile}
                      </p>
                      <p className="!text-xs md:!text-sm w-full">
                        <span className="!text-xs md:!text-sm font-medium">
                          Address :
                        </span>{" "}
                        
                        {`${address.flat}, ${address.landmark?address.landmark:""}, ${address.area}, ${address.city}, `}
                        {address.state}- {address.pincode}
                      </p>
                      <p className="!text-xs md:!text-sm">
                        <span className="!text-xs md:!text-sm font-medium">GSTIN: </span>
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
        {/* Shipping Address end */}
      </div>
      {/* Addresses end */}
    </div>
  );
}

export default User;

function VerifiedBtn({IsVerified,handleVerify}){
return <div className="flex flex-row gap-1 md:gap-2 flex-nowrap items-center !text-green-700 !text-green-700 bg-green-2- !text-[10px] md:!text-xs md:ml-4 border rounded-4xl border-green-700 md:py-1 md:px-2 px-2 py-1">
            <span className="!text-green-700 !text-[10px] md:!text-xs !text-semibold">{IsVerified?"Verified":"Verify Now"}</span>
            {IsVerified && <i class="ri-verified-badge-line text-xs md:text-sm text-green-700"></i>}
          </div>
}
