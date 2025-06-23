import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import sampleImage from '../assets/images/productImages/product2.jpg'
import { TableFooter, TablePagination } from '@mui/material';
import SearchBar from "../components/SearchBar";
import TrackingStepper from "../components/TrackingStepper";

function OrderandBilling() {
  const [date, setDate] = useState(null);
  const [status, setStatus] = useState("");
    const orders = [
  {
    orderId: '109545797',
    orderDate: '25 Jan 2021',
    amount: 32427,
    productImage: 'https://via.placeholder.com/100',
    productName: 'Vittico Otoscope Deluxe With 2.5V Vacuum Bulb',
    quantity: 11,
    discount: 107.11,
    status: 'Delivered',
    deliveryDate: 'Tue Feb 09 2021',
  },
  {
    orderId: '209332118',
    orderDate: '12 Mar 2021',
    amount: 15499,
    productImage: 'https://via.placeholder.com/100',
    productName: 'Omron Digital Blood Pressure Monitor HEM-7120',
    quantity: 2,
    discount: 59.99,
    status: 'Delivered',
    deliveryDate: 'Fri Mar 19 2021',
  },
  {
    orderId: '318884231',
    orderDate: '04 Jul 2021',
    amount: 6999,
    productImage: 'https://via.placeholder.com/100',
    productName: 'Dr. Trust Pulse Oximeter Fingertip',
    quantity: 5,
    discount: 29.99,
    status: 'Delivered',
    deliveryDate: 'Wed Jul 14 2021',
  },
  {
    orderId: '442210987',
    orderDate: '18 Oct 2021',
    amount: 899,
    productImage: 'https://via.placeholder.com/100',
    productName: 'Face Shield Transparent Safety Mask Pack of 10',
    quantity: 10,
    discount: 10.0,
    status: 'Delivered',
    deliveryDate: 'Mon Oct 25 2021',
  },
  {
    orderId: '567112300',
    orderDate: '02 Jan 2022',
    amount: 11999,
    productImage: 'https://via.placeholder.com/100',
    productName: 'Beurer Infrared Thermometer FT65',
    quantity: 3,
    discount: 75.55,
    status: 'Delivered',
    deliveryDate: 'Sun Jan 09 2022',
  },
];

const invoices = [
  { orderId: '12432', date: '10 May 2025' },
  { orderId: '12410', date: '03 May 2025' },
  { orderId: '12398', date: '27 Apr 2025' },
  { orderId: '12375', date: '20 Apr 2025' },
  { orderId: '12344', date: '13 Apr 2025' },
];

    const [orderpage, setorderpage] = useState(0);
    const [invoicepage, setinvoicepage] = useState(0);
    const [rowsPerPage, setrowsPerPage] = useState(5);
    
             
          
    const handleChangePage = (event, newPage) => {
    setorderpage(newPage);
    };
    const handleinvoiceChangePage = (event, newPage) => {
    setorderpage(newPage);
    };


  return (
    <div className="flex flex-col gap-4">
      {/* My Orders */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <h3 className="font-semibold text-gray-800 mb-4">My Orders</h3>

        {/* Sort and Search Inputs */}
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Sort by date"
                slotProps={{
                  textField: {
                    size: "small", // Reduces overall field height
                    // sx: { fontSize: '12px' }, // Reduces input text size
                    // InputLabelProps: { sx: { fontSize: '12px' } } // Reduces label size
                  },
                }}
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
            </LocalizationProvider>

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel
                id="demo-simple-select-label"
                // sx={{ fontSize: '0.75rem' }} // Label font size
              >
                Filter by Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Filter by Status"
                onChange={(e) => setStatus(e.target.value)}
                size="small"
                // sx={{ fontSize: '0.8rem' }} // Dropdown font size
              >
                <MenuItem value={"processing"}>Processing</MenuItem>
                <MenuItem value={"confirmed"}>Confirmed</MenuItem>
                <MenuItem value={"packed"}>Packed</MenuItem>
                <MenuItem value={"shipped"}>Shipped</MenuItem>
                <MenuItem value={"delivered"}>Delivered</MenuItem>
                <MenuItem value={"cancelled"}>Cancelled</MenuItem>
                <MenuItem value={"returned"}>Returned</MenuItem>
              </Select>
            </FormControl>

           
          </div>

           <SearchBar placeholder={"Search products by Title or Order Number"}/>
        </div>
        {/* Sort and Search Inputs end */}

         {/* Order Table */}
                <div className='flex w-full py-6'>
                    <TableContainer component={Paper} sx={{ 
                        padding:'4px',
                        boxShadow: 'none' ,border:'none',  }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                       
                        <TableBody>
                        {orders.slice(orderpage * rowsPerPage, orderpage * rowsPerPage + rowsPerPage).map((order) => (
                                                   
                            // <TableRow
                            // key={order.id}
                            // sx={{ '&:last-child td, &:last-child th': { border: 0 },
                            
                            // boxShadow: 'none' ,border:'none',  }}
                            // >
                            //     <TableCell align="left" sx={{
                                                                
                            //                                     boxShadow: 'none' ,border:'none',padding:'0px'}}>
                            // <div key={order.orderId} className="bg-gray-50 border border-gray-200 rounded-md shadow p-4 mb-4 flex flex-col gap-4 w-full">
                            // {/* Header */}
                            // <div className="flex justify-between items-center border-b border-gray-400 pb-2">
                            //     <div className="!text-sm font-semibold text-gray-800">Order No: {order.orderId}</div>
                            //     <div className="text-sm text-gray-500">{order.orderDate}</div>
                            //     {/* <div className="text-sm font-semibold text-green-600">₹{order.amount.toLocaleString()}</div> */}
                            // </div>

                            // {/* Product */}
                            // <div className="flex gap-4">
                            //     <img
                            //     src={sampleImage}
                            //     alt="product"
                            //     className="w-24 h-24 object-contain rounded border border-gray-300"
                            //     />
                            //     <div className="flex-1 flex flex-col gap-1">
                            //     <div className="font-semibold text-sm">{order.productName}</div>
                            //     <div className="text-sm text-gray-700">Qty: {order.quantity}</div>
                            //     <div className="text-sm text-gray-700">Discount: ₹{order.discount}</div>
                            //     <div>
                            //         <span className="bg-green-200 text-green-800 px-2 py-1 rounded !text-xs font-medium">
                            //         {order.status}
                            //         </span>
                            //     </div>
                            //     <div className="!text-sm text-gray-500">
                            //         Item delivered on: <span className="!text-sm font-medium">{order.deliveryDate}</span>
                            //     </div>
                            //     <button className="bg-blue-900 text-white px-4 py-1 rounded-full !text-sm w-fit mt-1">
                            //         Give Review
                            //     </button>
                            //     </div>
                            // </div>

                            // {/* Footer */}
                            // <div className="flex justify-between items-center mt-2">
                            //     <div className="text-sm font-semibold text-gray-800">
                            //     Amount ₹{order.amount.toLocaleString()}
                            //     </div>
                            //     <div className="flex gap-2">
                            //     <button className="border border-gray-400 px-3 py-1 rounded-full text-sm text-gray-700">
                            //         Track Order
                            //     </button>
                            //     <button className="border border-gray-400 px-3 py-1 rounded-full text-sm text-gray-700">
                            //         Download Invoice
                            //     </button>
                            //     </div>
                            // </div>
                            // {/* <TrackingStepper currentStep={4} /> */}
                            // </div>
                            // </TableCell>
                            // </TableRow>
                            <OrderTableComponent order={order}/>
                        ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                count={orders.length}
                                rowsPerPage={rowsPerPage}
                                page={orderpage}
                                onPageChange={handleChangePage}
                                rowsPerPageOptions={[]} 
                                labelRowsPerPage={''}  
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                    </TableContainer>
                    </div>
                {/* Order Table ends */}       
        
      </div>
      {/* My Orders end */}

      {/* Invoices and Billing */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full">

        <h3 className="font-semibold text-gray-800 mb-4">My Invoices</h3>

           {/* Sort and Search Inputs */}
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Sort by date"
                slotProps={{
                  textField: {
                    size: "small", // Reduces overall field height
                    // sx: { fontSize: '12px' }, // Reduces input text size
                    // InputLabelProps: { sx: { fontSize: '12px' } } // Reduces label size
                  },
                }}
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
            </LocalizationProvider>

           
          </div>

           <SearchBar placeholder={"Search invoices by Order Number"}/>
        </div>
        {/* Sort and Search Inputs end */}             

         <TableContainer component={Paper} sx={{ 
                        padding:'4px',
                        boxShadow: 'none' ,border:'none', marginTop:'16px' }}>
                    <Table sx={{ minWidth: 650, }} aria-label="simple table">
                       
                        <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow
                            key={invoice.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 },
                            
                            boxShadow: 'none' ,border:'none',  }}
                            >
                                <TableCell align="left" sx={{
                                                                
                                                                boxShadow: 'none' ,border:'none',padding:'0px'}}>
                            <div
                                key={invoice.orderId}
                                className="flex justify-between items-center px-4 py-3 hover:bg-gray-50 border-b border-gray-300"
                            >
                                <div className="text-sm font-medium text-gray-800">Order #{invoice.orderId}</div>
                                <div className="text-sm text-gray-600">Invoice Date: {invoice.date}</div>
                                <button className="text-sm text-blue-600 hover:underline">Download</button>
                            </div>
                            </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                count={invoices.length}
                                rowsPerPage={rowsPerPage}
                                page={invoicepage}
                                onPageChange={handleinvoiceChangePage}
                                rowsPerPageOptions={[]} 
                                labelRowsPerPage={''}  
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                    </TableContainer>
      </div>
    </div>
  );
}

export default OrderandBilling;



function OrderTableComponent({order}){

  const [showTrack,setshowTrack]=useState(false)
  const [currentStep,setcurrentStep]=useState(4)

  return <TableRow
                            key={order.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 },
                            
                            boxShadow: 'none' ,border:'none',  }}
                            >
                                <TableCell align="left" sx={{
                                                                
                                                                boxShadow: 'none' ,border:'none',padding:'0px'}}>
                            <div key={order.orderId} className="bg-gray-50 border border-gray-200 rounded-md shadow p-4 mb-4 flex flex-col gap-4 w-full">
                            {/* Header */}
                            <div className="flex justify-between items-center border-b border-gray-400 pb-2">
                                <div className="!text-sm font-semibold text-gray-800">Order No: {order.orderId}</div>
                                <div className="text-sm text-gray-500">{order.orderDate}</div>
                                {/* <div className="text-sm font-semibold text-green-600">₹{order.amount.toLocaleString()}</div> */}
                            </div>

                            {/* Product */}
                            <div className="flex gap-4">
                                <img
                                src={sampleImage}
                                alt="product"
                                className="w-24 h-24 object-contain rounded border border-gray-300"
                                />
                                <div className="flex-1 flex flex-col gap-1">
                                <div className="font-semibold text-sm">{order.productName}</div>
                                <div className="text-sm text-gray-700">Qty: {order.quantity}</div>
                                <div className="text-sm text-gray-700">Discount: ₹{order.discount}</div>
                                <div>
                                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded !text-xs font-medium">
                                    {order.status}
                                    </span>
                                </div>
                                <div className="!text-sm text-gray-500">
                                    Item delivered on: <span className="!text-sm font-medium">{order.deliveryDate}</span>
                                </div>
                                <button className="bg-blue-900 text-white px-4 py-1 rounded-full !text-sm w-fit mt-1">
                                    Give Review
                                </button>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-between items-center mt-2">
                                <div className="text-sm font-semibold text-gray-800">
                                Amount ₹{order.amount.toLocaleString()}
                                </div>
                                <div className="flex gap-2">
                                <button className="border border-gray-400 px-3 py-1 rounded-full text-sm text-gray-700" onClick={()=>setshowTrack(true)}>
                                    Track Order
                                </button>
                                <button className="border border-gray-400 px-3 py-1 rounded-full text-sm text-gray-700">
                                    Download Invoice
                                </button>
                                </div>
                            </div>
                            {showTrack && <TrackingStepper currentStep={currentStep} />}
                            </div>
                            </TableCell>
                            </TableRow>
}
