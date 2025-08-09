import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import logo from "../assets/react.svg";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { VerifyUser } from "../apis/auth";
import { getUser } from "../apis/user";
import { useAlert } from "../contexts/AlertContext";

import { useAuth } from "../contexts/AuthContext";
import { useLoader } from "../contexts/LoaderContext";
import { getCart } from "../apis/cart";

function NavBar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const { setShowSnackBar, setMessage } = useAlert();
   const {setLoading}=useLoader();
   const { user, setUser,cart,setCart,cartCount,setCartCount }=useAuth();
   const [searchTerm, setSearchTerm] = useState("");
 
  

   useEffect(()=>{
    const fetchCart=async()=>{
      const response=await getCart();
      // console.log(`response of getCart`,response);
      if(response.success)
      {
        setCart(response.cart);
        setCartCount(response.totalItems);
      }

    }
    if(user!==null)
    {
      console.log("User in fetchCart",user);
      fetchCart();
    }
     
   },[user])
 


  useEffect(()=>{
    //Check user is logged in or not
    const checkUser = async () => {
      try {
        setLoading(true);
        const response = await VerifyUser();
        if (response?.success) {
          
          const getUserResponse=await getUser(response.userId);
          if(getUserResponse?.success)
          {
            setUser(getUserResponse.user);
            setLoading(false);
            setMessage("Welcome"+" "+getUserResponse.user.name);
            setShowSnackBar(true);
            // console.log("User Retrieved", getUserResponse?.user);
          }
          else
          {
            setLoading(false);
            throw new Error(getUserResponse?.message || getUserResponse);
          }


        } 
      } catch (error) {
        setLoading(false);
        
        console.error(error?.message || error);
      }
    };
    checkUser();
    setLoading(false);
   
  },[])

  const handleSearch = () => {
    if(searchTerm===""){
      setMessage("Search term cant be empty !");
      setShowSnackBar(true);
    }
    else if(searchTerm.length<3){
      setMessage("Search term must be at least 3 characters long !");
      setShowSnackBar(true);
    }
    else
    navigate(`/search/?q=${searchTerm}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2 px-4 md:px-6 bg-white shadow-md relative transition-all duration-300 ease-in-out">
        {/* Logo + Cart + Hamburger on Mobile */}
        <div className="flex flex-row w-full md:w-auto justify-between items-center md:px-14">
          <div className="flex items-center gap-2 pt-2">
            {/* <img src={logo} alt="Logo" height={28} width={28} /> */}
            <h3
              className="!text-xl md:!text-3xl !font-[700] !tracking-wider !cursor-pointer !text-[#1447e6] hover:!text-blue-600 transition-colors duration-200 logo-font"
              onClick={() => navigate("/")}
            >
              MedAgg.com
            </h3> 
          </div>

          {/* Cart + Hamburger for mobile */}
          <div className="flex items-center gap-4 md:hidden">
            <button onClick={() => navigate("/order/cart")}>
              <i className="ri-shopping-cart-2-line text-xl"></i>
            </button>
            <button
              className="text-2xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i
                className={`ri-${mobileMenuOpen ? "close-line" : "menu-line"}`}
              ></i>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-[28rem] mt-2 md:mt-0 !font-medium">
          <SearchBar placeholder="Search by ProductID, Name or Description" searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch}/>
        </div>

        {/* Navigation Menu */}
        <div
          className={`flex-col md:flex md:flex-row md:items-center gap-6 md:gap-8 absolute md:static top-full left-0 w-full md:w-auto bg-white px-4 py-4 md:p-0 z-20 shadow-md md:shadow-none transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "flex opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none md:opacity-100 md:translate-y-0 md:pointer-events-auto"
          }`}
        >
          <button
            className="flex items-center gap-2"
            onClick={() => navigate("/cert")}
          >
            <i className="ri-file-text-line text-lg" />
            <p className="!text-sm !font-medium">Certifications</p>
          </button>

          <button
            className="flex items-center gap-2"
            onClick={() => navigate("/gst")}
          >
            <i className="ri-survey-line text-lg" />
            <p className="!text-sm !font-medium">GST Benefit</p>
          </button>

          <button
            className="flex items-center gap-2"
            onClick={() => navigate("/help")}
          >
            <i className="ri-customer-service-2-line text-lg" />
            <p className="!text-sm !font-medium">Help Center</p>
          </button>

          {!user && <button
            className="bg-blue-700 !text-sm text-white px-6 py-2 rounded-sm shadow hover:bg-blue-800"
            onClick={() => navigate("/user/login")}
          >
            Login
          </button>}
          {user && <button
            className="bg-blue-700 !text-sm text-white px-6 py-2 rounded-sm shadow hover:bg-blue-800"
            onClick={() => {navigate("/user") ,setMobileMenuOpen(false)}}
          >
            Profile
          </button>}

          {user && user.role=="admin" && <button
            className="bg-blue-700 !text-sm text-white px-6 py-2 rounded-sm shadow hover:bg-blue-800"
            onClick={() => {navigate("/admin") ,setMobileMenuOpen(false)}}
          >
            Admin Panel
          </button>}

          {/* Cart button for desktop only */}
          <button
            onClick={() => navigate("/order/cart")}
            className="hidden md:block relative"
          >
            <i className="ri-shopping-cart-2-line text-xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center !text-[10px]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <Outlet />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default NavBar;
