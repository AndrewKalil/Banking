import { createSlice } from "@reduxjs/toolkit";

interface AppInteractionState {
  slider: {
    isOpen: boolean;
  };
}

const initialState: AppInteractionState = {
  slider: {
    isOpen: false,
  },
};

export const appInteractionSlice = createSlice({
  name: "appInteraction",
  initialState,
  reducers: {
    openSlider: (state) => {
      state.slider.isOpen = true;
    },
    closeSlider: (state) => {
      state.slider.isOpen = false;
    },
  },
});
