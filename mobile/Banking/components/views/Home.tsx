import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useLayoutEffect } from "react";
import { CurrencyFormatter } from "../../core/utils/CurrencyFormatter";
import AssetCard from "../atoms/AssetCard";
import { ChevronDownIcon } from "react-native-heroicons/outline";
import { useAppDispatch, useAppSelector } from "../../core/store/store";
import { getAssets } from "../../core/store/features/assetSlice";
import { getAccounts } from "../../core/store/features/accountSlice";
import ScreenTemplate from "../templates/ScreenTemplate";
import { useModifyAsset } from "../../core/services/hooks/useModifyAsset";

const Home = () => {
  const assets = useAppSelector((state) => state.assets);
  const accounts = useAppSelector((state) => state.accounts);
  const dispatch = useAppDispatch();
  const assetMoify = useModifyAsset();

  useLayoutEffect(() => {
    initApp();
  }, []);

  // fetches data
  const initApp = useCallback(async () => {
    await dispatch(getAssets());
    await dispatch(getAccounts());
  }, []);

  return (
    <ScreenTemplate>
      <View className="w-full h-60 relative">
        <Text className="absolute right-0 top-3 text-gray-500 text-base">
          Hi Andrew <ChevronDownIcon size={13} color="#666666" />
        </Text>
      </View>
      <View className="h-32 w-full justify-center items-center">
        <Text
          className={`text-2xl ${
            accounts.totalBalance >= 0 ? "text-green-700" : "text-red-700"
          }`}
        >
          {CurrencyFormatter.format(accounts.totalBalance)}
        </Text>
        <Text className="text-xs text-gray-500">Current total balance</Text>
      </View>
      <View className="w-full h-8 items-center justify-between flex-row-reverse">
        <TouchableOpacity onPress={() => assetMoify.openModifyAssetScreen(0)}>
          <Text className="text-blue-500 text-base">Create</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          // paddingHorizontal: 15,
          paddingVertical: 15,
        }}
        showsVerticalScrollIndicator={false}
      >
        {assets.assets.map((asset) => {
          return (
            <AssetCard
              key={asset.id}
              id={asset.id}
              amount={asset.amount}
              date={new Date(asset.expenseDate)}
              accountName={asset.account?.name || ""}
              isExpense={asset.isExpense}
            />
          );
        })}
      </ScrollView>
    </ScreenTemplate>
  );
};

export default Home;
