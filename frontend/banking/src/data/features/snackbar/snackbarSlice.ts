import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Severity = "error" | "warning" | "info" | "success";

interface SnackBar {
  open: boolean;
  description: string;
  severity: Severity;
}

const initialState: SnackBar = {
  open: false,
  description: "",
  severity: "success",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar: (state) => {
      state.open = true;
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    resetDescription: (state) => {
      state.description = "";
    },
    setSeverity: (state, action: PayloadAction<Severity>) => {
      state.severity = action.payload;
    },
    resetSeverity: (state) => {
      state.severity = "success";
    },
  },
});

export default snackbarSlice.reducer;
export const {
  closeSnackbar,
  openSnackbar,
  resetDescription,
  resetSeverity,
  setDescription,
  setSeverity,
} = snackbarSlice.actions;
