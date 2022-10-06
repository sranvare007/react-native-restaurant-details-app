import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
  Platform,
} from "react-native";
import React from "react";
import { TYPOGRAPHY } from "../constants/TYPOGRAPHY";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as Linking from "expo-linking";

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.bgImageContainer}>
        <ImageBackground
          source={require("../../assets/profile-bg.jpg")}
          style={{
            width: "100%",
            height: 600,
            borderRadius: 30,
            overflow: "hidden",
            opacity: 0.5,
          }}
        >
          <View style={styles.cardContainer}>
            <Text
              style={{
                fontFamily: TYPOGRAPHY.RAJDHANI_SEMIBOLD,
                fontSize: 28,
              }}
            >
              Developed by:{"  "}
              <Text
                style={{
                  fontFamily: TYPOGRAPHY.RAJDHANI_BOLD,
                  fontSize: 28,
                }}
              >
                Suraj Ranvare©
              </Text>
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: "80%",
                alignItems: "center",
                justifyContent: "space-around",
                marginTop: 30,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("https://www.instagram.com/s_ranvare/").catch(
                    (err) => {
                      if (Platform.OS == "android") {
                        ToastAndroid.show(
                          "Error opening the link",
                          ToastAndroid.LONG
                        );
                      }
                    }
                  );
                }}
              >
                <Icon name="instagram-square" size={40} color={"#000"} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("https://twitter.com/s_ranvare").catch(
                    (err) => {
                      if (Platform.OS == "android") {
                        ToastAndroid.show(
                          "Error opening the link",
                          ToastAndroid.LONG
                        );
                      }
                    }
                  );
                }}
              >
                <Icon name="twitter-square" size={40} color={"#000"} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("https://github.com/sranvare007").catch(
                    (err) => {
                      if (Platform.OS == "android") {
                        ToastAndroid.show(
                          "Error opening the link",
                          ToastAndroid.LONG
                        );
                      }
                    }
                  );
                }}
              >
                <Icon name="github-square" size={40} color={"#000"} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    "https://www.linkedin.com/in/suraj-r-984711b6"
                  ).catch((err) => {
                    if (Platform.OS == "android") {
                      ToastAndroid.show(
                        "Error opening the link",
                        ToastAndroid.LONG
                      );
                    }
                  });
                }}
              >
                <Icon name="linkedin" size={40} color={"#000"} />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontFamily: TYPOGRAPHY.RAJDHANI_BOLD,
                fontSize: 20,
                marginTop: 8,
              }}
            >
              Follow me!
            </Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 18,
  },
  bgImageContainer: {
    width: "100%",
    shadowColor: "#202020",
    shadowOpacity: 0.2,
    shadowOffset: { width: -2, height: -6 },
    shadowRadius: 6,
    elevation: 16,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
