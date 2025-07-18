import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import SearchBar from "../../components/SearchBar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState ,useEffect} from "react";
import EditOrderModal from "../../components/Admin/EditOrderModal";
import { FetchAllOrders } from "../../apis/order";
import {useLoader} from '../../contexts/LoaderContext';
function Order() {
  const [orderpage, setorderpage] = useState(0);
  const [rowsPerPage, setrowsPerPage] = useState(10);
  const [orders, setOrders] = useState([
  { orderId: "A001", customer: "John Doe", date: "12 Jul 2025, 12:32PM", status: "delivered", amount: "₹799", payment: "UPI", address: "123 Street, City, PIN, State, Country", items: [{ name: "Widget A", quantity: 1, price: "₹799" }],invoiceUrl:"https://example.com/invoice.pdf" },
  { orderId: "A002", customer: "Sarah Khan", date: "12 Jul 2025, 11:18AM", status: "processing", amount: "₹1,299", payment: "Razorpay", address: "456 Avenue, Metro City, 10001, State, India", items: [{ name: "Widget B", quantity: 2, price: "₹649" }] },
  { orderId: "A003", customer: "Mike Tyson", date: "11 Jul 2025, 09:42AM", status: "cancelled", amount: "₹1,099", payment: "COD", address: "789 Lane, Town, 560001, State, India", items: [{ name: "Widget C", quantity: 1, price: "₹1,099" }] },
  { orderId: "A004", customer: "John Doe", date: "12 Jul 2025, 12:32PM", status: "delivered", amount: "₹799", payment: "UPI", address: "123 Street, City, PIN, State, Country", items: [{ name: "Widget A", quantity: 1, price: "₹799" }],invoiceUrl:"https://example.com/invoice.pdf" },
  { orderId: "A005", customer: "Sarah Khan", date: "12 Jul 2025, 11:18AM", status: "processing", amount: "₹1,299", payment: "Razorpay", address: "456 Avenue, Metro City, 10001, State, India", items: [{ name: "Widget B", quantity: 2, price: "₹649" }] },
  { orderId: "A006", customer: "Mike Tyson", date: "11 Jul 2025, 09:42AM", status: "cancelled", amount: "₹1,099", payment: "COD", address: "789 Lane, Town, 560001, State, India", items: [{ name: "Widget C", quantity: 1, price: "₹1,099" }] },{ orderId: "A001", customer: "John Doe", date: "12 Jul 2025, 12:32PM", status: "delivered", amount: "₹799", payment: "UPI", address: "123 Street, City, PIN, State, Country", items: [{ name: "Widget A", quantity: 1, price: "₹799" }],invoiceUrl:"https://example.com/invoice.pdf" },
  { orderId: "A007", customer: "Sarah Khan", date: "12 Jul 2025, 11:18AM", status: "processing", amount: "₹1,299", payment: "Razorpay", address: "456 Avenue, Metro City, 10001, State, India", items: [{ name: "Widget B", quantity: 2, price: "₹649" }] },
  { orderId: "A008", customer: "Mike Tyson", date: "11 Jul 2025, 09:42AM", status: "cancelled", amount: "₹1,099", payment: "COD", address: "789 Lane, Town, 560001, State, India", items: [{ name: "Widget C", quantity: 1, price: "₹1,099" }] },{ orderId: "A001", customer: "John Doe", date: "12 Jul 2025, 12:32PM", status: "delivered", amount: "₹799", payment: "UPI", address: "123 Street, City, PIN, State, Country", items: [{ name: "Widget A", quantity: 1, price: "₹799" }],invoiceUrl:"https://example.com/invoice.pdf" },
  { orderId: "A009", customer: "Sarah Khan", date: "12 Jul 2025, 11:18AM", status: "processing", amount: "₹1,299", payment: "Razorpay", address: "456 Avenue, Metro City, 10001, State, India", items: [{ name: "Widget B", quantity: 2, price: "₹649" }] },
  { orderId: "A0012", customer: "Mike Tyson", date: "11 Jul 2025, 09:42AM", status: "cancelled", amount: "₹1,099", payment: "COD", address: "789 Lane, Town, 560001, State, India", items: [{ name: "Widget C", quantity: 1, price: "₹1,099" }] },{ orderId: "A001", customer: "John Doe", date: "12 Jul 2025, 12:32PM", status: "delivered", amount: "₹799", payment: "UPI", address: "123 Street, City, PIN, State, Country", items: [{ name: "Widget A", quantity: 1, price: "₹799" }],invoiceUrl:"https://example.com/invoice.pdf" },
  { orderId: "A00212", customer: "Sarah Khan", date: "12 Jul 2025, 11:18AM", status: "processing", amount: "₹1,299", payment: "Razorpay", address: "456 Avenue, Metro City, 10001, State, India", items: [{ name: "Widget B", quantity: 2, price: "₹649" }] },
  { orderId: "A00311", customer: "Mike Tyson", date: "11 Jul 2025, 09:42AM", status: "cancelled", amount: "₹1,099", payment: "COD", address: "789 Lane, Town, 560001, State, India", items: [{ name: "Widget C", quantity: 1, price: "₹1,099" }] },
]);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    packed: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    refunded: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  const {setLoading}=useLoader();

  const [date, setDate] = useState(null);
  const [status, setStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleView = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleSave = (updatedOrder) => {
    console.log("Updated Order:", updatedOrder);
    setModalOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setorderpage(newPage);
  };

  const handleFilterDate = (newDate) => {
    setDate(newDate);
    console.log(newDate);
  }

 useEffect(() => {
  const fetchOrders = async () => {
    setLoading(true);
    const response=await FetchAllOrders();
    setLoading(false);
    if(response.success)
    setOrders(response.orders);
  }
  //  fetchOrders();
 },[])

  return (
    <div className="w-full flex flex-col">
      {/* Sort and Search Inputs */}
      <div className="filter-search-wrapper">
        <div className="filter-group">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Sort by date"
              className="bg-white"
              slotProps={{
                textField: {
                  size: "small",
                  sx: {
                    fontSize: "14px",
                    "@media (max-width:768px)": {
                      fontSize: "13px",
                      "& input": {
                        fontSize: "13px",
                      },
                      "& label": {
                        fontSize: "13px",
                      },
                    },
                  },
                },
              }}
              value={date}
              onChange={(newDate)=>{handleFilterDate(newDate)}}
            />
          </LocalizationProvider>

          <FormControl
            size="small"
            className="bg-white"
            sx={{
              minWidth: 120,
              "@media (max-width:768px)": {
                "& .MuiInputLabel-root": {
                  fontSize: "13px",
                },
                "& .MuiSelect-select": {
                  fontSize: "13px",
                },
              },
            }}
          >
            <InputLabel id="demo-simple-select-label">
              Filter by Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Filter by Status"
              onChange={(e) => setStatus(e.target.value)}
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

        <div className="search-bar">
          <SearchBar placeholder="Search products by Title or Order Number" />
        </div>
      </div>

      {/* Sort and Search Inputs end */}

      {/* Order Table */}
      {orders && orders.length>0 && <TableContainer
        component={Paper}
        sx={{
          padding: "12px",
          boxShadow: "none",
          border: "none",
          marginTop: "16px",
        }}
      >
        <Table aria-label="orders table">
          <TableHead>
            <TableRow>
              {[
                "Order #",
                "Customer",
                "Date & Time",
                "Status",
                "Amount",
                "Payment",
                "",
              ].map((head) => (
                <TableCell key={head} align="left" sx={{ padding: "6px 12px" }}>
                  <div className="text-xs md:text-sm font-semibold text-gray-800">
                    {head}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {orders
              .slice(
                orderpage * rowsPerPage,
                orderpage * rowsPerPage + rowsPerPage
              )
              .map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell sx={{ padding: "6px 12px" }}>
                    <div className="text-xs md:text-sm font-medium text-gray-800">
                      {order.orderId}
                    </div>
                  </TableCell>
                  <TableCell sx={{ padding: "6px 12px" }}>
                    <div className="text-xs md:text-sm text-gray-700">
                      {order.customer}
                    </div>
                  </TableCell>
                  <TableCell sx={{ padding: "6px 12px" }}>
                    <div className="text-xs md:text-sm text-gray-600">
                      {order.date}
                    </div>
                  </TableCell>
                  <TableCell sx={{ padding: "6px 12px" }}>
                    <span
                      className={`px-2 py-1 rounded !text-xs font-medium ${
                        statusColors[order.status] ||
                        "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell sx={{ padding: "6px 12px" }}>
                    <div className="text-xs md:text-sm text-gray-800">
                      {order.amount}
                    </div>
                  </TableCell>
                  <TableCell sx={{ padding: "6px 12px" }}>
                    <div className="text-xs md:text-sm text-gray-600">
                      {order.payment}
                    </div>
                  </TableCell>
                  <TableCell sx={{ padding: "6px 12px" }}>
                    <Button
                      variant="text"
                      size="small"
                      className="text-blue-600 hover:underline text-xs md:text-sm"
                      onClick={() => handleView(order)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
              className="centered-pagination"
              colSpan={7}
                count={orders.length}
                rowsPerPage={rowsPerPage}
                page={orderpage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[]}
                labelRowsPerPage={""}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>}

      <EditOrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        orderData={selectedOrder}
        onSave={handleSave}
      />
    </div>
  );
}

export default Order;
