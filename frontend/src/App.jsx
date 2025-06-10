import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Button} from '@mui/material'
import NavBar from './components/NavBar.jsx'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import About from './pages/LandingPage.jsx'
import OfficeSupplies from './pages/Categories/OfficeSupplies.jsx'
import MainBody from './components/MainBody.jsx'
import LandingPage from './pages/LandingPage.jsx'
function App() {

  return (
   <BrowserRouter>
   <Routes>
     <Route path="/" element={<NavBar />}>
      {/* Nested routes inside MainBody */}
          <Route element={<MainBody />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="categories/office-supplies" element={<OfficeSupplies />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Route>
     
     </Route>
      
          
   </Routes>
   </BrowserRouter>
  )
}

export default App
