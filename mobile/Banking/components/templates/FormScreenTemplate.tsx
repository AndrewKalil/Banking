import { View, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { useNavigation } from "@react-navigation/native";

interface Props {
  children: JSX.Element | any;
}

const Cancel: FC<Props> = ({ children }) => {
  const navigation = useNavigation();

  const backToPreviousScreen = () => {
    navigation.goBack();
  };

  return (
    <View className="h-full w-full">
      <TouchableOpacity onPress={backToPreviousScreen}>
        <Text className="text-blue-500 text-base">Cancel</Text>
      </TouchableOpacity>
      {children}
    </View>
  );
};

export default Cancel;
