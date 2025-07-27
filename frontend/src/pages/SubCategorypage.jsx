import { useParams } from "react-router-dom";
import DynamicBreadcrumbs from "../components/DynamicBread";
import { useState } from "react";

import ProductShowcase from "../components/ProductShowcase";
import { useEffect } from "react";
import { getProductsBySubCategory } from "../apis/category";
import { useLoader } from "../contexts/LoaderContext";

function SubCategoryPage() {

    
const { subcategoryId,categoryId } = useParams();
const [selectedSort, setSelectedSort] = useState("Recommended");
const [products, setProducts] = useState([]);

  const sortOptions = [
    "New",
    "Price: Low to High",
    "Price: High to Low"
  ];

let categories = subcategoryId.split('-');
let categoryName = (categories.map((category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
})).join(' ');
const {setLoading}=useLoader();

useEffect(()=>{
const fetchProducts=async()=>{
  const response=await getProductsBySubCategory(subcategoryId);
  if(response.success)
  {
    setProducts(response.products);
  }
  else
  {
    console.log('error',response.message);
  }
}
setLoading(true);
fetchProducts();
setLoading(false);

},[])

  return (
    <div className="flex flex-col">
        <DynamicBreadcrumbs/>
        {/* Heading */}
        <div className="flex flex-row justify-start gap-4 items-center">
      <h2 className="!text-md md:!text-lg">{categoryName}</h2>
        <span className="text-black !text-xs md:!text-sm">Showing 40 out of 50000 Products</span>

        </div>
        {/* Heading end */}

        {/* Sort By */}
        <div className="flex flex-row my-3 md:m-0 justify-start items-center gap-2 md:gap-4 flex-wrap">
            <p className=" !text-xs md:!text-sm !text-gray-500 poppins-semibold md:m-0 mr-1">Sort By :</p>
            {sortOptions.map((option) => (
        <button
          key={option}
          onClick={() => setSelectedSort(option)}
          className={` !text-xs md:!text-sm border px-3 py-1 rounded-2xl bg-white 
            ${selectedSort === option 
              ? "!text-orange-500 border-orange-500" 
              : "!text-black border-gray-300"} 
            hover:bg-orange-50 hover:!text-orange-500 hover:border-orange-500`}
        >
          {option}
        </button>
      ))}
        </div>
        {/* Sort By ends */}
      {/* Product Showcase */}
      <ProductShowcase products={products}/>
      {/* Product Showcase end */}


    </div>
  );
}
export default SubCategoryPage;