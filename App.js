import { StatusBar, StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./src/navigation/StackNavigator";
import { TYPOGRAPHY } from "./src/constants/TYPOGRAPHY";
import { Provider } from "react-redux";
import store from "./src/app/store";

let customFonts = {
  "Rajdhani-Bold": require("./assets/fonts/Rajdhani-Bold.ttf"),
  "Rajdhani-Light": require("./assets/fonts/Rajdhani-Light.ttf"),
  "Rajdhani-Medium": require("./assets/fonts/Rajdhani-Medium.ttf"),
  "Rajdhani-Regular": require("./assets/fonts/Rajdhani-Regular.ttf"),
  "Rajdhani-SemiBold": require("./assets/fonts/Rajdhani-SemiBold.ttf"),
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  }

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor={"#645CAA"} />
      <Provider store={store}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: TYPOGRAPHY.RAJDHANI_SEMIBOLD,
    fontSize: 24,
  },
});
