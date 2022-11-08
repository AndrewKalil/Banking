import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";
import {
  closeSnackbar,
  resetDescription,
  resetSeverity,
} from "../../../data/features/snackbar/snackbarSlice";
import { useAppDispatch, useAppSelector } from "../../../data/store";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.snackbar);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(closeSnackbar());
    dispatch(resetDescription());
    dispatch(resetSeverity());
  };

  return (
    <Snackbar
      open={selector.open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      key={"bottomright"}
    >
      <Alert
        onClose={handleClose}
        severity={selector.severity}
        sx={{ width: "100%" }}
      >
        {selector.description}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
