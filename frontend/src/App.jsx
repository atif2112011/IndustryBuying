import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@mui/material";
import NavBar from "./components/NavBar.jsx";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import MainBody from "./components/MainBody.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import CategoryPage from "./pages/Categorypage.jsx";
import SubCategoryPage from "./pages/SubCategorypage.jsx";
import Productpage from "./pages/Productpage.jsx";
import Cartpage from "./pages/Cartpage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import User from "./pages/User.jsx";
import OrderandBilling from "./pages/OrderandBilling.jsx";
import OrderLayout from "./components/OrderLayout.jsx";
import Addresspage from "./pages/Addresspage.jsx";
import Paymentpage from "./pages/Paymentpage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Certification from "./pages/Certification.jsx";
import GST from "./pages/GST.jsx";
import HelpCenter from "./pages/HelpCenter.jsx";
import HelpMainBody from "./components/HelpMainBody.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          {/* Nested routes inside MainBody */}
          <Route element={<MainBody />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/categories" element={<LandingPage />} />
            <Route path="/categories/:categoryId" element={<CategoryPage />} />
            <Route
              path="/categories/:categoryId/:subcategoryId"
              element={<SubCategoryPage />}
            />
            <Route
              path="/categories/:categoryId/:subcategoryId/:productId"
              element={<Productpage />}
            />
            <Route path="/user" element={<User />} />
            <Route
              path="/user/order-and-billing"
              element={<OrderandBilling />}
            />

            <Route path="*" element={<div>404 Not Found</div>} />
          </Route>

          {/* Order Routes */}
          <Route path="/order" element={<OrderLayout />}>
          <Route path="/order/cart" element={<Cartpage />} />
          <Route path="/order/address" element={<Addresspage />} />
          <Route path="/order/payment" element={<Paymentpage />} />

          
          </Route>

          {/* Utility */}
          <Route path="/aboutus" element={<AboutUs />}></Route>
          <Route path="/cert" element={<Certification />}></Route>
          <Route path="/gst" element={<GST />}></Route>
          <Route path="/help" element={<HelpCenter />}>
          <Route path="/help/:helpid" element={<HelpMainBody />}/>

          
          
          </Route>
        </Route>

        <Route path="/user/login" element={<Login />}></Route>
        <Route path="/user/register" element={<Register />}></Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
