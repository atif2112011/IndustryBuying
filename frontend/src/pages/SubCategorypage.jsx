import { useParams } from "react-router-dom";
import DynamicBreadcrumbs from "../components/DynamicBread";
import { useState } from "react";

import ProductShowcase from "../components/ProductShowcase";

function SubCategoryPage() {

    
const { subcategoryId,categoryId } = useParams();
const [selectedSort, setSelectedSort] = useState("Recommended");

  const sortOptions = [
    "Recommended",
    "New",
    "Price:Low to High",
    "Price:High to Low"
  ];

let categories = subcategoryId.split('-');
let categoryName = (categories.map((category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
})).join(' ');

  return (
    <div className="flex flex-col">
        <DynamicBreadcrumbs/>
        {/* Heading */}
        <div className="flex flex-row justify-start gap-4 items-center">
      <h2>{categoryName}</h2>
        <span className="text-black !text-sm">Showing 40 out of 50000 Products</span>

        </div>
        {/* Heading end */}

        {/* Sort By */}
        <div className="flex flex-row justify-start items-center gap-4 flex-wrap">
            <p className="!text-sm !text-gray-500 poppins-semibold">Sort By</p>
            {sortOptions.map((option) => (
        <button
          key={option}
          onClick={() => setSelectedSort(option)}
          className={`!text-sm border px-3 py-1 rounded-2xl bg-white 
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
      <ProductShowcase/>
      {/* Product Showcase end */}


    </div>
  );
}
export default SubCategoryPage;