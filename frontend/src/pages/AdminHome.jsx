import React, { useState } from "react";
import Home from "./Admin/Home";
import Order from "./Admin/Order";
import Products from "./Admin/Products";

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
      label: "Users",
      component: <div>Users</div>,
      link: "/users",
    },
     {
      label: "Content",
      component: <div>Content</div>,
      link: "/content",
    },
  ];
  
  

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
