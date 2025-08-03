import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import sampleImage from "../assets/images/productImages/product2.jpg";
import { TableFooter, TablePagination } from "@mui/material";
import SearchBar from "../components/SearchBar";
import TrackingStepper from "../components/TrackingStepper";
import { useAuth } from "../contexts/AuthContext";
import { useLoader } from "../contexts/LoaderContext";
import { useAlert } from "../contexts/AlertContext";
import {
  FetchAllOrders,
  FetchAllOrdersAdmin,
  getUserInvoices,
} from "../apis/order";
import { href } from "react-router-dom";

function OrderandBilling() {
  const {
    user,
    setUser,
    cart,
    setCart,
    cartCount,
    setCartCount,
    cartDetails,
    setCartDetails,
  } = useAuth();
  const { setLoading } = useLoader();
  const { setMessage, setShowSnackBar } = useAlert();
  const [date, setDate] = useState(null);
  const [date2, setDate2] = useState(null);
  const [status, setStatus] = useState(null);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");

  const [invoices, setInvoices] = useState([]);
  const [invoicepage, setinvoicepage] = useState(0);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [totalInvoicePages, setTotalInvoicePages] = useState(0);

  // Image Modal
  const [invoiceURL, setInvoiceURL] = useState(null);
  const [open, setOpen] = useState(false);

  const [orderpage, setorderpage] = useState(0);
  const [rowsPerPage, setrowsPerPage] = useState(5);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleClose = () => {
    setInvoiceURL(null);
    setOpen(false);
  };

  const handleChangePage = async (event, newPage) => {
    setorderpage(newPage);
    setLoading(true);
    const response = await FetchAllOrders(
      newPage + 1,
      rowsPerPage,
      search,
      status,
      date
    );
    setLoading(false);
    if (response.success) {
      setTotalOrders(response.totalOrders);
      setOrders(response.orders);
    }
  };
  const handleinvoiceChangePage = (event, newPage) => {
    setorderpage(newPage);
  };

  const ApplyFilters = async () => {
    let searchTerm = null;
    if (search !== "" && search !== null) searchTerm = search;

    let filterDate = null;
    if (date !== "" && date !== null) filterDate = date;

    let filterStatus = null;
    if (status !== "" && status !== null) filterStatus = status;
    setLoading(true);
    const response = await FetchAllOrders(
      1,
      rowsPerPage,
      searchTerm,
      filterStatus,
      filterDate
    );
    setLoading(false);
    if (response.success) {
      setOrders(response.orders);
      setTotalOrders(response.totalOrders);
      setorderpage(0);
    }
  };

  const ResetFilters = async () => {
    setLoading(true);
    setStatus(null);
    setDate(null);
    setSearch("");
    const response = await FetchAllOrders(1, rowsPerPage);
    setLoading(false);
    if (response.success) {
      setOrders(response.orders);
      setTotalOrders(response.totalOrders);
      setorderpage(0);
    }
  };

  const ApplyFilters2 = async () => {
    let searchTerm = null;
    if (search2 !== "" && search2 !== null) searchTerm = search2;

    let filterDate = null;
    if (date2 !== "" && date2 !== null) filterDate = date2;

    setLoading(true);
    const response = await getUserInvoices(
      1,
      rowsPerPage,
      searchTerm,
      null,
      filterDate
    );
    setLoading(false);
    if (response.success) {
      setInvoices(response.invoices);
      setTotalInvoices(response.totalInvoices);
      setTotalInvoicePages(response.totalInvoicePages);
      setinvoicepage(0);
    }
  };

  const ResetFilters2 = async () => {
    setLoading(true);

    setDate2(null);
    setSearch2("");
    const response = await getUserInvoices(1, rowsPerPage, null, null, null);
    setLoading(false);
    if (response.success) {
      setInvoices(response.invoices);
      setTotalInvoices(response.totalInvoices);
      setTotalInvoicePages(response.totalInvoicePages);
      setinvoicepage(0);
    }
  };

  useEffect(() => {
    const FetchData = async () => {
      setLoading(true);
      const response = await FetchAllOrders(1, rowsPerPage, null, null, null);
      setLoading(false);
      if (response.success) {
        setOrders(response.orders);
        setTotalOrders(response.totalOrders);
        setTotalPages(response.totalPages);
      }

      setLoading(true);
      const response2 = await getUserInvoices(1, rowsPerPage, null, null);
      setLoading(false);
      if (response2.success) {
        setInvoices(response2.invoices);
        setTotalInvoices(response2.totalInvoices);
        setTotalInvoicePages(response2.totalInvoicePages);
      }
    };
    FetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* My Orders */}
      <div className="bg-white p-3 md:p-6 rounded-lg shadow-md w-full">
        <h3 className="!text-sm md:!text-md font-semibold text-gray-800 mb-4">
          My Orders
        </h3>

        {/* Sort and Search Inputs */}
        <div className="filter-search-wrapper">
          <div className="filter-group">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Sort by date"
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
                onChange={(newValue) => setDate(newValue)}
              />
            </LocalizationProvider>

            <FormControl
              size="small"
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
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs md:text-sm"
              onClick={ApplyFilters}
            >
              Apply Filters
            </button>
            {(status !== null || date !== null || search !== "") && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs md:text-sm"
                onClick={ResetFilters}
              >
                Reset Filters
              </button>
            )}
          </div>

          <div className="search-bar">
            <SearchBar
              placeholder="Search using Order ID or Product Name"
              searchTerm={search}
              setSearchTerm={setSearch}
              handleSearch={ApplyFilters}
            />
          </div>
        </div>

        {/* Sort and Search Inputs end */}

        {/* Order Table */}
        <div className="flex w-full py-6">
          <TableContainer
            component={Paper}
            sx={{
              padding: "4px",
              boxShadow: "none",
              border: "none",
            }}
          >
            <Table sx={{}} aria-label="simple table">
              <TableBody>
                {orders &&
                  orders.length > 0 &&
                  orders.map((order) => (
                    <OrderTableComponent
                      order={order}
                      setInvoiceURL={setInvoiceURL}
                      setOpen={setOpen}
                    />
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
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
          </TableContainer>
        </div>
        {/* Order Table ends */}
      </div>
      {/* My Orders end */}

      {/*View Invoice Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            outline: "none",
            maxWidth: "90vw",
            maxHeight: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            overflow: "auto",
          }}
        >
          <img
            src={invoiceURL}
            alt="Large preview"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(0,0,0,0.5)",
            }}
          />

          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "black",
            }}
          >
            <i className="ri-close-line" style={{ fontSize: "24px" }} />
          </IconButton>
        </Box>
      </Modal>
    </div>
  );
}

export default OrderandBilling;

function OrderTableComponent({ order, setInvoiceURL, setOpen }) {
  const [showTrack, setshowTrack] = useState(false);
  const [currentStep, setcurrentStep] = useState(4);
  const steps = {
    processing: 0,
    packed: 1,
    shipped: 2,
    delivered: 3,
    cancelled: 4,
    refunded: 5,
  }; //'Processing', 'Packed', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'}
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    packed: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    refunded: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return (
    <TableRow
      key={order.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },

        boxShadow: "none",
        border: "none",
      }}
    >
      <TableCell
        align="left"
        sx={{
          boxShadow: "none",
          border: "none",
          padding: "0px",
        }}
      >
        <div
          key={order._id}
          className="bg-gray-50 border border-gray-200 rounded-md shadow p-4 mb-4 flex flex-col gap-4 w-full"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-400 pb-2 gap-1 flex-wrap">
            <div className="!text-xs md:!text-sm font-semibold text-gray-800">
              Order No: {order?._id || ""}
            </div>
            <div className="text-xs md:text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleDateString() || ""}
            </div>
            {/* <div className="text-sm font-semibold text-green-600">₹{order.amount.toLocaleString()}</div> */}
          </div>

          {/* Product */}
          <div className="flex flex-col gap-6">
            {order &&
              order.items &&
              order.items.map((order) => (
                <div className="flex gap-4 items-center">
                  <img
                    src={order?.image || ""}
                    alt="product"
                    className="w-18 h-18  md:w-24 md:h-24 object-contain rounded border border-gray-300"
                  />
                  <div className="flex-1 flex flex-col">
                    <div className="font-semibold text-xs md:text-sm mb-2">
                      {order?.productName || ""}
                    </div>
                    <div className="flex flex-row gap-4 items-center justify-between">
                      <p className="!text-xs md:!text-sm text-gray-700">
                        Unit Price:
                      </p>
                      <p className="!text-xs md:!text-sm text-gray-700 ">
                        ₹ {order?.price?.toFixed(2) || ""}
                      </p>
                    </div>

                    <div className="flex flex-row gap-4 items-center justify-between">
                      <p className="!text-xs md:!text-sm text-gray-700 ">
                        Product Quantity:
                      </p>
                      <p className="!text-xs md:!text-sm text-gray-700 ">
                        {order?.quantity || ""}
                      </p>
                    </div>

                    <div className="flex flex-row gap-4 items-center justify-between">
                      <p className="!text-xs md:!text-sm text-gray-700">
                        GST @ {order?.gstPercentage || ""}% :
                      </p>
                      <p className="!text-xs md:!text-sm text-gray-700 ">
                        {" "}
                        {order?.gst?.toFixed(2) || ""}
                      </p>
                    </div>

                    <div className="flex flex-row gap-4 items-center justify-between">
                      <p className="!text-xs md:!text-sm text-gray-700">
                        Subtotal :
                      </p>
                      <p className="!text-green-800 !text-xs md:!text-sm ">
                        {" "}
                        ₹ {order?.subtotal?.toFixed(2) || ""}
                      </p>
                    </div>

                    {/* <div className="text-xs md:text-sm text-gray-700">
                Discount: ₹{order.discount}
              </div> */}

                    {/* <button className="bg-blue-900 text-white px-4 py-2 rounded-full !text-[10px] md:!text-sm w-fit mt-1">
                Give Review
              </button> */}
                  </div>
                </div>
              ))}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-2 border-t border-gray-400 pt-3 flex-wrap md:gap-0 gap-2">
            <div className="text-xs md:text-sm font-semibold text-gray-800">
              Total Amount : ₹{order?.totalPrice?.toFixed(2) || ""}
            </div>
            <div className="flex gap-4 items-center flex-wrap">
              {order?.deliveredAt && (
                <div className="text-xs md:!text-sm text-gray-500  w-[70vw] md:w-fit">
                  Item delivered on:{" "}
                  <span className="!text-xs md:!text-sm font-medium">
                    {new Date(order?.deliveredAt).toLocaleDateString()}
                  </span>
                </div>
              )}

              <button
                className="border border-gray-400 px-3 py-1 rounded-full text-xs md:text-sm text-gray-700"
                onClick={() => setshowTrack(true)}
              >
                Track Order
              </button>
              {order?.invoiceUrl ? (
                <button
                  className="border border-gray-400 px-3 py-1 rounded-full text-xs md:text-sm text-gray-700"
                  onClick={() => {
                    setInvoiceURL(order?.invoiceUrl);
                    setOpen(true);
                  }}
                >
                  View Invoice
                </button>
              ) : (
                <button
                  disabled
                  className="border border-neutral-300 px-3 py-1 rounded-full text-xs md:text-sm text-neutral-300 bg-gray-100"
                >
                  View Invoice
                </button>
              )}
              {order?.invoiceUrl ? (
                <button className="border border-gray-400 px-3 py-1 rounded-full text-xs md:text-sm text-gray-700">
                  <a
                    href={getDownloadUrl(order?.invoiceUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm text-gray-700 hover:underline"
                  >
                    Download Invoice
                  </a>
                </button>
              ) : (
                <button
                  disabled
                  className="border border-neutral-300 px-3 py-1 rounded-full text-xs md:text-sm text-neutral-300 bg-gray-100"
                >
                  Download Invoice
                </button>
              )}
            </div>
          </div>
          {showTrack && (
            <TrackingStepper currentStep={steps[order.status] || 0} />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}

const OrderTableCell = ({ order, showTrack = true, currentStep = 0 }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDetails = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <TableCell>
      <Typography variant="body2">
        <strong>Order ID:</strong> {order._id.slice(-6).toUpperCase()}
      </Typography>
      <Typography variant="body2">
        <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
      </Typography>
      <Typography variant="body2">
        <strong>Amount:</strong> ₹{order.totalAmount.toFixed(2)}
      </Typography>
      <Typography
        variant="body2"
        color={order.status === "Delivered" ? "green" : "orange"}
      >
        <strong>Status:</strong> {order.status}
      </Typography>

      <Button
        size="small"
        onClick={toggleDetails}
        sx={{ mt: 1, fontSize: "0.75rem", textTransform: "none" }}
      >
        {expanded ? "Hide Details" : "View Details"}
      </Button>

      <Collapse in={expanded}>
        <Box mt={1}>
          <Divider />

          {showTrack && (
            <>
              <Typography variant="subtitle2" mt={2}>
                Tracking:
              </Typography>
              <TrackingStepper currentStep={currentStep} />
            </>
          )}

          <Typography variant="subtitle2" gutterBottom mt={2}>
            Products:
          </Typography>
          {order.items.map((item, i) => (
            <Typography variant="body2" key={i}>
              {item.name} × {item.quantity}
            </Typography>
          ))}

          <Typography variant="subtitle2" mt={1}>
            Shipping:
          </Typography>
          <Typography variant="body2">
            {order.shippingInfo.name}, {order.shippingInfo.flat},{" "}
            {order.shippingInfo.city} – {order.shippingInfo.pincode}
          </Typography>
        </Box>
      </Collapse>
    </TableCell>
  );
};

const getDownloadUrl = (url) => {
  if (!url) return "#";

  const parts = url.split("/upload/");
  if (parts.length !== 2) return url;

  // Inject `fl_attachment` into the transformation part
  return `${parts[0]}/upload/fl_attachment/${parts[1]}`;
};
