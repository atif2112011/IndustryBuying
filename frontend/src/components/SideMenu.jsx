import { NavLink, useNavigate } from 'react-router-dom';
import icon1 from "../assets/icons/survey-line.svg";
function SideMenu() {

    const categoryMenuOptions = [
  { link: "/categories/office-supplies", name: "Office Supplies", icon: "officeIcon" },
  { link: "/categories/electrical", name: "Electrical", icon: "electricalIcon" },
  { link: "/categories/industrial-automation", name: "Industrial Automation", icon: "industrialIcon" },
  { link: "/categories/material-handling", name: "Material Handling and Packaging", icon: "materialIcon" },
  { link: "/categories/power-tools", name: "Power Tools", icon: "powerToolsIcon" },
  { link: "/categories/furniture", name: "Furniture, Hospitality and Food Service", icon: "furnitureIcon" },
  { link: "/categories/cleaning", name: "Cleaning", icon: "cleaningIcon" },
  { link: "/categories/hand-tools", name: "Hand Tools", icon: "handToolsIcon" },
  { link: "/categories/testing-instruments", name: "Testing and Measuring Instruments", icon: "testingIcon" },
  { link: "/categories/agriculture", name: "Agriculture Garden & Landscaping", icon: "agricultureIcon" },
  { link: "/categories/safety", name: "Safety", icon: "safetyIcon" },
  { link: "/categories/pumps", name: "Pumps", icon: "pumpsIcon" },
  { link: "/categories", name: "See all Categories", icon: "seeAllIcon" }
];

  return (
  <div className="w-80 bg-white shadow-md rounded-lg p-4">
    {categoryMenuOptions.map((option,index)=>{
        return <NavLink to={option.link} className="flex items-center gap-2 p-2 hover:bg-blue-100 rounded-md">
          {/* <img src={require(`../assets/icons/${option.icon}.svg`)} alt={option.name} height={22} width={22} /> */}
          <img src={icon1} alt={option.name} height={22} width={22} />
          <span>{option.name}</span>
        </NavLink>
    })}
   </div>
  );
}

export default SideMenu;