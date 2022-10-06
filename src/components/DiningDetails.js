import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { NetworkManager } from "../network/networkManager";
import LoadingComponent from "./LoadingComponent";
import ImageCaousel from "./ImageCaousel";
import { TYPOGRAPHY } from "../constants/TYPOGRAPHY";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

export default function DiningDetails({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [timingDetails, setTimingDetails] = useState(null);

  useEffect(() => {
    if (restaurantDetails != null) {
      const arr = Array(7).fill("");
      // console.log(restaurantDetails.hours[0].open);
      restaurantDetails.hours[0].open.map((item) => {
        if (arr[item.day] != "") {
          arr[item.day] =
            arr[item.day] +
            " / " +
            `${item.start.substring(0, 2)}:${item.start.substring(
              2,
              4
            )} - ${item.end.substring(0, 2)}:${item.end.substring(2, 4)}`;
        } else {
          arr[item.day] = `${item.start.substring(0, 2)}:${item.start.substring(
            2,
            4
          )} - ${item.end.substring(0, 2)}:${item.end.substring(2, 4)}`;
        }
      });
      setTimingDetails(arr);
      setIsLoading(false);
    }
  }, [restaurantDetails]);

  const dayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  async function getRestaurantDetails() {
    const restaurantId = route.params.id;
    const restaurantDetails = await NetworkManager.getRestaurantById({
      id: restaurantId,
    });
    setRestaurantDetails(restaurantDetails);
  }

  useEffect(() => {
    getRestaurantDetails();
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: TYPOGRAPHY.RAJDHANI_BOLD,
          fontSize: 28,
          color: "#000",
          textAlign: "center",
          marginVertical: 20,
        }}
      >
        {restaurantDetails?.name}
      </Text>
      <ImageCaousel imagesList={restaurantDetails?.photos} />
      <View
        style={{
          flexDirection: "column",
          marginHorizontal: 20,
          marginTop: 50,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                fontFamily: TYPOGRAPHY.RAJDHANI_SEMIBOLD,
                fontSize: 18,
              }}
            >
              Categories:
            </Text>
            {restaurantDetails?.categories.map((item, index) => (
              <Text
                style={{
                  fontFamily: TYPOGRAPHY.RAJDHANI_MEDIUM,
                  fontSize: 16,
                }}
                key={index}
              >
                ⬩{item?.title}
              </Text>
            ))}
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              borderWidth: 0.2,
              borderColor: "#000",
              borderRadius: 6,
            }}
          >
            <View
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                },
                parseFloat(restaurantDetails?.rating) >= 4
                  ? { backgroundColor: "green" }
                  : { backgroundColor: "red" },
              ]}
            >
              <Text
                style={{
                  fontFamily: TYPOGRAPHY.RAJDHANI_BOLD,
                  fontSize: 20,
                  color: "white",
                  marginRight: 3,
                }}
              >
                {parseFloat(restaurantDetails?.rating).toFixed(1)}
              </Text>
              <Icon name="star" size={14} color={"white"} />
            </View>
            <View
              style={{
                paddingVertical: 2,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: TYPOGRAPHY.RAJDHANI_MEDIUM,
                  color: "#000",
                }}
              >
                {restaurantDetails?.review_count}
              </Text>
              <Text
                style={{
                  fontFamily: TYPOGRAPHY.RAJDHANI_MEDIUM,
                  color: "#000",
                }}
              >
                Reviews
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
          backgroundColor: "#E1E5EA",
          paddingVertical: 4,
        }}
      >
        <Text
          style={{
            fontFamily: TYPOGRAPHY.RAJDHANI_BOLD,
            fontSize: 22,
            color: "#000",
            flex: 0.4,
            textAlign: "center",
          }}
        >
          Day
        </Text>
        <View
          style={{ height: 30, width: 1, backgroundColor: "#748DA6" }}
        ></View>
        <Text
          style={{
            fontFamily: TYPOGRAPHY.RAJDHANI_BOLD,
            fontSize: 22,
            color: "#000",
            flex: 0.6,
            textAlign: "center",
          }}
        >
          Timings
        </Text>
      </View>
      <View
        style={{
          flexDirection: "column",
        }}
      >
        {timingDetails.map((item, index) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            key={index}
          >
            <Text
              style={{
                fontFamily: TYPOGRAPHY.RAJDHANI_MEDIUM,
                fontSize: 16,
                color: "#000",
                flex: 0.4,
                textAlign: "center",
              }}
            >
              {dayOfWeek[index]}
            </Text>
            <Text
              style={{
                fontFamily: TYPOGRAPHY.RAJDHANI_MEDIUM,
                fontSize: 16,
                color: "#000",
                flex: 0.6,
                textAlign: "center",
              }}
            >
              {item}
            </Text>
          </View>
        ))}
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <MaterialIcon name="location-pin" size={30} color="#000" />
          <Text
            style={{
              fontFamily: TYPOGRAPHY.RAJDHANI_SEMIBOLD,
              fontSize: 16,
              marginTop: 8,
            }}
          >
            {restaurantDetails?.location?.display_address?.join(", ")}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
});
