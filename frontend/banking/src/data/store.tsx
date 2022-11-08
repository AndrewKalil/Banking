import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import accountSlice from "./features/account/accountSlice";
import assetSlice from "./features/asset/assetSlice";
import categorySlice from "./features/category/categorySlice";
import modalSlice from "./features/modal/modalSlice";
import snackbarSlice from "./features/snackbar/snackbarSlice";
import transferSlice from "./features/transfer/transferSlice";

export const store = configureStore({
  reducer: {
    assets: assetSlice,
    categories: categorySlice,
    accounts: accountSlice,
    transfer: transferSlice,
    modal: modalSlice,
    snackbar: snackbarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
