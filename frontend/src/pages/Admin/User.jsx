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
import { useState, useEffect } from "react";
import EditOrderModal from "../../components/Admin/EditOrderModal";
import {
  FetchAllOrders,
  FetchAllOrdersAdmin,
  UpdateOrderAPI,
} from "../../apis/order";
import { useLoader } from "../../contexts/LoaderContext";
import { useAlert } from "../../contexts/AlertContext";
import { getAllUsers, handleBlock, handleUnblock, UpdateUser } from "../../apis/user";
import EditUserModal from "../../components/Admin/EditUserModal";

function User() {
  const [userpage, setuserpage] = useState(0);
  const [rowsPerPage, setrowsPerPage] = useState(10);
  const [users, setUsers] = useState([]);

  const statusColors = {
    customer: "bg-yellow-100 text-yellow-800",
    admin: "bg-blue-100 text-blue-800",
    packed: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    false: "bg-green-100 text-green-800",
    true: "bg-red-100 text-red-800",
  };
  const { setLoading } = useLoader();
  const { setMessage, setShowSnackBar } = useAlert();

  const [date, setDate] = useState(null);
  const [status, setStatus] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState(null);

  const handleView = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleSave = async (updatedUser) => {
    // console.log("Updated User:", updatedUser);
    setLoading(true);
    const response = await UpdateUser(updatedUser);
    // console.log('response',response);
    setLoading(false);
    if (response.success) {
      setUsers(
        users.map((user) =>
          user._id == response.user._id
            ? { ...user, ...response.user }
            : user
        )
      );
      setMessage("User Updated Successfully");
      setShowSnackBar(true);
    } else {
      setMessage(response.message);
      setShowSnackBar(true);
    }
    setModalOpen(false);
  };

  const handleChangePage = async (event, newPage) => {
    setuserpage(newPage);
    setLoading(true);
    const response = await FetchAllOrdersAdmin(newPage + 1, rowsPerPage);
    setLoading(false);
    if (response.success) {
      setTotalUsers(response.totalUsers);
      setUsers(response.users);
    }
  };

  const handleFilterDate = (newDate) => {
    setDate(newDate);
    console.log(newDate);
  };

  const ApplyFilters = async () => {
    let searchTerm = null;
    if (search !== "" && search !== null) searchTerm = search;

    let filterRole = null;
    if (role !== "" && role !== null) filterRole = role;

    let filterStatus = null;
    if (status !== "" && status !== null) filterStatus = status;
    setLoading(true);
    const response = await getAllUsers(
      1,
      rowsPerPage,
      filterStatus,
      filterRole,
      searchTerm
    );
    setLoading(false);
    if (response.success) {
      setUsers(response.users);
      setTotalUsers(response.totalUser);
      setuserpage(0);
    }
  };

  const handleUserBlock = async (id) => {
    // setLoading(true);
    const response = await handleBlock(id);
    // setLoading(false);
    if (response.success) {
        setUsers((users) => users.map((user) =>{
            if(user._id == id)
                return {...user,isBlock:!user.isBlock}
            return user
        }));
    } else 
        {setMessage(response.message);
    setShowSnackBar(true);
        }
  };

  const handleUserUnBlock = async(id) => {
    // setLoading(true);
    const response = await handleUnblock(id);
    // setLoading(false);
   if (response.success) {
        setUsers((users) => users.map((user) =>{
            if(user._id == id)
                return {...user,isBlock:!user.isBlock}
            return user
        }));
    } else 
        {setMessage(response.message);
    setShowSnackBar(true);
        }
  };

  const ResetFilters = async () => {
    setLoading(true);
    setStatus(null);
    setRole(null);
    setDate(null);
    setSearch("");
    const response = await getAllUsers(1, rowsPerPage);
    setLoading(false);
    if (response.success) {
      setUsers(response.users);
      setTotalUsers(response.totalUser);
      setuserpage(0);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const response = await getAllUsers(1, rowsPerPage);
      setLoading(false);
      if (response.success) {
        setUsers(response.users);
        setTotalUsers(response.totalUser);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="w-full flex flex-col">
      {/* Sort and Search Inputs */}
      <div className="filter-search-wrapper">
        <div className="filter-group">
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          </LocalizationProvider> */}

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
              <MenuItem value={"true"}>Blocked</MenuItem>
              <MenuItem value={"false"}>Active</MenuItem>
            </Select>
          </FormControl>

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
              Filter by Role
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role || ""}
              label="Filter by Role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value={"customer"}>Customer</MenuItem>
              <MenuItem value={"admin"}>Admin</MenuItem>
            </Select>
          </FormControl>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs md:text-sm"
            onClick={ApplyFilters}
          >
            Apply Filters
          </button>
          {(role !== null || status !== null || date !== null) && (
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
            placeholder="Search using User ID or Customer Name"
            searchTerm={search}
            setSearchTerm={setSearch}
            handleSearch={ApplyFilters}
          />
        </div>
      </div>

      {/* Sort and Search Inputs end */}

      {/* User Table */}
      {
        <TableContainer
          component={Paper}
          sx={{
            padding: "12px",
            boxShadow: "none",
            border: "none",
            marginTop: "16px",
          }}
        >
          <Table aria-label="users table">
            <TableHead>
              <TableRow>
                {["Name", "Email", "Phone", "Status", "Role", "Action"].map(
                  (head) => (
                    <TableCell
                      key={head}
                      align="left"
                      sx={{ padding: "6px 12px" }}
                    >
                      <div className="text-xs md:text-sm font-semibold text-gray-800">
                        {head}
                      </div>
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {users &&
                users.length > 0 &&
                users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell sx={{ padding: "6px 12px" }}>
                      <div className="text-xs md:text-sm text-gray-700">
                        {user.name}
                      </div>
                    </TableCell>
                    <TableCell sx={{ padding: "6px 12px" }}>
                      <div className="text-xs md:text-sm text-gray-600">
                        {user.email}
                      </div>
                    </TableCell>
                    <TableCell sx={{ padding: "6px 12px" }}>
                      <div className="text-xs md:text-sm text-gray-800">
                        {user.phone}
                      </div>
                    </TableCell>
                    <TableCell sx={{ padding: "6px 12px" }}>
                      <span
                        className={`px-2 py-1 rounded !text-xs font-medium ${
                          statusColors[user.isBlock ? "true" : "false"] ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.isBlock ? "Blocked" : "Active"}
                      </span>
                    </TableCell>
                    <TableCell sx={{ padding: "6px 12px" }}>
                      <span
                        className={`px-2 py-1 rounded !text-xs font-medium ${
                          statusColors[user.role] || "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </TableCell>

                    <TableCell sx={{ padding: "6px 12px" }}>
                      <button
                        variant="text"
                        size="small"
                        className="text-blue-600 hover:scale-105 text-xs p-3 py-1 rounded-full mr-2"
                        onClick={() => handleView(user)}
                      >
                        View
                      </button>
                      <button
                        variant="text"
                        size="small"
                        className={`hover:scale-105 ${
                          statusColors[user.isBlock ? "false" : "true"] ||
                          "bg-gray-100 text-gray-800"
                        } text-xs  p-3 py-1 rounded-full`}
                        onClick={() =>
                          user.isBlock
                            ? handleUserUnBlock(user._id)
                            : handleUserBlock(user._id)
                        }
                      >
                        {user.isBlock ? "Unblock" : "Block"}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  className="centered-pagination"
                  colSpan={7}
                  count={totalUsers}
                  rowsPerPage={rowsPerPage}
                  page={userpage}
                  onPageChange={handleChangePage}
                  rowsPerPageOptions={[]}
                  labelRowsPerPage={""}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      }

      <EditUserModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false), setSelectedUser(null);
        }}
        userData={selectedUser}
        onSave={handleSave}
      />
    </div>
  );
}

export default User;
