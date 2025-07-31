import React, { useEffect, useState } from "react";
import Home from "./Admin/Home";
import Order from "./Admin/Order";
import Products from "./Admin/Products";
import Category from "./Admin/Category";
import User from "./Admin/User";
import ContentTab from "./Admin/Content";
import { useLoader } from "../contexts/LoaderContext";
import { useAlert } from "../contexts/AlertContext";
import { VerifyUser } from "../apis/auth";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUser } from "../apis/user";

const AdminHome = () => {


  const [selectedCategory, setSelectedCategory] = useState({
      label: "Home",
      component: <Home />,
      link: "/",
    });

  const categories = [
    {
      label: "Home",
      component: <Home />,
      link: "/",
    },
    {
      label: "Orders",
      component:<Order />,
      link: "/orders",
    },
    {
      label: "Products",
      component: <Products/>,
      link: "/products",
    },
    {
      label: "Category",
      component: <Category/>,
      link: "/categories",
    },
    {
      label: "Users",
      component: <User/>,
      link: "/users",
    },
     {
      label: "Content",
      component: <ContentTab/>,
      link: "/content",
    },
  ];
  const {setLoading}=useLoader();
  const {setMessage,setShowSnackBar}=useAlert();
  const {user,setUser}=useAuth();
  const navigate=useNavigate();

    useEffect(()=>{
      //Check user is logged in or not
      const checkUser = async () => {
        try {
          setLoading(true);
          const response = await VerifyUser();
          if (response?.success) {

            if(response.role!=="admin")
            {
              setLoading(false);
              setMessage("You are not admin");
              setShowSnackBar(true);
              navigate("/user/login");
              throw new Error("No admin access found");
            }
            
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
    <div className="flex flex-col min-h-screen text-gray-200 p-10">
      {/* Header */}
      <header className="flex flex-row justify-between gap-10 mb-16">
        <h1 className="text-2xl font-semibold text-white">Admin Dashboard</h1>

        <div className="flex flex-row justify-evenly items-center gap-14">
          {categories &&
            categories.map((category, index) => (
              <p
                key={index}
                className={`text-xs md:text-sm  cursor-pointer font-medium hover:!text-blue-600 transition duration-300 hover:scale-110 ${
                  selectedCategory.label === category.label
                    ? "!text-blue-600"
                    : "text-gray-400"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.label}
              </p>
            ))}
        </div>
      </header>

      {/* PAge Content */}
      <div className="flex flex-col">
        {selectedCategory && selectedCategory.component}
      </div>
    </div>
  );
};

export default AdminHome;
