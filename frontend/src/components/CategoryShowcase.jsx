// ProductShowcaseElectrical.js
import React, { useEffect, useState } from 'react';
import sampleproduct from '../assets/images/productImages/product2.jpg'; // Adjust the path as necessary
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

// const categoryMenuOptions = [
//   {
//     link: "/categories/office-supplies",
//     name: "Office Supplies",
//     icon: "officeIcon",
//     subcategories: [
//       { name: "Stationery", link: "/categories/office-supplies/stationery" },
//       { name: "Printers", link: "/categories/office-supplies/printers" },
//       { name: "Paper Products", link: "/categories/office-supplies/paper-products" }
//     ]
//   },
//   {
//     link: "/categories/electrical",
//     name: "Electrical",
//     icon: "electricalIcon",
//     subcategories: [
//       { name: "Wires & Cables", link: "/categories/electrical/wires-cables" },
//       { name: "Switches", link: "/categories/electrical/switches" },
//       { name: "Circuit Breakers", link: "/categories/electrical/circuit-breakers" },
//       { name: "Wires & Cables2", link: "/categories/electrical/wires-cables" },
//       { name: "Switches2", link: "/categories/electrical/switches" },
//       { name: "Circuit Breakers2", link: "/categories/electrical/circuit-breakers" }
//     ]
//   },
//   {
//     link: "/categories/industrial-automation",
//     name: "Industrial Automation",
//     icon: "industrialIcon",
//     subcategories: [
//       { name: "PLCs", link: "/categories/industrial-automation/plcs" },
//       { name: "Sensors", link: "/categories/industrial-automation/sensors" },
//       { name: "Motor Drives", link: "/categories/industrial-automation/motor-drives" },
//       { name: "SCADA Systems", link: "/categories/industrial-automation/scada-systems" }
//     ]
//   },
//   {
//     link: "/categories/material-handling",
//     name: "Material Handling and Packaging",
//     icon: "materialIcon",
//     subcategories: [
//       { name: "Trolleys", link: "/categories/material-handling/trolleys" },
//       { name: "Conveyors", link: "/categories/material-handling/conveyors" },
//       { name: "Pallet Jacks", link: "/categories/material-handling/pallet-jacks" }
//     ]
//   },
//   {
//     link: "/categories/power-tools",
//     name: "Power Tools",
//     icon: "powerToolsIcon",
//     subcategories: [
//       { name: "Drills", link: "/categories/power-tools/drills" },
//       { name: "Grinders", link: "/categories/power-tools/grinders" },
//       { name: "Saws", link: "/categories/power-tools/saws" },
//       { name: "Impact Wrenches", link: "/categories/power-tools/impact-wrenches" }
//     ]
//   },
//   {
//     link: "/categories/furniture",
//     name: "Furniture, Hospitality and Food Service",
//     icon: "furnitureIcon",
//     subcategories: [
//       { name: "Office Chairs", link: "/categories/furniture/office-chairs" },
//       { name: "Cafeteria Tables", link: "/categories/furniture/cafeteria-tables" },
//       { name: "Service Trolleys", link: "/categories/furniture/service-trolleys" }
//     ]
//   },
//   {
//     link: "/categories/cleaning",
//     name: "Cleaning",
//     icon: "cleaningIcon",
//     subcategories: [
//       { name: "Vacuum Cleaners", link: "/categories/cleaning/vacuum-cleaners" },
//       { name: "Mops & Buckets", link: "/categories/cleaning/mops-buckets" },
//       { name: "Cleaning Chemicals", link: "/categories/cleaning/cleaning-chemicals" }
//     ]
//   },
//   {
//     link: "/categories/hand-tools",
//     name: "Hand Tools",
//     icon: "handToolsIcon",
//     subcategories: [
//       { name: "Wrenches", link: "/categories/hand-tools/wrenches" },
//       { name: "Screwdrivers", link: "/categories/hand-tools/screwdrivers" },
//       { name: "Pliers", link: "/categories/hand-tools/pliers" },
//       { name: "Hammers", link: "/categories/hand-tools/hammers" }
//     ]
//   },
//   {
//     link: "/categories/testing-instruments",
//     name: "Testing and Measuring Instruments",
//     icon: "testingIcon",
//     subcategories: [
//       { name: "Multimeters", link: "/categories/testing-instruments/multimeters" },
//       { name: "Calipers", link: "/categories/testing-instruments/calipers" },
//       { name: "Thermometers", link: "/categories/testing-instruments/thermometers" }
//     ]
//   },
//   {
//     link: "/categories/agriculture",
//     name: "Agriculture Garden & Landscaping",
//     icon: "agricultureIcon",
//     subcategories: [
//       { name: "Sprayers", link: "/categories/agriculture/sprayers" },
//       { name: "Garden Tools", link: "/categories/agriculture/garden-tools" },
//       { name: "Irrigation Equipment", link: "/categories/agriculture/irrigation-equipment" }
//     ]
//   },
//   {
//     link: "/categories/safety",
//     name: "Safety",
//     icon: "safetyIcon",
//     subcategories: [
//       { name: "Helmets", link: "/categories/safety/helmets" },
//       { name: "Gloves", link: "/categories/safety/gloves" },
//       { name: "Safety Shoes", link: "/categories/safety/safety-shoes" },
//       { name: "Eye Protection", link: "/categories/safety/eye-protection" }
//     ]
//   },
//   {
//     link: "/categories/pumps",
//     name: "Pumps",
//     icon: "pumpsIcon",
//     subcategories: [
//       { name: "Centrifugal Pumps", link: "/categories/pumps/centrifugal-pumps" },
//       { name: "Submersible Pumps", link: "/categories/pumps/submersible-pumps" },
//       { name: "Water Boosters", link: "/categories/pumps/water-boosters" }
//     ]
//   }
// ];

const CategoryShowcase = ({categoryData}) => {
  const navigate = useNavigate();
  const params = useParams();
  

  
  useEffect(()=>{
    
  },[])

  return (
    <div className='py-4'>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {categoryData && categoryData.map((item) => (
    <div key={item.name} className="bg-white rounded-lg p-2 md:p-4 shadow-sm max-w-64">
      <img
        src={item?.products[0]?.images[0] || sampleproduct}
        alt={item.name}
        className="h-[80px] md:h-32 w-full object-contain cursor-pointer"
        onClick={() => navigate(`/categories/${params.categoryId}/${item.slug}`)}
      />

      <p className="my-2 !font-semibold !text-[0.75rem] md:!text-sm">
        {item.name}
      </p>

      {(item.products && item.products.length > 0) ? (
        <ul className="text-[0.5rem] md:!text-xs text-blue-900 space-y-1 cursor-pointer font-semibold">
          {item.products.map((product) => (
            <li
              key={product._id}
              className="hover:text-blue-500"
              onClick={() => navigate(`/categories/${params.categoryId}/${item.slug}/${product._id}`)}
            >
              ● {product.name}
            </li>
          ))}
        </ul>
      ):(
        <div className="text-[0.5rem] md:!text-xs text-blue-900 space-y-1 cursor-pointer font-semibold">
          No products found
        </div>
      )}
     

      <a
        href="#"
        className="!text-[0.65rem] md:!text-sm text-red-500 font-semibold mt-3 inline-block hover:scale-105 transition-transform duration-200"
        onClick={() => navigate(`/categories/${params.categoryId}/${item.slug}`)}     
      >
        See all
      </a>
    </div>
  ))}
</div>

    </div>
  );
};

export default CategoryShowcase;
