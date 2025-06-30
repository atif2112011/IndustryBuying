
import { Outlet, useLocation } from "react-router-dom";
import SideMenu from "./SideMenu";
import Footer from "./Footer";
import ProfileSideMenu from "./ProfileSideMenu";
import { useState } from "react";

function MainBody() {
  const location = useLocation();

  const isAccountPage = location.pathname.startsWith('/user');
  const [showSideMenu, setShowSideMenu] = useState(false);


  return (
    <div className="relative flex flex-col md:flex-row  p-4 md:p-6 rounded-lg flex-1 gap-4 items-start">  
      
      {/*Side Menu*/}
      {/* <div className="w-80 bg-white shadow-md rounded-lg p-4">
        Side Menu
        </div> */}
        <div 
        onClick={()=>setShowSideMenu(true)}
        className="md:hidden w-fit py-2 px-3 bg-white shadow-md rounded-md font-medium text-neutral-600 text-xs items-center border border-gray-200">
        
        
          Select Category/ Subcategory
        </div>
        {isAccountPage?<ProfileSideMenu showSideMenu={showSideMenu} setShowSideMenu={setShowSideMenu}/>:<SideMenu setShowSideMenu={setShowSideMenu} showSideMenu={showSideMenu}/>}
        {/*Side Menu ends*/}

          {/* Main Content - scrollable */}
            <div className="flex-1 max-w-[100%] overflow-y-auto rounded-lg p-1 md:p-4 h-screen hide-scroll" onClick={()=>setShowSideMenu(false)}>
                
            <Outlet/>
            </div>
            {/* Main Content - scrollable  ends*/}

           
    </div>
  );
}

export default MainBody;