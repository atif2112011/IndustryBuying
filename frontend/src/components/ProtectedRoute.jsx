import { useEffect } from "react"
import { useLoader } from "../contexts/LoaderContext";
import { useAlert } from "../contexts/AlertContext";
import { VerifyUser } from "../apis/auth";
import { getUser } from "../apis/user";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    const {setLoading}=useLoader();
    const {setMessage, setShowSnackBar}=useAlert();
    const {user, setUser}=useAuth();
    const navigate=useNavigate();


     useEffect(()=>{
       //Check user is logged in or not
       const checkUser = async () => {
         try {
           
           const response = await VerifyUser();
           if (response?.success) {
             
             const getUserResponse=await getUser(response.userId);
             if(getUserResponse?.success)
             {
               setUser(getUserResponse.user);
               setLoading(false);
              //  setMessage("Welcome"+" "+getUserResponse.user.name);
              //  setShowSnackBar(true);
              //  console.log("User Retrieved", getUserResponse?.user);
             }
             else
             {
               throw new Error(getUserResponse?.message || getUserResponse);
             }
   
           } else {
             setLoading(false);
             setMessage("Session Expired!! Login Again");
             setShowSnackBar(true);
             navigate("/user/login");
            throw new Error(response?.message || response);
           }
         } catch (error) {
           setLoading(false);
           
           console.error(error?.message || error);
         }
       };
       setLoading(true);
       checkUser();
      
     },[])
    return <>{children}</>
}

export default ProtectedRoute