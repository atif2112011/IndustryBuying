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
import { FetchAllOrders, FetchAllOrdersAdmin, UpdateOrderAPI } from "../../apis/order";
import {useLoader} from '../../contexts/LoaderContext';
import { useAlert } from "../../contexts/AlertContext";

function Order() {
  const [orderpage, setorderpage] = useState(0);
  const [rowsPerPage, setrowsPerPage] = useState(10);
  const [orders, setOrders] = useState([]);

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
  const{setMessage,setShowSnackBar}=useAlert();

  const [date, setDate] = useState(null);
  const [status, setStatus] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalOrders, setTotalOrders] = useState(0);
  const [search, setSearch] = useState("");
 

  const handleView = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleSave = async(updatedOrder) => {
    // console.log("Updated Order:", updatedOrder);
    setLoading(true);
    const response=await UpdateOrderAPI(updatedOrder);
    setLoading(false);
    if(response.success)
    {
      setOrders(orders.map((order) => (order._id == response.order._id ? { ...order, ...response.order } : order)));
      setMessage("Order Updated Successfully");
      setShowSnackBar(true);
    }
    else
    {
      setMessage(response.message);
      setShowSnackBar(true);
    }
    setModalOpen(false);
  };

  const handleChangePage = async(event, newPagce) => {
    setorderpage(newPage);
    setLoading(true);
    const response=await FetchAllOrdersAdmin(newPage+1,rowsPerPage,search,status,date);
    setLoading(false);
    if(response.success)
    {
      setTotalOrders(response.totalOrders);
      setOrders(response.orders);
    }
  };

  const handleFilterDate = (newDate) => {
    setDate(newDate);
    console.log(newDate);
  }

  const ApplyFilters=async()=>{
    let searchTerm=null;
      if(search!=="" && search!==null) searchTerm=search;

      let filterDate=null;
      if(date !=="" && date!==null) filterDate=date;

      let filterStatus=null;
      if(status !=="" && status!==null) filterStatus=status;
      setLoading(true);
      const response=await FetchAllOrdersAdmin(1,rowsPerPage,searchTerm,filterStatus,filterDate);
      setLoading(false);
      if(response.success)
      {
        setOrders(response.orders);
        setTotalOrders(response.totalOrders);
        setorderpage(0);
      }
  }

  const ResetFilters=async()=>{
      setLoading(true);
      setStatus(null);
      setDate(null);
      setSearch("");
      const response = await FetchAllOrdersAdmin(1, rowsPerPage);
      setLoading(false);
      if(response.success)
    {
      setOrders(response.orders);
      setTotalOrders(response.totalOrders);
      setorderpage(0);
    }
    }

 useEffect(() => {
  const fetchOrders = async () => {
    setLoading(true);
    const response=await FetchAllOrdersAdmin(1,rowsPerPage);
    setLoading(false);
    if(response.success)
    {
      setOrders(response.orders);
      setTotalOrders(response.totalOrders);
    }
  }
   fetchOrders();
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
              value={status || ""}
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

          <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs md:text-sm" onClick={ApplyFilters}>Apply Filters</button>
          {(status!==null || date!==null) && <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs md:text-sm" onClick={ResetFilters}>Reset Filters</button>}
        
        
        </div>

        <div className="search-bar">
          <SearchBar placeholder="Search using Order ID or Customer Name" searchTerm={search} setSearchTerm={setSearch} handleSearch={ApplyFilters} />
        </div>
      </div>

      {/* Sort and Search Inputs end */}

      {/* Order Table */}
      {<TableContainer
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
            {orders && orders.length > 0 && orders
              .map((order) => (
                <TableRow key={order._id}>
                  <TableCell sx={{ padding: "6px 12px" }}>
                    <div className="text-xs md:text-sm font-medium text-gray-800">
                      {order._id}
                    </div>
                  </TableCell>
                  <TableCell sx={{ padding: "6px 12px" }}>
                    <div className="text-xs md:text-sm text-gray-700">
                      {order.userName}
                    </div>
                  </TableCell>
                  <TableCell sx={{ padding: "6px 12px" }}>
                    <div className="text-xs md:text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleString()}
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
                      {order.totalPrice}
                    </div>
                  </TableCell>
                  <TableCell sx={{ padding: "6px 12px" }}>
                    <div className="text-xs md:text-sm text-gray-600">
                      {order?.paymentInfo?.method || "null"}
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
                count={totalOrders}
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
        onClose={() => {setModalOpen(false),setSelectedOrder(null)}}
        orderData={selectedOrder}
        onSave={handleSave}
      />
    </div>
  );
}

export default Order;
