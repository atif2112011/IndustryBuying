
import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";

function MainBody() {
  return (
    <div className="flex flex-row p-6 shadow-md rounded-lg flex-1 gap-4">  
      
      {/*Side Menu*/}
      {/* <div className="w-80 bg-white shadow-md rounded-lg p-4">
        Side Menu
        </div> */}
        <SideMenu/>
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