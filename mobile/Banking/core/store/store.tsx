import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import accountSlice from "./features/accountSlice";
import assetSlice from "./features/assetSlice";
import categorySlice from "./features/categorySlice";

export const store = configureStore({
  reducer: {
    assets: assetSlice,
    categories: categorySlice,
    accounts: accountSlice,
    // transfer: transferSlice,
    // modal: modalSlice,
    // snackbar: snackbarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
