import { Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { PencilSquareIcon, TrashIcon } from "react-native-heroicons/outline";
import { CurrencyFormatter } from "../../core/utils/CurrencyFormatter";
import { useModifyAsset } from "../../core/services/hooks/useModifyAsset";

interface Props {
  id: number;
  amount: number;
  date: Date;
  accountName: string;
  isExpense: boolean;
}

const AssetCard: FC<Props> = ({
  id,
  amount = 0,
  date = new Date(),
  accountName,
  isExpense,
}) => {
  const assetMoify = useModifyAsset();

  return (
    <View className="h-20 w-full bg-gray-200 rounded-md shadow-sm mb-4 flex-row">
      <View className="flex-1 h-full p-2">
        <Text className="text-xs text-gray-500">{accountName}</Text>
        <Text
          className={`text-lg ${
            amount * (isExpense ? -1 : 1) >= 0
              ? "text-green-700"
              : "text-red-700"
          }`}
        >
          {CurrencyFormatter.format(amount)}
        </Text>
        <Text className="text-sm text-gray-500">{date.toDateString()}</Text>
      </View>
      <View className="w-20 flex-row justify-around items-center">
        <TouchableOpacity onPress={() => assetMoify.openModifyAssetScreen(id)}>
          <PencilSquareIcon color={"#666666"} size={22} />
        </TouchableOpacity>
        <TouchableOpacity>
          <TrashIcon color={"#666666"} size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AssetCard;
