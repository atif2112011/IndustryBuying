import { Box, FormControl, IconButton, InputLabel, MenuItem, Modal, Select } from "@mui/material";
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
import sampleImage from "../assets/images/productImages/product2.webp";
import { TableFooter, TablePagination } from "@mui/material";
import SearchBar from "../components/SearchBar";
import TrackingStepper from "../components/TrackingStepper";
import { useAuth } from "../contexts/AuthContext";
import { useLoader } from "../contexts/LoaderContext";
import { useAlert } from "../contexts/AlertContext";
import { getUserInvoices } from "../apis/order";
import { href } from "react-router-dom";

function Invoices() {
  const { setLoading } = useLoader();

  const [date2, setDate2] = useState(null);

  const [search2, setSearch2] = useState("");

  const [invoices, setInvoices] = useState([]);
  const [invoicepage, setinvoicepage] = useState(0);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [totalInvoicePages, setTotalInvoicePages] = useState(0);

  const [rowsPerPage, setrowsPerPage] = useState(10);

    // Image Modal
    const [invoiceURL, setInvoiceURL] = useState(null);
    const [open, setOpen] = useState(false);

     const handleClose = () => {
    setInvoiceURL(null);
    setOpen(false);
  };

  const handleinvoiceChangePage = (event, newPage) => {
    setorderpage(newPage);
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
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <h3 className="!text-sm md:!text-md font-semibold text-gray-800 mb-8">
          My Invoices
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
                value={date2}
                onChange={(newValue) => setDate2(newValue)}
              />
            </LocalizationProvider>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs md:text-sm"
              onClick={ApplyFilters2}
            >
              Apply Filters
            </button>
            {(date2 !== null || search2 !== "") && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs md:text-sm"
                onClick={ResetFilters2}
              >
                Reset Filters
              </button>
            )}
          </div>
          <div className="search-bar">
            <SearchBar
              placeholder={"Search invoices by Order Number"}
              searchTerm={search2}
              setSearchTerm={setSearch2}
              handleSearch={ApplyFilters2}
            />
          </div>
        </div>
        {/* Sort and Search Inputs end */}

        <TableContainer
          className="hidden md:block"
          component={Paper}
          sx={{
            padding: "4px",
            boxShadow: "none",
            border: "none",
            marginTop: "30px",
          }}
        >
          <Table sx={{}} aria-label="simple table">
            <TableHead>
              <TableRow>
                {[
                  "Order ID",
                  "Total Amount",
                  "Delivered On",
                  "Last Updated",
                  "Action",
                ].map((headCell) => (
                  <TableCell
                    key={headCell}
                    align="left"
                    sx={{
                      boxShadow: "none",
                      border: "none",
                      padding: "12px 12px",
                    }}
                  >
                    <div className="!text-xs md:!text-sm font-semibold text-gray-800">
                      {headCell}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {invoices &&
                invoices.length > 0 &&
                invoices.map((invoice) => (
                  <TableRow
                    key={invoice?._id}
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
                        padding: "10px 12px",
                      }}
                    >
                      <div className="text-xs md:text-sm font-medium text-gray-800">
                        {invoice._id}
                      </div>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        boxShadow: "none",
                        border: "none",
                        padding: "10px 12px",
                      }}
                    >
                      <div className="text-xs md:text-sm text-gray-600">
                        ₹ {invoice?.totalPrice?.toFixed(2) || "N/A"}
                      </div>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        boxShadow: "none",
                        border: "none",
                        padding: "10px 12px",
                      }}
                    >
                      <div className="text-xs md:text-sm text-gray-600">
                        {(invoice?.deliveredOn &&
                          new Date(
                            invoice?.deliveredAt
                          ).toLocaleDateString()) ||
                          "N/A"}
                      </div>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        boxShadow: "none",
                        border: "none",
                        padding: "10px 12px",
                      }}
                    >
                      <div className="text-xs md:text-sm text-gray-600">
                        {new Date(invoice?.updatedAt).toLocaleDateString() ||
                          "N/A"}
                      </div>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        boxShadow: "none",
                        border: "none",
                        padding: "10px 12px",
                      }}
                      
                    >
                    <div className="flex flex-row gap-4 items-center">
                                            <p
                      
                      className="!text-xs md:!text-sm !text-blue-600 hover:underline cursor-pointer"
                      onClick={() =>{
                        setInvoiceURL(invoice?.invoiceUrl);
                        setOpen(true);
                      }}
                    >
                      View
                    </p>
                      <a
                        href={getDownloadUrl(invoice?.invoiceUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs md:text-sm text-blue-600 hover:underline"
                      >
                        Download
                      </a>
                    </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={totalInvoices}
                  rowsPerPage={rowsPerPage}
                  page={invoicepage}
                  onPageChange={handleinvoiceChangePage}
                  rowsPerPageOptions={[]}
                  labelRowsPerPage={""}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        
        <TableContainer className="block md:hidden"
        sx={{
            padding: "0px",
            boxShadow: "none",
            border: "none",
            marginTop: "30px",
          }}>
          <Table aria-label="mobile table">
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice._id}  >
                  <TableCell
                    sx={{
                      padding: "20px 0px",
                      borderBottom: "1px solid #cfd1d4ff",
                    }}
                  >
                    <div className="text-xs text-gray-800 font-semibold">
                      Order ID
                    </div>
                    <div className="text-xs text-gray-700 mb-2">
                      {invoice._id}
                    </div>

                    <div className="text-xs text-gray-800 font-semibold">
                      Total Amount
                    </div>
                    <div className="text-xs text-gray-700 mb-2">
                      ₹ {invoice?.totalPrice?.toFixed(2) || "N/A"}
                    </div>

                    <div className="text-xs text-gray-800 font-semibold">
                      Delivered On
                    </div>
                    <div className="text-xs text-gray-700 mb-2">
                      {invoice?.deliveredAt && new Date(invoice?.deliveredAt).toLocaleDateString() ||
                        "N/A"}
                    </div>

                    <div className="text-xs text-gray-800 font-semibold ">
                      Last Updated
                    </div>
                    <div className="text-xs text-gray-700 mb-2">
                      {new Date(invoice?.updatedAt).toLocaleDateString() ||
                        "N/A"}
                    </div>

                    <div className="text-xs text-gray-800 font-semibold mb-1">
                      Action  :
                    </div>
                    <div className="flex flex-row gap-2 flex-wrap">
                      <p
                      
                      className="!text-xs !text-blue-600 hover:underline"
                      onClick={() =>{
                        setInvoiceURL(invoice?.invoiceUrl);
                        setOpen(true);
                      }}
                    >
                      View
                    </p>
                    <a
                      href={getDownloadUrl(invoice?.invoiceUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Download
                    </a>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  count={totalInvoices}
                  rowsPerPage={rowsPerPage}
                  page={invoicepage}
                  onPageChange={handleinvoiceChangePage}
                  rowsPerPageOptions={[]}
                  labelRowsPerPage=""
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>

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

export default Invoices;

const getDownloadUrl = (url) => {
  if (!url) return "#";

  const parts = url.split("/upload/");
  if (parts.length !== 2) return url;

  // Inject `fl_attachment` into the transformation part
  return `${parts[0]}/upload/fl_attachment/${parts[1]}`;
};
