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

function NavBar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const { setShowSnackBar, setMessage } = useAlert();
   const {setLoading}=useLoader();
   const { user, setUser }=useAuth();
 


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
            console.log("User Retrieved", getUserResponse?.user);
          }
          else
          {
            throw new Error(getUserResponse?.message || getUserResponse);
          }

        } else {
          setLoading(false);
          setMessage("Session Expired!! Login Again");
          setShowSnackBar(true);
          navigate("/user/login");
         throw new Error(response?.message || response);
        }
      } catch (error) {
        setLoading(false);
        
        console.error(error?.message || error);
      }
    };
    checkUser();
   
  },[])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2 px-4 md:px-6 bg-white shadow-md relative transition-all duration-300 ease-in-out">
        {/* Logo + Cart + Hamburger on Mobile */}
        <div className="flex flex-row w-full md:w-auto justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" height={28} width={28} />
            <h3
              className="!text-xl !font-semibold !tracking-wide !cursor-pointer hover:!text-blue-700 transition-colors duration-200"
              onClick={() => navigate("/")}
            >
              Industry Buying
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
          <SearchBar placeholder="Search by ProductID, Name or Description" />
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

          {/* Cart button for desktop only */}
          <button
            onClick={() => navigate("/order/cart")}
            className="hidden md:block"
          >
            <i className="ri-shopping-cart-2-line text-xl"></i>
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
