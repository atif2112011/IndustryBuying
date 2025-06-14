import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import sampleImage from '../assets/images/productImages/product2.jpg'
import { TableFooter, TablePagination } from '@mui/material';
import React, { useState } from 'react';
import CardDisplay from '../components/CardDisplay';
import { useNavigate } from 'react-router-dom';
const data = [
  {
    id: 1,
    name: "BONEX Eco 1.5 sq.mm 1 Core Flame Retardant House Wires Blue",
    description: "Roll of 90 m",
    image: "https://example.com/images/bonex-wire.jpg", // replace with actual image URL
    originalPrice: 2360,
    discountedPrice: 1651,
    quantity: 1,
    codEligible: false,
  },
  {
    id: 2,
    name: "Polycab 2.5 sq.mm Flame Retardant House Wire Red",
    description: "Roll of 90 m",
    image: "https://example.com/images/polycab-red.jpg",
    originalPrice: 2450,
    discountedPrice: 1799,
    quantity: 2,
    codEligible: true,
  },
  {
    id: 3,
    name: "Finolex 4 sq.mm Single Core Copper Wire Green",
    description: "Roll of 90 m",
    image: "https://example.com/images/finolex-green.jpg",
    originalPrice: 3650,
    discountedPrice: 2890,
    quantity: 1,
    codEligible: false,
  },
];
const dummydata2 = [
  {
    title: "Logitech Wireless Mouse M235",
    brand: "Logitech",
    price: 799,
    image: "https://m.media-amazon.com/images/I/61LtuGzXeaL._SX679_.jpg",
    rating: 4.2,
  },
  {
    title: "HP Wired USB Keyboard K1500",
    brand: "HP",
    price: 499,
    image: "https://m.media-amazon.com/images/I/81IbI6vO7GL._SX679_.jpg",
    rating: 3.8,
  },
  {
    title: "Samsung 64GB EVO microSD Card",
    brand: "Samsung",
    price: 699,
    image: "https://m.media-amazon.com/images/I/71wG2k-eY-L._SX679_.jpg",
    rating: 4.6,
  },
  {
    title: "Sony MDR-ZX110A Wired Headphones",
    brand: "Sony",
    price: 1099,
    image: "https://m.media-amazon.com/images/I/71m3VdyxvLL._SX679_.jpg",
    rating: 4.0,
  },
  {
    title: "TP-Link WiFi Router TL-WR841N",
    brand: "TP-Link",
    price: 1199,
    image: "https://m.media-amazon.com/images/I/61LtuGzXeaL._SX679_.jpg",
    rating: 4.1,
  },
  {
    title: "Zebronics Zeb-Rush Gaming Keyboard",
    brand: "Zebronics",
    price: 849,
    image: "https://m.media-amazon.com/images/I/51KeYwBBTkL._SX679_.jpg",
    rating: 3.9,
  },
  {
    title: "boAt Bassheads 100 Wired Earphones",
    brand: "boAt",
    price: 449,
    image: "https://m.media-amazon.com/images/I/61+Q6Rh3OQL._SX679_.jpg",
    rating: 4.3,
  },
  {
    title: "Dell 15.6 Inch Laptop Backpack",
    brand: "Dell",
    price: 999,
    image: "https://m.media-amazon.com/images/I/61Q93pD-ZnL._SX679_.jpg",
    rating: 4.5,
  }
];

const dummydata1 = [
  {
    title: "Duracell AAA Batteries (Pack of 10)",
    brand: "Duracell",
    price: 179,
    rating:3.5,
    discountedPrice: 149,
    discountPercentage: 16.00,
    image: "https://m.media-amazon.com/images/I/81o1qXrjRLL._SX679_.jpg",
  },
  {
    title: "WD-40 Multipurpose Spray 420ml",
    brand: "WD-40",
    price: 353,
    rating: 4.0,
    discountedPrice: 299,
    discountPercentage: 15.30,
    image: "https://m.media-amazon.com/images/I/61v51tdU2RL._SX679_.jpg",
  },
  {
    title: "Box Index Files (Pack of 8)",
    brand: "IB BASICS",
    discountedPrice: 399,
    discountPercentage: 9.10,
    rating: 4.2,
    price: 439,
    image: "https://m.media-amazon.com/images/I/81My9owuZuL._SX679_.jpg",
  },
  {
    title: "Generic 12A Black Cartridge",
    brand: "GENERIC",
    price: 339,
    image: "https://m.media-amazon.com/images/I/71Z3-+a3bpL._SX679_.jpg",
  },
  {
    title: "Cello Ball Pens (Pack of 25)",
    brand: "GENERIC",
    price: 99,
    image: "https://m.media-amazon.com/images/I/61-vv9kdzpL._SX679_.jpg",
  },
];

function Cartpage(){


    const navigate=useNavigate();
      const [cartPage, setcartPage] = useState(0);
      const [rowsPerPage, setrowsPerPage] = useState(5);
      const [checkPin,setcheckPin]=useState({data:{pincode:211016,city:'Allahabad',shippingCharge:0,deliveryDate:"Tue Jul 22 2025"},visible:false});
         
      
      const handleChangePage = (event, newPage) => {
    setcartPage(newPage);
     };

     
    return(
        <div className="flex flex-row p-6 gap-2 h-screen ">
            {/* Left Div */}
            <div className=" flex flex-col gap-4 p-2 w-3/4 overflow-y-auto hide-scroll">
                <p className="!text-sm !text-gray-500 font-semibold">My Cart(2 items)</p> 
                {/* Cart Table */}
                <div className='flex w-full'>
                    <TableContainer component={Paper} sx={{ 
                        backgroundColor:"#f5f5f5",
                        boxShadow: 'none' ,border:'none',  }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                       
                        <TableBody>
                        {data.slice(cartPage * rowsPerPage, cartPage * rowsPerPage + rowsPerPage).map((item) => (
                            <TableRow
                            key={item.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 },
                            backgroundColor:"#f5f5f5",
                            boxShadow: 'none' ,border:'none',  }}
                            >
                            <TableCell align="left" sx={{
                                backgroundColor:"#f5f5f5",
                                boxShadow: 'none' ,border:'none',padding:'8px'}}>
                                    <div className="flex  items-center justify-between bg-white p-4 rounded-md shadow-sm">
                                    

                                    {/* Product Info */}
                                    <div className="flex gap-4 lg:w-1/2 ">
                                        <img
                                        src={sampleImage} // replace with actual image URL
                                        alt={item.name}
                                        className="w-20 h-20 object-contain"
                                        />
                                        <div>
                                        <h2 className="font-semibold !text-sm">
                                            {item.name} <br />
                                            <span className=" !text-sm font-normal">(Roll of 90 m)</span>
                                        </h2>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="line-through text-gray-400 !text-sm">₹{item.originalPrice}</span>
                                            <span className="font-bold !text-md">₹{item.discountedPrice}</span>
                                        </div>
                                        {item.codEligible?null:<p className="!text-orange-500 border border-red-300 !bg-orange-50 !text-xs px-2 py-1 rounded mt-2 inline-block">
                                            This item is not eligible for Cash On Delivery.
                                        </p>}
                                        </div>
                                    </div>

                                    {/* Quantity and Price */}
                                    {/* <div className="flex flex-col items-end gap-2"> */}
                                        <div className="flex items-center rounded bg-gray-100 p-1">
                                        <button className="px-2 text-xl text-gray-600 bg-white">−</button>
                                        <span className="px-3 py-1 !text-sm">{item.quantity}</span>
                                        <button className="px-2 text-xl text-gray-600 bg-white">+</button>
                                        </div>
                                        <div className="text-right">
                                        <div className="text-lg font-bold">₹1,651</div>
                                        <button className="relative group !text-xs text-gray-500 underline">
                                            Price Details
                                                <div className="absolute left-0 top-4 w-40 bg-white p-2 rounded border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                                <div className="flex justify-between  text-gray-700 mb-2">
                                                    <span className='!text-xs'>Selling Price</span>
                                                    <span className='!text-xs'>₹1,399</span>
                                                </div>
                                                <div className="flex justify-between text-gray-700 mb-2">
                                                    <span className='!text-xs'>GST@ 18%</span>
                                                    <span className='!text-xs'>+₹252</span>
                                                </div>
                                                <hr className="my-2 text-gray-400" />
                                                <div className="flex justify-between font-semibold text-green-700">
                                                    <span className='!text-xs'>Final Price</span>
                                                    <span className='!text-xs'>₹1,651</span>
                                                </div>
                                                </div>
                                            </button>
                                        </div>
                                    {/* </div> */}

                                    {/* Close Button */}
                                    <button className="text-gray-400 hover:text-red-500 text-lg">
                                       <i class="ri-delete-bin-line text-gray-500"></i>
                                    </button>
                                    </div>

                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={cartPage}
                                onPageChange={handleChangePage}
                                rowsPerPageOptions={[]} 
                                labelRowsPerPage={''}  
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                    </TableContainer>
                    </div>
                {/* Cart Table ends */}

                {/* {Recommended for you} */}
      
                   <CardDisplay title="RECOMMENDED FOR YOU" data={dummydata2}/>
                {/* {Recommended for you end} */}

                {/* {BEST SELLERS} */}
                <CardDisplay title="BEST SELLERS" data={dummydata1}/>
                {/* {BEST SELLERS end} */}
                    
        </div>
        {/* Left Div ends */}

        {/* Right Div */}
        <div className="w-80 rounded-md h-screen flex flex-col gap-4 p-2">
           
           {/* {Check Shipping Charge} */}
          <div className="flex flex-col gap-2 bg-white rounded-md shadow-md p-4">
            <span className="!text-sm font-semibold"><i class="ri-map-pin-line mr-1"></i> Estimated Shipping Charges</span>

              <div className="flex flex-row">
                
              </div>

            <div className="flex flex-row border border-gray-300 p-1 rounded-sm justify-between w-full">
              <input className="text-gray-500 !text-sm border-none w-full p-2" type="text" placeholder="Enter Pincode">
              </input>
              <button className="bg-orange-600 !text-sm text-white py-2 px-4 rounded-sm" onClick={()=>setcheckPin({...checkPin,visible:true})}>Check</button>
            </div>
              {checkPin.visible &&<p className='!text-sm !text-gray-500'>Shipping Charges may Apply</p>}          

            

            



          </div>
          {/* {Check Shipping Charge end} */}

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
         <button className="bg-orange-600 !text-sm text-white w-full p-2 rounded-sm shadow-md" onClick={()=>navigate('/login')}>LOGIN TO PLACE ORDER</button>               
        </div>
        {/* Right Div ends */}
        </div>
    )
}

export default Cartpage