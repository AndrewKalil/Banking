import { StatusBar } from "expo-status-bar";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/views/Home";
import { Provider } from "react-redux";
import { store } from "./core/store/store";
import ModifyAsset from "./components/views/ModifyAsset";
import { useLayoutEffect } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ModifyAsset" component={ModifyAsset} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
