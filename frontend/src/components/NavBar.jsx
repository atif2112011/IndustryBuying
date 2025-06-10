import { Button } from '@mui/material';
import SearchBar from './SearchBar';
import logo from '../assets/react.svg';
import img1 from '../assets/icons/file-text-line.svg';
import img2 from '../assets/icons/survey-line.svg';
import img3 from '../assets/icons/customer-service-2-line.svg';
import img4 from '../assets/icons/shopping-cart-2-line.svg';
import MainBody from './MainBody';
import { Outlet } from 'react-router-dom';

function NavBar() {
  return (
    <div className="flex flex-col bg-neutral-100 h-screen ">

    {/* NavBar Component */}
    {/* This component contains the logo, search bar, and other buttons like login, request for quote, etc. */}
    <div className="flex flex-row items-center justify-between gap-4 py-2 px-6 bg-white shadow-md">
       {/* Logo and Search Bar */}
       <div className='flex flex-row gap-8 '> 
        
        <div className='flex items-center gap-2'>
        <img src={logo} alt="Logo" height={28} width={28}/>
        <h3 className='poppins-semibold'>Industry Buying</h3>
        </div>
        <SearchBar/>
       </div>
       {/* Logo and Search Bar */}
        
        {/* Login and other buttons */}
        <div className='flex flex-row items-center gap-8'>
            <button className='flex items-center gap-2'>
       <img src={img1} alt="Request for Quote" height={22} width={22 }/>
        <p>Request for Quote</p>
        </button>
        
        <button className='flex items-center gap-2'>
            <img src={img2} alt="GST Benefit" height={22} width={22}/>
        <p>GST Benefit</p>
        </button>
        
        <button className='flex items-center gap-2'>

        <img src={img3} alt="Help Center" height={22} width={22}/>
        <p>Help Center</p>
        </button>
        <Button variant='contained' className='h-8 items-center'>Login</Button>
        <button><img src={img4} alt="Cart" height={22} width={22}/></button>
        </div>
        {/* Login and other buttons */}
        
    </div>
    {/* NavBar Component Ends */}


    {/* Main Body Component */}
    {/* This component will contain the main content of the application, such as product listings, categories, etc. */}
    {/* <MainBody/> */} 
    <Outlet/>
    {/* Main Body Component Ends*/}


    </div>
  );
}
export default NavBar;