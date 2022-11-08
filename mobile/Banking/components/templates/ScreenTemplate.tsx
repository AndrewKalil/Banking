import { View, Text } from "react-native";
import React, { FC, useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

interface Props {
  children: JSX.Element | any;
}

const ScreenTemplate: FC<Props> = ({ children }) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="h-full bg-slate-50 px-4">{children}</SafeAreaView>
  );
};

export default ScreenTemplate;
