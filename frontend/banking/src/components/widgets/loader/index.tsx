import { Backdrop, Button, CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <CircularProgress
        color="inherit"
        className="align-middle justify-center"
      />
    </div>
  );
};

export default Loader;
