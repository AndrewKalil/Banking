import { View, Text, ScrollView, TextInput, Switch } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import ScreenTemplate from "../templates/ScreenTemplate";
import FormScreenTemplate from "../templates/FormScreenTemplate";
import { useAppDispatch, useAppSelector } from "../../core/store/store";
import CurrencyInput from "react-native-currency-input";
import { Asset, AssetDto } from "../../core/models/asset.model";
import { getCategories } from "../../core/store/features/categorySlice";
import { Category } from "../../core/models/category.model";
import DropdownSelect from "../atoms/DropdownSelect";
import { getAccounts } from "../../core/store/features/accountSlice";
import { Account } from "../../core/models/account.model";

const ModifyAsset = () => {
  const asset = useAppSelector((state) => state.assets.asset);
  const categories = useAppSelector((state) => state.categories);
  const accounts = useAppSelector((state) => state.accounts);
  const [item, setItem] = useState<AssetDto>({
    id: asset.id,
    amount: asset.amount,
    expenseDate: asset.expenseDate,
    isExpense: asset.isExpense,
    name: asset.name,
    account: asset.account,
    accountId: asset.accountId,
    category: asset.category,
    categoryId: asset.categoryId,
    createdDate: asset.createdDate,
    updatedDate: asset.updatedDate,
    description: asset.description,
    isTransfer: asset.isTransfer,
  });
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    initApp();
  }, []);

  // fetches data
  const initApp = useCallback(async () => {
    await dispatch(getCategories());
    await dispatch(getAccounts());
  }, []);

  const onCategorySelect = (selected: Category, categoryId: number) => {
    setItem({ ...item, category: selected, categoryId: categoryId });
  };

  const onAccountSelect = (selected: Account, accountId: number) => {
    setItem({ ...item, account: selected, accountId: accountId });
  };

  const onAccountToSelect = (selected: Account, accountId: number) => {
    setItem({ ...item, accountTo: selected, accountToId: accountId });
  };

  return (
    <ScreenTemplate>
      <FormScreenTemplate>
        <View className="w-full h-32 justify-center items-center">
          <CurrencyInput
            className="text-3xl text-gray-500"
            value={item.amount}
            onChangeValue={(e) => {
              setItem({ ...item, amount: e || 0 });
            }}
            prefix="COP "
            delimiter=","
            separator="."
            precision={0}
            onChangeText={(formattedValue) => {
              console.log(formattedValue); // $2,310.46
            }}
          />
        </View>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            // paddingHorizontal: 15,
            paddingVertical: 15,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full h-12 items-center justify-between flex-row">
            <Text className="text-base font-bold text-gray-500">
              Description
            </Text>
            <TextInput
              style={{ textAlign: "right" }}
              maxLength={25}
              className="text-base text-gray-500 w-56 h-12 pb-2"
              value={item.name}
              onChange={(e: any) =>
                setItem({
                  ...item,
                  description: e.target.value,
                  name: e.target.value,
                })
              }
            />
          </View>

          <View className="w-full h-12 items-center justify-between flex-row">
            <Text className="text-base font-bold text-gray-500">Category</Text>
            {/* <Text className="text-base text-gray-500">{item.accountId}</Text> */}
            <DropdownSelect
              data={categories.categories}
              item={item}
              defaultValue={item.category?.name || "Select a category"}
              onSelect={onCategorySelect}
            />
          </View>

          <View className="w-full h-12 items-center justify-between flex-row">
            <Text className="text-base font-bold text-gray-500">Account</Text>
            <DropdownSelect
              data={accounts.accounts}
              item={item}
              defaultValue={item.account?.name || "Select an account"}
              onSelect={onAccountSelect}
            />
          </View>

          <View className="w-full h-12 items-center justify-between flex-row">
            <Text className="text-base font-bold text-gray-500">Expense</Text>
            <Switch
              disabled={item.isTransfer}
              value={item.isExpense}
              onValueChange={(e: any) =>
                setItem({ ...item, isExpense: !item.isExpense })
              }
            />
            {/* <Text className="text-base text-gray-500">{asset.amount}</Text> */}
          </View>

          <View className="w-full h-12 items-center justify-between flex-row">
            <Text className="text-base font-bold text-gray-500">Transfer</Text>
            <Switch
              value={item.isTransfer}
              onValueChange={(e: any) =>
                setItem({
                  ...item,
                  isTransfer: !item.isTransfer,
                  isExpense: true,
                })
              }
            />
            {/* <Text className="text-base text-gray-500">{asset.amount}</Text> */}
          </View>

          {item.isTransfer && (
            <View className="w-full h-12 items-center justify-between flex-row">
              <Text className="text-base font-bold text-gray-500">
                Account to
              </Text>
              <DropdownSelect
                data={accounts.accounts.filter((x) => x.id !== item.accountId)}
                item={item}
                defaultValue={item.accountTo?.name || "Select an account"}
                onSelect={onAccountToSelect}
              />
            </View>
          )}

          <View className="w-full h-12 items-center justify-between flex-row">
            <Text className="text-base font-bold text-gray-500">Date</Text>
            <Text className="text-base text-gray-500">
              {new Date().toDateString()}
            </Text>
          </View>
        </ScrollView>
      </FormScreenTemplate>
    </ScreenTemplate>
  );
};

export default ModifyAsset;
