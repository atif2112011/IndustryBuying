import { NavLink, useParams } from "react-router-dom"



  


function HelpSideMenu({options,setSearchTerm}){

    const {helpid}=useParams();
   
    return <>
    <div className="flex flex-col gap-4 p-4 pl-0 pt-0 bg-none h-full">
        <div className="w-80 bg-white shadow-md rounded-lg p-4">
            <h3 className="!font-medium text-left px-4 py-2">FAQ Categories</h3>
            {options.map((option, index) => (
                <div key={index} className="relative group">

                  {/* Wrap NavLink and Submenu together */}
                  <div className={`flex items-center gap-2 p-2 group-hover:bg-blue-100 rounded-md cursor-pointer ${option.link=='/help/'+helpid?"bg-blue-100 rounded-md font-semibold":""}`} >
                    <i className={"ri-question-line text-lg"} ></i>
                    <span className="!text-sm">{option.category}</span>
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
                    onClick={()=>setSearchTerm("")}
                  />
                </div>
              ))}
        
              
        </div>
    </div>
    
    </>
}

export default HelpSideMenu