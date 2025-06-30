// /src/contexts/AlertContext.jsx
import { createContext, useContext, useState } from "react";
import SnackBar from "../components/SnackBar";


const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <AlertContext.Provider value={{ showSnackBar, setShowSnackBar, message, setMessage }}>
      <SnackBar
        openSnackBar={showSnackBar}
        setopenSnackBar={setShowSnackBar}
        message={message}
        setMessage={setMessage}
      />
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
