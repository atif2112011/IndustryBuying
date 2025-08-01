import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { LogoutUser } from "../apis/auth";
import { useLoader } from "../contexts/LoaderContext";
import { useAlert } from "../contexts/AlertContext";
import { useState } from "react";

const ProfileMenuOptions = [
  {
    link: "/user",
    name: "Account and Addresses",
    icon: "ri-account-box-line",
  },
  {
    link: "/user/order-and-billing",
    name: "My Orders",
    icon: "ri-archive-line",
  },
  {
    link: "/user/invoices",
    name: "My Invoices",
    icon: "ri-file-list-3-line",
  }
];

function ProfileSideMenu({ showSideMenu, setShowSideMenu }) {
  const { setLoading } = useLoader();
  const { setMessage, setShowSnackBar } = useAlert();
  const navigate = useNavigate();
  const [selectedTab,setselectedTab]=useState("Account and Addresses");
  const handleLogoutUser = async () => {
    setLoading(true);
    const response = await LogoutUser();
    setLoading(false);
    if (response.success) {
      setShowSnackBar(true);
      setMessage(response.message);
      navigate("/user/login");
    } else {
      setShowSnackBar(true);
      setMessage(response.message);
    }
  };
  

  return (
    <>
      <div
        className={`
      absolute top-0 left-0 z-30 w-3/4 max-h-9/10 
      transform transition-transform duration-300 ease-in-out
      ${showSideMenu ? "translate-x-0" : "-translate-x-full"}
      md:relative md:translate-x-0 md:flex md:w-fit md:h-full md:top-auto md:left-auto
      flex flex-col gap-4 p-4
    `}
      >
        <div className="md:w-80 bg-white shadow-md rounded-lg p-2 md:p-4">
          {ProfileMenuOptions.map((option, index) => (
            <div key={index} className="relative group">
              {/* Wrap NavLink and Submenu together */}
              <div className={`flex items-center gap-2 p-2 group-hover:bg-blue-100 ${selectedTab===option.name?" bg-blue-100 ":""} rounded-md cursor-pointer`}>
                <i className={option.icon + " text-md md:text-lg"}></i>
                <span className="!text-xs md:!text-sm">{option.name}</span>
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
              <NavLink onClick={() => setselectedTab(option.name)} to={option.link} className="absolute inset-0 z-0" />
            </div>
          ))}

          <button onClick={handleLogoutUser} className="!text-xs md:!text-sm poppins-semibold !text-orange-500 trasition:transform duration:200 hover:scale-105 p-2 flex gap-2 items-center">
            <i className="ri-logout-circle-line text-sm md:text-lg"></i>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileSideMenu;
