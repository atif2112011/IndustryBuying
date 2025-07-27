import {
  Button,
  FormControl,
  IconButton,
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

import { FetchAllOrders } from "../../apis/order";
import { useLoader } from "../../contexts/LoaderContext";
import EditProductModal from "../../components/Admin/EditProductModal";
import { getCatwithProductandSubCount, getMenu } from "../../apis/category";
import { AddNewProductAPI, DeleteProductAPI, getAllProducts, UpdateProductAPI } from "../../apis/products";
import AddNewProduct from "../../components/Admin/AddNewProduct";
import { useAlert } from "../../contexts/AlertContext";
import AddNewCategory from "../../components/Admin/AddNewCategory";
import EditCategoryModal from "../../components/Admin/EditNewCategory";



function Category() {
  const [categorypage, setcategorypage] = useState(0);
  const [rowsPerPage, setrowsPerPage] = useState(10);
  const [totalPages, settotalPages] = useState(0);
  const [totalCategories, settotalCategories] = useState(0);
  const {setMessage,setShowSnackBar}=useAlert();

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    packed: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    refunded: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    true: "bg-green-100 text-green-800",
    false: "bg-gray-200 text-gray-700",
  };

  const { setLoading } = useLoader();

  const [date, setDate] = useState(null);
  const [status, setStatus] = useState(null);
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryData, setcategoryData] = useState([]);
  const [menu, setMenu] = useState([]);
  const [filters, setFilters] = useState({
    date: null,
    status: null,
    category: null,
    isActive: null ,
  });

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setModalOpen(true);
  };

  const handleDelete = async(productId) => {
    setLoading(true);
    const response=await DeleteProductAPI(productId);
    setLoading(false);
    if(response.success)
    {
      setProducts(products.filter((product) => product._id != productId));
      setMessage("Product Deleted Successfully");
      setShowSnackBar(true);
    }
    else
    {
      setMessage(response.message);
      setShowSnackBar(true);
    }
  };

  const handleUpdateCategory = async(updateCategory) => {
    setLoading(true);
    console.log(`updateCategory`, updateCategory);
    // const response=await UpdateProductAPI(updatedProduct);
    setLoading(false);
    // if(response.success)
    // {
    //   setSelectedCategory(null);
    //   setProducts(products.map((product) => (product._id == response.product._id ? response.product : product)));
    //   setMessage("Product Updated Successfully");
    //   setShowSnackBar(true);
    //   setModalOpen(false);
    // }
    // else
    // {
    //   setMessage(response.message);
    //   setShowSnackBar(true);
    // }
  };

  const handleAddCategory = async(newCategory) => {
    setAddCategoryModalOpen(false);
    setLoading(true);
    // const response=await AddNewProductAPI(newCategory);
    console.log(`newCategory`, newCategory);
    setLoading(false);
    // if(response.success)
    // {
    //   setProducts((prevProducts)=>[...prevProducts,response.product]);
    //   setMessage("Product Added Successfully");
    //   setShowSnackBar(true);
    //   setAddCategoryModalOpen(false);
    // }
    // else
    // {
    //   setMessage(response.message);
    //   setShowSnackBar(true);
    // }
  };

  const handleChangePage = async(event, newPage) => {
    setcategorypage(newPage);
    setLoading(true);
    const response = await getCatwithProductandSubCount(newPage + 1, rowsPerPage);
    setLoading(false);
    if (response.success) setcategoryData(response.categories);
  };

  const handleFilterDate = (newDate) => {
    setDate(newDate);
    console.log(newDate);
  };

  const ApplyFilters=async()=>{
      // setcategorypage(0);
      let searchTerm=null;
      if(search!=="" && search!==null) searchTerm=search;

      let filterCategory=null;
      if(category !=="" && category!==null) filterCategory=category;

      let filterStatus=null;
      if(status !=="" && status!==null) filterStatus=status;
      setLoading(true);
      
      const response = await getCatwithProductandSubCount(1, rowsPerPage,searchTerm);
      setLoading(false);
      if (response.success) 
        setcategorypage(0);
        {setcategoryData(response.categories);
          settotalPages(response.totalPages);
          settotalCategories(response.totalCategories);
          
        }
       
  }

  const ResetFilters=async()=>{
    setLoading(true);
    setStatus(null);
    setCategory(null);
    setDate(null);
    setSearch("");
    const response = await getCatwithProductandSubCount(1, rowsPerPage);
    setLoading(false);
    if (response.success) 
      {setcategoryData(response.categories);
        settotalPages(response.totalPages);
        settotalCategories(response.totalCategories);
        setcategorypage(0);
      }
  }

  const handleAddNewCategory = () => {
    setSelectedCategory(null);
    setAddCategoryModalOpen(true);
  };

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      const response = await getMenu();
      setLoading(false);
      if (response.success) setMenu(response.menu);
    };
    const fetchCategoriesData = async () => {
      setLoading(true);
      const response = await getCatwithProductandSubCount(1, rowsPerPage,null);
      setLoading(false);
      if (response.success) 
        {setcategoryData(response.categories);
          settotalPages(response.totalPages);
          settotalCategories(response.totalCategories);
        }
    };
    fetchMenu();
    fetchCategoriesData();
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
              onChange={(newDate) => {
                handleFilterDate(newDate);
              }}
            />
          </LocalizationProvider> */}

          {/* <FormControl
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
              value={status|| ""}
              label="Filter by Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value={"true"}>Active</MenuItem>
              <MenuItem value={"false"}>Inactive</MenuItem>

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
              Filter by Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category || ""}
              label="Filter by Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {menu && menu.length > 0 &&
                menu.map((category) => (
                  <MenuItem value={category._id}>{category.name}</MenuItem>
              ))}
              
            </Select>
          </FormControl> */}

          {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs md:text-sm" onClick={ApplyFilters}>Apply Filters</button>
          {(status!==null || category!==null || date!==null) && <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs md:text-sm" onClick={ResetFilters}>Reset Filters</button>}
         */}
        <button className="bg-orange-500 text-white px-4 py-2 rounded-md text-xs md:text-sm" onClick={handleAddNewCategory}>Add New Category</button>
        </div>

        <div className="search-bar">
          <SearchBar placeholder="Search products by Title or Order Number" searchTerm={search} setSearchTerm={setSearch} handleSearch={ApplyFilters}/>
        </div>
      </div>

      {/* Sort and Search Inputs end */}

      {/* Products Table */}
      {(
        <TableContainer
          component={Paper}
          sx={{
            padding: "4px",
            boxShadow: "none",
            border: "none",
            marginTop: "16px",
          }}
        >
          <Table aria-label="products table">
            <TableHead>
              <TableRow>
                {[
                  "Category Name",
                  "No of Products",
                  "No of Subcategories",
                  "Actions",
                ].map((head) => (
                  <TableCell
                    key={head}
                    align="left"
                    sx={{ padding: "6px 12px" }}
                  >
                    <div className="text-xs md:text-sm font-semibold text-gray-800">
                      {head}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {categoryData && categoryData.length > 0 && <TableBody>
              {categoryData.map((category) => (
                  <TableRow key={category._id}>
                    {/* <TableCell sx={{ padding: "6px 12px" }}>
                      <img
                        src={product?.images[0] || ""}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    </TableCell> */}
                    <TableCell sx={{ padding: "6px 12px" }}>
                      <div className="text-xs md:text-sm font-medium text-gray-800">
                        {category.name}
                      </div>
                    </TableCell>
                    <TableCell sx={{ padding: "6px 12px" }}>
                      <div className="text-xs md:text-sm font-medium text-gray-800">
                        {category.productCount || 0}
                      </div>
                    </TableCell>
                    <TableCell sx={{ padding: "6px 12px" }}>
                      <div className="text-xs md:text-sm font-medium text-gray-800">
                        {category.subcategoryCount || 0}
                      </div>
                    </TableCell>
                    {/* <TableCell sx={{ padding: "6px 12px" }}>
                      <div className="text-xs md:text-sm font-medium text-green-800">
                        ₹ {product.price}
                      </div>
                    </TableCell> */}
                    {/* <TableCell sx={{ padding: "6px 12px" }}>
                      <div className="text-xs md:text-sm font-medium text-gray-800">
                        {product.discount} %
                      </div>
                    </TableCell> */}
                    {/* <TableCell sx={{ padding: "6px 12px" }}>
                      <div
                        className={`text-xs md:text-sm font-medium ${
                          product.stock <= 10
                            ? "text-red-800"
                            : "text-green-800"
                        }`}
                      >
                        {product.stock}
                      </div>
                    </TableCell> */}
                    {/* <TableCell sx={{ padding: "6px 12px" }}>
                      <span
                        className={`px-2 py-1 rounded !text-xs font-medium ${
                          statusColors[product.isActive] ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </span>
                    </TableCell> */}
                    <TableCell sx={{ padding: "6px 12px" }}>
                      <div className="flex items-center gap-2">
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(category)}
                        >
                          <i className="ri-pencil-line text-blue-600 text-base"></i>
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(category._id)}
                        >
                          <i className="ri-delete-bin-line text-red-600 text-base"></i>
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>}

            <TableFooter>
              <TableRow>
                <TablePagination
                className="centered-pagination"
                colSpan={9}
                  count={totalCategories}
                  rowsPerPage={rowsPerPage}
                  page={categorypage}
                  onPageChange={handleChangePage}
                  rowsPerPageOptions={[]}
                  labelRowsPerPage={""}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}

      <EditCategoryModal
        isOpen={modalOpen}
        onClose={() => {setModalOpen(false), setSelectedCategory(null)}}
        category={selectedCategory}
        onSave={handleUpdateCategory}
      />

      <AddNewCategory isOpen={addCategoryModalOpen} onClose={() => setAddCategoryModalOpen(false)} onSave={handleAddCategory}/>
    </div>
  );
}

export default Category;
