// /src/contexts/LoaderContext.jsx
import { createContext, useContext, useState } from "react";
import Loader from "../components/Loader";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {loading && <Loader />} {/* Conditionally show loader */}
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
