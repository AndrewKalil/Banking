import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataType, FormData } from "../../../core/models/form.model";

type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Content =
  | "editForm"
  | "createForm"
  | "confirmation"
  | "default"
  | "filters";
interface ButtonData {
  color: string;
  title: string;
  action: any;
}

interface ModalState {
  open: boolean;
  title: string;
  description?: string;
  width: Size;
  contentType: Content;
  dataType: DataType;
  ids?: number[];
  formData: FormData;
}

const initialState: ModalState = {
  open: false,
  title: "",
  width: "md",
  contentType: "default",
  dataType: "asset",
  description: "",
  formData: { controls: [], lists: [], object: {} },
};

// reducers
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.open = true;
    },
    closeModal: (state) => {
      state.open = false;
      state.contentType = "default";
      state.dataType = "asset";
      state.description = "";
      state.formData = { controls: [], object: {}, lists: [] };
      state.ids = [];
      state.title = "";
      state.width = "sm";
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setWidth: (state, action: PayloadAction<Size>) => {
      state.width = action.payload;
    },

    setContentType: (state, action: PayloadAction<Content>) => {
      state.contentType = action.payload;
    },

    setdataType: (state, action: PayloadAction<DataType>) => {
      state.dataType = action.payload;
    },

    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },

    setIds: (state, action: PayloadAction<number[]>) => {
      state.ids = action.payload;
    },

    setFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = action.payload;
    },
  },
});

export default modalSlice.reducer;
export const {
  openModal,
  closeModal,
  setTitle,
  setWidth,
  setContentType,
  setdataType,
  setDescription,
  setIds,
  setFormData,
} = modalSlice.actions;
