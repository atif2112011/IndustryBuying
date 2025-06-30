import { createContext, useContext, useState, useEffect } from "react";
import { useLoader } from "./LoaderContext";

import { useNavigate } from "react-router-dom";


const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const {setLoading}=useLoader();
    


//    useEffect(() => {
//      setLoading(true); // Start loading
//   const checkAuth = async () => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       try {
//         const userData = await verifyTokenAndGetUser(token);
//         setUser(userData);
//       } catch (error) {
//         console.error("Invalid or expired token");
//         setUser(null); // Clear user state if token is invalid
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       if (!user) {
//         console.log("No token found, user is not authenticated");
//         setUser(null); // Ensure user state is cleared if no token
//         // window.location.href = "/login"; // Redirect to login
//       }
//       setLoading(false); // Ensure loading stops
//     }
//   };

//   checkAuth();
// }, []); // Only run once on mount — do not depend on [user]



  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
