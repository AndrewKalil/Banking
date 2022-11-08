import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getAsset, setAsset } from "../../store/features/assetSlice";
import { Asset } from "../../models/asset.model";

export const useModifyAsset = () => {
  const navigation = useNavigation();
  const assets = useAppSelector((state) => state.assets);
  const dispatch = useAppDispatch();

  const openModifyAssetScreen = (id: number) => {
    setAssetState(id).then((success) => {
      navigation.navigate("ModifyAsset");
    });
  };

  const setAssetState = async (id: number) => {
    if (id > 0) {
      const selectedAsset = assets.assets.find((x) => x.id === id);
      dispatch(setAsset(selectedAsset as Asset));
    } else {
      dispatch(
        setAsset({
          id: 0,
          amount: 0,
          expenseDate: new Date().toString(),
          isExpense: false,
          name: "",
        })
      );
    }
  };

  const fetchAsset = async (id: number) => {
    return await dispatch(getAsset(id));
  };

  let modifyAssetHook = {
    openModifyAssetScreen,
  };

  return modifyAssetHook;
};
