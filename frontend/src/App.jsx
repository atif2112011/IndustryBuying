import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Button} from '@mui/material'
import NavBar from './components/NavBar.jsx'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import OfficeSupplies from './pages/Categories/OfficeSupplies.jsx'
import MainBody from './components/MainBody.jsx'
import LandingPage from './pages/LandingPage.jsx'
import CategoryPage from './pages/Categorypage.jsx'
import SubCategoryPage from './pages/SubCategorypage.jsx'
import Productpage from './pages/Productpage.jsx'
import Cartpage from './pages/Cartpage.jsx'
function App() {

  return (
   <BrowserRouter>
   <Routes>
     <Route path="/" element={<NavBar />}>
     <Route path="/order/cart" element={<Cartpage/>}/>
      {/* Nested routes inside MainBody */}
          <Route element={<MainBody />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/categories" element={<LandingPage />} />
            <Route path="/categories/:categoryId" element={<CategoryPage />} />
            <Route path="/categories/:categoryId/:subcategoryId" element={<SubCategoryPage />} />
            <Route path="/categories/:categoryId/:subcategoryId/:productId" element={<Productpage />} />

            
            <Route path="*" element={<div>404 Not Found</div>} />
          </Route>
     
     </Route>
      
          
   </Routes>
   </BrowserRouter>
  )
}

export default App
