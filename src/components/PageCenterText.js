import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TYPOGRAPHY } from "../constants/TYPOGRAPHY";

export default function PageCenterText({ text }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: TYPOGRAPHY.RAJDHANI_BOLD,
    fontSize: 22,
    color: "#000",
  },
});
