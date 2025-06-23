import { NavLink } from "react-router-dom"


const ProfileMenuOptions = [
  {
    link: "/user",
    name: "Account and Business",
    icon: "ri-account-box-line"
  },
  {
    link: "/user/order-and-billing",
    name: "Order and Billings",
    icon: "ri-archive-line"
  },
  {
    link: "user/support",
    name: "Support and Services",
    icon: "ri-customer-service-2-line"
  },
  
]

function ProfileSideMenu(){
    return <>
    <div className="flex flex-col gap-4 p-4 bg-none h-full">
        <div className="w-80 bg-white shadow-md rounded-lg p-4">

            {ProfileMenuOptions.map((option, index) => (
                <div key={index} className="relative group">

                  {/* Wrap NavLink and Submenu together */}
                  <div className="flex items-center gap-2 p-2 group-hover:bg-blue-100 rounded-md cursor-pointer">
                    <i className={option.icon +" text-lg"}></i>
                    <span className="!text-sm">{option.name}</span>
                  </div>
            
                  {/* Submenu visible on group hover */}
                  {/* <div className="hidden group-hover:block absolute left-full top-0 w-80 bg-white shadow-md rounded-lg p-4 z-10">
                    {option.subcategories.map((subcategory, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={subcategory.link}
                        className="block p-2 hover:bg-blue-100 rounded-md text-sm"
                      >
                        <span className="!text-sm !text-gray-800">{subcategory.name}</span>
                      </NavLink>
                    ))}
                  </div> */}
            
                  {/* Transparent overlay on top to keep NavLink clickable */}
                  <NavLink
                    to={option.link}
                    className="absolute inset-0 z-0"
                  />
                </div>
              ))}
            
              
                <button className="!text-md poppins-semibold !text-orange-500 trasition:transform duration:200 hover:scale-105 p-2 flex gap-2 items-center" >
                    <i className="ri-logout-circle-line text-lg"></i>
                    Logout
                </button>
              
        </div>
    </div>
    
    </>
}

export default ProfileSideMenu