import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import navigationtheme from "./src/navigator/navigationtheme";
import Onboard from "./src/screens/onboardScreen";
import MyTabs from "./src/navigator/appNavigator";
import * as Linking from "expo-linking";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Host, Portal } from "react-native-portalize";
import { Provider } from "react-redux";
import { store } from "./src/features/store";
import AuthNavigator from "./src/navigator/authnavigator";

const prefix = Linking.createURL("/");

export default function App() {
  // FONTS
  const [fontsLoaded] = useFonts({
    RalewayThin: require("./assets/fonts/RalewayThin.ttf"),
    RalewayLight: require("./assets/fonts/Raleway-Light.ttf"),
    RalewayExtraLight: require("./assets/fonts/Raleway-ExtraLight.ttf"),
    RalewayMedium: require("./assets/fonts/Raleway-Medium.ttf"),
    RalewayMediumItalic: require("./assets/fonts/Raleway-MediumItalic.ttf"),
    RalewayRegular: require("./assets/fonts/Raleway-Regular.ttf"),
    RalewaySemiBold: require("./assets/fonts/Raleway-SemiBold.ttf"),
    RalewaySemiBoldItalic: require("./assets/fonts/Raleway-SemiBoldItalic.ttf"),
    RalewayBold: require("./assets/fonts/Raleway-Bold.ttf"),
    RalewayBoldItalic: require("./assets/fonts/Raleway-BoldItalic.ttf"),
    RalewayExtraBold: require("./assets/fonts/Raleway-ExtraBold.ttf"),
    RalewayHeavy: require("./assets/fonts/Raleway-Heavy.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: "Home",
      },
    },
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Host>
        <Provider store={store}>
          <NavigationContainer theme={navigationtheme} linking={linking}>
            <AuthNavigator />
          </NavigationContainer>
        </Provider>
      </Host>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
