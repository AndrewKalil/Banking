import React from "react";
import "./App.scss";
import Navbar from "./components/organisms/navbar";
import AppTemplate from "./components/templates/app-template";
import RouterLayout from "./components/templates/router-layout";
import Modal from "./components/widgets/modal";
import CustomScrollbars from "./components/widgets/scrollbar";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CustomSnackbar from "./components/atoms/custom-snackbar";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <AppTemplate>
        <Navbar />
        <div id="content">
          <CustomScrollbars>
            <RouterLayout />
          </CustomScrollbars>
          <Modal />
          <CustomSnackbar />
        </div>
      </AppTemplate>
    </LocalizationProvider>
  );
}

export default App;
