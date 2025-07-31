import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import icon1 from "../assets/icons/survey-line.svg";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Slider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function SideMenu({ showSideMenu, setShowSideMenu, menu }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isSubcategoryPage = /^\/categories\/[^\/]+\/[^\/]+$/.test(
    location.pathname
  );
  const isProductPage = /^\/categories\/[^\/]+\/[^\/]+\/\d+$/.test(
    location.pathname
  );

  const [priceRange, setPriceRange] = useState({ min: "0", max: "50000" });
  const [discounts, setDiscounts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  

  // useEffect(() => {
  //  setProductFilters({priceRanges:priceRange,discountRange:discounts,brands})
  // }, [priceRange,discounts,brands]);

  const totalPages = Math.ceil(menu.length / itemsPerPage);

  const discountOptions = [
    "10-20",
    "20-30",
    "30-40",
    "40-50",
    "50-60",
    "60-70",
    "70-80",
  ];

  const brandOptions = ["Brand 1", "Brand 2", "Brand 3", "Brand 4"];

  const params = useParams();
  let skipMenu = false;
  if (params.productId) {
    skipMenu = true;
  }

  return (
    <>
      {!skipMenu && (
        <div
          className={`
      absolute top-0 left-0 z-30 w-3/4 max-h-9/10 
      transform transition-transform duration-300 ease-in-out
      ${showSideMenu ? "translate-x-0" : "-translate-x-full"}
      md:relative md:translate-x-0 md:flex md:w-fit md:h-full md:top-auto md:left-auto
      flex flex-col gap-4 p-4
    `}
        >
          {/* Accordion for Category Hiding on Products Tab */}
          {isSubcategoryPage ? (
            <FiltersnCategory
              priceRange={priceRange}
              discounts={discounts}
              brands={brands}
              setBrands={setBrands}
              setDiscounts={setDiscounts}
              setPriceRange={setPriceRange}
              discountOptions={discountOptions}
              brandOptions={brandOptions}
              menu={menu}
            />
          ) : (
            <div className="md:w-80 bg-white shadow-md rounded-lg p-4 overflow-y-auto md:overflow-y-visible h-full">
              {menu
                ?.slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((option, index) => (
                  <div key={index} className="relative group">
                    {/* Main clickable menu item */}
                    <div
                      onClick={() => {
                        navigate(`/categories/${option.slug}`);
                        setShowSideMenu(false);
                      }}
                      className="flex items-center gap-2 p-2 group-hover:bg-blue-100 rounded-md cursor-pointer relative z-10"
                    >
                      <img
                        src={icon1}
                        alt={option.name}
                        className="md:h-[22px] md:w-[22px] h-[18px] w-[18px]"
                      />
                      <span className="!text-xs md:!text-sm">
                        {option.name}
                      </span>
                    </div>

                    {/* Submenu on hover */}
                    <div className="hidden group-hover:block absolute left-full top-0 w-80 bg-white shadow-md rounded-lg p-4 z-20">
                      {option.subcategories.map((subcategory, subIndex) => (
                        <div
                          key={subIndex}
                          onClick={() => {
                            navigate(
                              `/categories/${option.slug}/${subcategory.slug}`
                            );
                            setShowSideMenu(false);
                          }}
                          className="block p-2 hover:bg-blue-100 rounded-md text-sm cursor-pointer"
                        >
                          <span className="!text-xs md:!text-sm !text-gray-800">
                            {subcategory.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

              <div className="flex justify-between items-center mt-4 px-2 text-sm text-gray-700">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="text-xs md:text-sm px-2 py-1 font-medium rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  Previous
                </button>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="text-xs md:text-sm px-2 py-1 font-medium rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default SideMenu;

function FiltersnCategory({
  discountOptions,
  brandOptions,
  priceRange,
  discounts,
  brands,
  setBrands,
  setDiscounts,
  setPriceRange,
  menu,
}) {
  const handleCheckboxChange = (value, setState, currentState) => {
    if (currentState.includes(value)) {
      setState(currentState.filter((v) => v !== value));
    } else {
      setState([...currentState, value]);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(menu.length / itemsPerPage);
  const {productFilters,setProductFilters}=useAuth();

  return (
    <div className='"md:w-80 flex flex-col md:bg-transparent bg-white shadow-lg md:shadow-none rounded-md md:rounded-none p-3 md:p-0 gap-3 md:gap-4 overflow-y-auto md:overflow-y-visible h-full'>
      <Accordion className="w-full bg-white rounded-md">
        <AccordionSummary
          expandIcon={<i class="ri-arrow-down-s-line text-lg"></i>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <p className="!text-xs md:!text-sm !text-blue-900 font-semibold">
            Go to Categories
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <div className="md:w-80 bg-white shadow-md rounded-lg p-4 overflow-y-auto md:overflow-y-visible h-full">
            {menu
              ?.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((option, index) => (
                <div key={index} className="relative group">
                  {/* Main clickable menu item */}
                  <div
                    onClick={() => {
                      navigate(`/categories/${option.slug}`);
                      setShowSideMenu(false);
                    }}
                    className="flex items-center gap-2 p-2 group-hover:bg-blue-100 rounded-md cursor-pointer relative z-10"
                  >
                    <img
                      src={icon1}
                      alt={option.name}
                      className="md:h-[22px] md:w-[22px] h-[18px] w-[18px]"
                    />
                    <span className="!text-xs md:!text-sm">{option.name}</span>
                  </div>

                  {/* Submenu on hover */}
                  <div className="hidden group-hover:block absolute left-full top-0 w-80 bg-white shadow-md rounded-lg p-4 z-20">
                    {option.subcategories.map((subcategory, subIndex) => (
                      <div
                        key={subIndex}
                        onClick={() => {
                          navigate(
                            `/categories/${option.slug}/${subcategory.slug}`
                          );
                          setShowSideMenu(false);
                        }}
                        className="block p-2 hover:bg-blue-100 rounded-md text-sm cursor-pointer"
                      >
                        <span className="!text-xs md:!text-sm !text-gray-800">
                          {subcategory.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            <div className="flex justify-between items-center mt-4 px-2 text-sm text-gray-700">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="text-xs md:text-sm px-2 py-1 font-medium rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                Previous
              </button>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="text-xs md:text-sm px-2 py-1 font-medium rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion className="w-full bg-white rounded-md">
        <AccordionSummary
          expandIcon={<i className="ri-arrow-down-s-line text-lg" />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <p className="!text-xs md:!text-sm !text-blue-900 font-semibold">
            Filters
          </p>
        </AccordionSummary>

        <AccordionDetails>
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Price Range Filter */}
            <div>
              <label className="!text-xs md:!text-sm font-medium text-gray-700 mb-2 block">
                Price Range:
              </label>
              <div className="flex items-center gap-2 mb-2">
                <span className="!text-xs md:text-gray-500">₹</span>
                <input
                  type="number"
                  min="0"
                  max="50000"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      min: Number(e.target.value),
                    })
                  }
                  className=" w-14 md:w-24 p-1 border border-gray-300 rounded-md !text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <span className="!text-xs md:!text-sm text-gray-500 px-1">
                  to
                </span>
                <span className="!text-xs md:!text-sm text-gray-500">₹</span>
                <input
                  type="number"
                  min="0"
                  max="50000"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      max: Number(e.target.value),
                    })
                  }
                  className="!text-xs md:!text-sm w-14 md:w-24 p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="px-2">
                <Slider
                  size="small"
                  min={0}
                  max={50000}
                  step={100}
                  value={[priceRange.min, priceRange.max]}
                  onChange={(event, newValue) =>
                    setPriceRange({ min: newValue[0], max: newValue[1] })
                  }
                  valueLabelDisplay="auto"
                  sx={{
                    marginBottom: "-20px",
                    marginTop: "-20px",
                    padding: "0px",
                  }}
                />
              </div>
            </div>

            {/* Discount Filter */}
            <div>
              <label className="!text-xs md:!text-sm font-medium text-gray-700 mb-2 block">
                Discount:
              </label>
              <div className="flex flex-col gap-2 text-sm px-1 text-gray-600">
                {discountOptions.map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      value={option}
                      checked={discounts.includes(option)}
                      onChange={() =>
                        handleCheckboxChange(option, setDiscounts, discounts)
                      }
                      className="mr-2 accent-blue-500"
                    />
                    <span className="!text-xs md:!text-sm !text-gray-600">
                      {option} %
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="!text-xs md:!text-sm !font-medium text-gray-700 mb-2 block">
                Brand:
              </label>
              <div className="flex flex-col gap-2 text-sm px-1 text-gray-600">
                {brandOptions.map((brand) => (
                  <label key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      value={brand}
                      checked={brands.includes(brand)}
                      onChange={() =>
                        handleCheckboxChange(brand, setBrands, brands)
                      }
                      className="mr-2 accent-blue-500"
                    />
                    <span className="!text-xs md:!text-sm !text-gray-600">
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </AccordionDetails>
        <AccordionActions>
          <button
            className="!text-sm !text-orange-500 mx-6 mb-2 poppins-semibold"
            onClick={() => {
              setProductFilters({priceRanges:priceRange,discountRange:discounts,brands})
            }}
          >
            Apply Filters
          </button>
          <button
            className="!text-sm !text-orange-500 mx-6 mb-2 poppins-semibold"
            onClick={() => {
              setBrands([]);
              setDiscounts([]);
              setPriceRange({ min: 0, max: 50000 });
              setProductFilters({priceRanges:{min:0,max:50000},discountRange:[],brands:[]})
            }}
          >
            Clear All
          </button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
