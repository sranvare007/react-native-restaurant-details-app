import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CommonLoader from "./CommonLoader";
import { TYPOGRAPHY } from "../constants/TYPOGRAPHY";

export default function LoadingComponent() {
  return (
    <View style={styles.container}>
      <CommonLoader />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontFamily: TYPOGRAPHY.RAJDHANI_SEMIBOLD,
    fontSize: 20,
    color: "#000",
    marginTop: 8,
  },
});
