import { Outlet, useLocation, useParams } from "react-router-dom";
import SideMenu from "./SideMenu";
import Footer from "./Footer";
import ProfileSideMenu from "./ProfileSideMenu";
import { useEffect, useState } from "react";
import { getMenu } from "../apis/category";

function MainBody() {
  const location = useLocation();

  const isAccountPage = location.pathname.startsWith("/user");
  const [showSideMenu, setShowSideMenu] = useState(false);
  const isSubcategoryPage = /^\/categories\/[^\/]+\/[^\/]+$/.test(
    location.pathname
  );
  const isProductPage = /^\/categories\/[^\/]+\/[^\/]+\/\d+$/.test(
    location.pathname
  );
  const [menu, setMenu] = useState([]);
  const isUserPage = location.pathname.startsWith("/user");

  const params = useParams();
  let skipMenu = false;
  if (params.productId) {
    skipMenu = true;
  }
  useEffect(() => {
   const fetchmenu=async()=>{
     try {
      const response = await getMenu();
      if (response.success) {
        setMenu(response.menu);
        console.log("menu", response.menu);
      } else throw new Error(response.message);
    } catch (error) {
      console.error(error);
    }
   }

   fetchmenu()
  }, []);
  return (
    <div className="relative flex flex-col md:flex-row  p-4 md:p-6 rounded-lg flex-1 gap-4 items-start">
      {/*Side Menu*/}
      {/* <div className="w-80 bg-white shadow-md rounded-lg p-4">
        Side Menu
        </div> */}
      {!skipMenu && (
        <div
          onClick={() => setShowSideMenu(true)}
          className="md:hidden w-fit py-2 px-3 bg-white shadow-md rounded-md font-medium text-neutral-600 text-xs items-center border border-gray-200"
        >
          {isUserPage && (
            <span className="!font-medium !text-neutral-600 !text-xs">
              Select Account Action
            </span>
          )}
          {isSubcategoryPage && !isUserPage && (
            <span className="!font-medium !text-neutral-600 !text-xs">
              Category / Filters
            </span>
          )}
          {!isSubcategoryPage && !isUserPage && (
            <span className="!font-medium !text-neutral-600 !text-xs">
              Select Category
            </span>
          )}
        </div>
      )}
      {isAccountPage ? (
        <ProfileSideMenu
          showSideMenu={showSideMenu}
          setShowSideMenu={setShowSideMenu}
        />
      ) : (
        <SideMenu
          setShowSideMenu={setShowSideMenu}
          showSideMenu={showSideMenu}
          menu={menu}
        />
      )}
      {/*Side Menu ends*/}

      {/* Main Content - scrollable */}
      <div
        className="flex-1 max-w-[100%] overflow-y-auto rounded-lg p-1 md:p-4 h-screen hide-scroll"
        onClick={() => setShowSideMenu(false)}
      >
        <Outlet />
      </div>
      {/* Main Content - scrollable  ends*/}
    </div>
  );
}

export default MainBody;
