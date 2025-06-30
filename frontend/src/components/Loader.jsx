// /src/components/Loader.jsx
import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.3)", // semi-transparent background
        backdropFilter: "blur(6px)", // actual blur effect
        WebkitBackdropFilter: "blur(6px)", // for Safari
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <CircularProgress size={40} thickness={3} />
    </Box>
  );
};

export default Loader;
