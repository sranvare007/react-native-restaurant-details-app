import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TYPOGRAPHY } from "../constants/TYPOGRAPHY";

export default function ErrorComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>
        Error occured while fetching the location.
      </Text>
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
  errorText: { fontFamily: TYPOGRAPHY.RAJDHANI_SEMIBOLD, fontSize: 18 },
});
