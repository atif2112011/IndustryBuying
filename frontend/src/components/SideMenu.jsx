import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import icon1 from "../assets/icons/survey-line.svg";
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Slider } from '@mui/material';
import { useState } from 'react';
const categoryMenuOptions = [
  {
    link: "/categories/office-supplies",
    name: "Office Supplies",
    icon: "officeIcon",
    subcategories: [
      { name: "Stationery", link: "/categories/office-supplies/stationery" },
      { name: "Printers", link: "/categories/office-supplies/printers" },
      { name: "Paper Products", link: "/categories/office-supplies/paper-products" }
    ]
  },
  {
    link: "/categories/electrical",
    name: "Electrical",
    icon: "electricalIcon",
    subcategories: [
      { name: "Wires & Cables", link: "/categories/electrical/wires-cables" },
      { name: "Switches", link: "/categories/electrical/switches" },
      { name: "Circuit Breakers", link: "/categories/electrical/circuit-breakers" }
    ]
  },
  {
    link: "/categories/industrial-automation",
    name: "Industrial Automation",
    icon: "industrialIcon",
    subcategories: [
      { name: "PLCs", link: "/categories/industrial-automation/plcs" },
      { name: "Sensors", link: "/categories/industrial-automation/sensors" },
      { name: "Motor Drives", link: "/categories/industrial-automation/motor-drives" },
      { name: "SCADA Systems", link: "/categories/industrial-automation/scada-systems" }
    ]
  },
  {
    link: "/categories/material-handling",
    name: "Material Handling and Packaging",
    icon: "materialIcon",
    subcategories: [
      { name: "Trolleys", link: "/categories/material-handling/trolleys" },
      { name: "Conveyors", link: "/categories/material-handling/conveyors" },
      { name: "Pallet Jacks", link: "/categories/material-handling/pallet-jacks" }
    ]
  },
  {
    link: "/categories/power-tools",
    name: "Power Tools",
    icon: "powerToolsIcon",
    subcategories: [
      { name: "Drills", link: "/categories/power-tools/drills" },
      { name: "Grinders", link: "/categories/power-tools/grinders" },
      { name: "Saws", link: "/categories/power-tools/saws" },
      { name: "Impact Wrenches", link: "/categories/power-tools/impact-wrenches" }
    ]
  },
  {
    link: "/categories/furniture",
    name: "Furniture, Hospitality and Food Service",
    icon: "furnitureIcon",
    subcategories: [
      { name: "Office Chairs", link: "/categories/furniture/office-chairs" },
      { name: "Cafeteria Tables", link: "/categories/furniture/cafeteria-tables" },
      { name: "Service Trolleys", link: "/categories/furniture/service-trolleys" }
    ]
  },
  {
    link: "/categories/cleaning",
    name: "Cleaning",
    icon: "cleaningIcon",
    subcategories: [
      { name: "Vacuum Cleaners", link: "/categories/cleaning/vacuum-cleaners" },
      { name: "Mops & Buckets", link: "/categories/cleaning/mops-buckets" },
      { name: "Cleaning Chemicals", link: "/categories/cleaning/cleaning-chemicals" }
    ]
  },
  {
    link: "/categories/hand-tools",
    name: "Hand Tools",
    icon: "handToolsIcon",
    subcategories: [
      { name: "Wrenches", link: "/categories/hand-tools/wrenches" },
      { name: "Screwdrivers", link: "/categories/hand-tools/screwdrivers" },
      { name: "Pliers", link: "/categories/hand-tools/pliers" },
      { name: "Hammers", link: "/categories/hand-tools/hammers" }
    ]
  },
  {
    link: "/categories/testing-instruments",
    name: "Testing and Measuring Instruments",
    icon: "testingIcon",
    subcategories: [
      { name: "Multimeters", link: "/categories/testing-instruments/multimeters" },
      { name: "Calipers", link: "/categories/testing-instruments/calipers" },
      { name: "Thermometers", link: "/categories/testing-instruments/thermometers" }
    ]
  },
  {
    link: "/categories/agriculture",
    name: "Agriculture Garden & Landscaping",
    icon: "agricultureIcon",
    subcategories: [
      { name: "Sprayers", link: "/categories/agriculture/sprayers" },
      { name: "Garden Tools", link: "/categories/agriculture/garden-tools" },
      { name: "Irrigation Equipment", link: "/categories/agriculture/irrigation-equipment" }
    ]
  },
  {
    link: "/categories/safety",
    name: "Safety",
    icon: "safetyIcon",
    subcategories: [
      { name: "Helmets", link: "/categories/safety/helmets" },
      { name: "Gloves", link: "/categories/safety/gloves" },
      { name: "Safety Shoes", link: "/categories/safety/safety-shoes" },
      { name: "Eye Protection", link: "/categories/safety/eye-protection" }
    ]
  },
  {
    link: "/categories/pumps",
    name: "Pumps",
    icon: "pumpsIcon",
    subcategories: [
      { name: "Centrifugal Pumps", link: "/categories/pumps/centrifugal-pumps" },
      { name: "Submersible Pumps", link: "/categories/pumps/submersible-pumps" },
      { name: "Water Boosters", link: "/categories/pumps/water-boosters" }
    ]
  }
];
function SideMenu() {
const location=useLocation();
  const isSubcategoryPage = /^\/categories\/[^\/]+\/[^\/]+$/.test(location.pathname);
  const isProductPage = /^\/categories\/[^\/]+\/[^\/]+\/\d+$/.test(location.pathname);
  
  const [priceRange, setPriceRange] = useState({ min: "0", max: "50000" });
  const [discounts, setDiscounts] = useState([]);
  const [brands, setBrands] = useState([]);
  
  const discountOptions = [
    "10-20", "20-30", "30-40", "40-50", "50-60", "60-70", "70-80"
  ];

  const brandOptions = ["Brand 1", "Brand 2", "Brand 3", "Brand 4"];
  
 


  return (
    <>
   {!isProductPage && <div className="flex flex-col gap-4 p-4 bg-none h-full">

      {/* Accordion for Category Hiding on Products Tab */}
      {isSubcategoryPage ?  <FiltersnCategory priceRange={priceRange} discounts={discounts} brands={brands}setBrands={setBrands} setDiscounts={setDiscounts} setPriceRange={setPriceRange} discountOptions={discountOptions} brandOptions={brandOptions}/>:
     <div className="w-80 bg-white shadow-md rounded-lg p-4">
    {categoryMenuOptions.map((option, index) => (
    <div key={index} className="relative group">
      {/* Wrap NavLink and Submenu together */}
      <div className="flex items-center gap-2 p-2 group-hover:bg-blue-100 rounded-md cursor-pointer">
        <img src={icon1} alt={option.name} height={22} width={22} />
        <span className="!text-sm">{option.name}</span>
      </div>

      {/* Submenu visible on group hover */}
      <div className="hidden group-hover:block absolute left-full top-0 w-80 bg-white shadow-md rounded-lg p-4 z-10">
        {option.subcategories.map((subcategory, subIndex) => (
          <NavLink
            key={subIndex}
            to={subcategory.link}
            className="block p-2 hover:bg-blue-100 rounded-md text-sm"
          >
            <span className="!text-sm !text-gray-800">{subcategory.name}</span>
          </NavLink>
        ))}
      </div>

      {/* Transparent overlay on top to keep NavLink clickable */}
      <NavLink
        to={option.link}
        className="absolute inset-0 z-0"
      />
    </div>
  ))}

  <NavLink
    to="/categories"
    className="flex items-center gap-2 p-2 pr-0 hover:bg-orange-400 rounded-md"
  >
    <p className="!text-md poppins-semibold !text-orange-500 hover:!text-white w-full">
      See all Categories
    </p>
  </NavLink>
</div>}



</div>} 
   </>
  );
}


export default SideMenu;

function FiltersnCategory({discountOptions,brandOptions,priceRange,discounts,brands,setBrands,setDiscounts,setPriceRange}) {
   const handleCheckboxChange = (value, setState, currentState) => {
    if (currentState.includes(value)) {
      setState(currentState.filter((v) => v !== value));
    } else {
      setState([...currentState, value]);
    }
  };
  
  return (
    <>
    <Accordion className='w-80 bg-white shadow-md rounded-md'>
        <AccordionSummary
          expandIcon={<i class="ri-arrow-down-s-line text-lg"></i>}
          aria-controls="panel1-content"
          id="panel1-header"
          
        >
          <p className='!text-sm !text-blue-900 font-semibold'>Go to Categories</p>
        </AccordionSummary>
        <AccordionDetails>
          {categoryMenuOptions.map((option, index) => (
    <div key={index} className="relative group">
      {/* Wrap NavLink and Submenu together */}
      <div className="flex items-center gap-2 p-2 group-hover:bg-blue-100 rounded-md cursor-pointer">
        <img src={icon1} alt={option.name} height={22} width={22} />
        <span className="!text-sm">{option.name}</span>
      </div>

      {/* Submenu visible on group hover */}
      <div className="hidden group-hover:block absolute left-full top-0 w-80 bg-white shadow-md rounded-lg p-4 z-10">
        {option.subcategories.map((subcategory, subIndex) => (
          <NavLink
            key={subIndex}
            to={subcategory.link}
            className="block p-2 hover:bg-blue-100 rounded-md text-sm"
          >
            <span className="!text-sm !text-gray-800">{subcategory.name}</span>
          </NavLink>
        ))}
      </div>

      {/* Transparent overlay on top to keep NavLink clickable */}
      <NavLink
        to={option.link}
        className="absolute inset-0 z-0"
      />
    </div>
  ))}
        </AccordionDetails>
    </Accordion>
    <div className='w-full flex flex-col'>
      <Accordion className="w-80 bg-white shadow-md rounded-lg">
  <AccordionSummary
    expandIcon={<i className="ri-arrow-down-s-line text-lg" />}
    aria-controls="panel2-content"
    id="panel2-header"
  >
    <p className="!text-sm !text-blue-900 font-semibold">Filters</p>
  </AccordionSummary>

  <AccordionDetails>
    <div className="flex flex-col gap-6">

      {/* Price Range Filter */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Price Range:</label>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-gray-500">₹</span>
          <input
            type="number"
            min="0"
            max="50000"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: Number(e.target.value) })
            }
            className="w-24 p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <span className="text-gray-500 px-1">to</span>
          <span className="text-gray-500">₹</span>
          <input
            type="number"
            min="0"
            max="50000"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: Number(e.target.value) })
            }
            className="w-24 p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
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
          />
        </div>
      </div>

      {/* Discount Filter */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Discount:</label>
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
              {option} %
            </label>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Brand:</label>
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
              {brand}
            </label>
          ))}
        </div>
      </div>
    </div>
  </AccordionDetails>
  <AccordionActions>
    <button className='!text-sm !text-orange-500 mx-6 mb-2 poppins-semibold' onClick={()=>{
      setBrands([])
      setDiscounts([])
      setPriceRange({min:0,max:50000})
    }}>Clear All</button>
  </AccordionActions>
</Accordion>

      </div>
    </>
  );
}