import { useParams } from "react-router-dom";
import DynamicBreadcrumbs from "../components/DynamicBread";
import { useState } from "react";

import ProductShowcase from "../components/ProductShowcase";
import { useEffect } from "react";
import { getProductsBySubCategory } from "../apis/category";
import { useLoader } from "../contexts/LoaderContext";
import { useAuth } from "../contexts/AuthContext";

function SubCategoryPage() {
  const { subcategoryId, categoryId } = useParams();
  const [selectedSort, setSelectedSort] = useState("Recommended");
  const [products, setProducts] = useState([]);

  const sortOptions = ["New", "Price: Low to High", "Price: High to Low"];

  let categories = subcategoryId.split("-");
  let categoryName = categories
    .map((category) => {
      return category.charAt(0).toUpperCase() + category.slice(1);
    })
    .join(" ");
  const { setLoading } = useLoader();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const {productFilters,setProductFilters}=useAuth();

  useEffect(() => {
    // console.log("productFilters", productFilters);
    const ApplyFilters=async()=>{
      setLoading(true);
      const response=await getProductsBySubCategory(
        subcategoryId,
        1,
        rowsPerPage,
        selectedSort,
        productFilters.priceRanges,
        productFilters.brands,
        productFilters.discountRange
      );
      setLoading(false);
      if (response.success) {
        setProducts(response.products);
        setTotalPages(response.totalPages);
        setTotalProducts(response.totalProducts);
        setPage(1);
      } 
    
      
    }
    ApplyFilters();
  }, [productFilters]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await getProductsBySubCategory(
        subcategoryId,
        1,
        rowsPerPage
      );
      setLoading(false);
      if (response.success) {
        setProducts(response.products);
        setTotalPages(response.totalPages);
        setTotalProducts(response.totalProducts);
        setPage(1);
      } else {
        console.log("error", response.message);
      }
    };

    fetchProducts();
  }, []);

  const handleSortChange = async (option) => {
    setLoading(true);
    const response = await getProductsBySubCategory(
      subcategoryId,
      1,
      rowsPerPage,
      option,
      productFilters.priceRanges,
      productFilters.brands,
      productFilters.discountRange
    );
    setLoading(false);
    if (response.success) {
      setProducts(response.products);
      setTotalPages(response.totalPages);
      setTotalProducts(response.totalProducts);
      setPage(1);
      setSelectedSort(option);
    }
  };

  return (
    <div className="flex flex-col">
      <DynamicBreadcrumbs />
      {/* Heading */}
      <div className="flex flex-row justify-start gap-4 items-center">
        <h2 className="!text-md md:!text-lg">{categoryName}</h2>
        <span className="text-black !text-xs md:!text-sm">{`Showing ${
          page * rowsPerPage - rowsPerPage + 1
        } to ${Math.min(
          page * rowsPerPage,
          totalProducts
        )} out of ${totalProducts} Products`}</span>
      </div>
      {/* Heading end */}

      {/* Sort By */}
      <div className="flex flex-row my-3 md:m-0 justify-start items-center gap-2 md:gap-4 flex-wrap">
        <p className=" !text-xs md:!text-sm !text-gray-500 poppins-semibold md:m-0 mr-1">
          Sort By :
        </p>
        {sortOptions.map((option) => (
          <button
            key={option}
            onClick={() => handleSortChange(option)}
            className={` !text-xs md:!text-sm border px-3 py-1 rounded-2xl bg-white 
            ${
              selectedSort === option
                ? "!text-orange-500 border-orange-500"
                : "!text-black border-gray-300"
            } 
            hover:bg-orange-50 hover:!text-orange-500 hover:border-orange-500`}
          >
            {option}
          </button>
        ))}
      </div>
      {/* Sort By ends */}
      {/* Product Showcase */}
      <ProductShowcase
        products={products}
        setProducts={setProducts}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        totalProducts={totalProducts}
        setTotalProducts={setTotalProducts}
        sort={selectedSort}

      />
      {/* Product Showcase end */}
    </div>
  );
}
export default SubCategoryPage;
