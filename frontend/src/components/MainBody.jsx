
import { Outlet, useLocation } from "react-router-dom";
import SideMenu from "./SideMenu";
import Footer from "./Footer";
import ProfileSideMenu from "./ProfileSideMenu";

function MainBody() {
  const location = useLocation();

  const isAccountPage = location.pathname.startsWith('/user');


  return (
    <div className="flex flex-row p-6 rounded-lg flex-1 gap-4 items-start">  
      
      {/*Side Menu*/}
      {/* <div className="w-80 bg-white shadow-md rounded-lg p-4">
        Side Menu
        </div> */}
        {isAccountPage?<ProfileSideMenu/>:<SideMenu/>}
        {/*Side Menu ends*/}

          {/* Main Content - scrollable */}
            <div className="flex-1 overflow-y-auto rounded-lg p-4 h-screen hide-scroll">
            
            <Outlet/>
            </div>
            {/* Main Content - scrollable  ends*/}

           
    </div>
  );
}

export default MainBody;