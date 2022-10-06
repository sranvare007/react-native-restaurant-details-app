import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NetworkManager } from "../network/networkManager";
import LoadingComponent from "./LoadingComponent";
import ImageCaousel from "./ImageCaousel";
import { TYPOGRAPHY } from "../constants/TYPOGRAPHY";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import * as Linking from "expo-linking";

export default function DeliveryDetails({ route, navigation }) {
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

  const openMapsLocation = () => {
    const lat = restaurantDetails.coordinates.latitude;
    const lng = restaurantDetails.coordinates.longitude;
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${lat},${lng}`;
    const label = restaurantDetails.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };

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
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.restaurantName}>{restaurantDetails?.name}</Text>
        <ImageCaousel imagesList={restaurantDetails?.photos} />
        <View style={styles.infoContainer}>
          <View style={styles.categoryRatingContainer}>
            <View style={styles.categoriesContainer}>
              <Text style={styles.categoriesText}>Categories:</Text>
              {restaurantDetails?.categories.map((item, index) => (
                <Text style={styles.categoryValueText} key={index}>
                  ⬩{item?.title}
                </Text>
              ))}
            </View>
            <View style={styles.ratingContainer}>
              <View
                style={[
                  styles.ratingTopContainer,
                  parseFloat(restaurantDetails?.rating) >= 4
                    ? { backgroundColor: "green" }
                    : { backgroundColor: "red" },
                ]}
              >
                <Text style={styles.ratingText}>
                  {parseFloat(restaurantDetails?.rating).toFixed(1)}
                </Text>
                <Icon name="star" size={14} color={"white"} />
              </View>
              <View style={styles.reviewContainer}>
                <Text style={styles.reviewValue}>
                  {restaurantDetails?.review_count}
                </Text>
                <Text style={styles.reviewText}>Reviews</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.tableHeaderContainer}>
          <Text style={styles.headerText1}>Day</Text>
          <View style={styles.tableHeaderDivider}></View>
          <Text style={styles.headerText2}>Timings</Text>
        </View>
        <View style={styles.tableDataContainer}>
          {timingDetails.map((item, index) => (
            <View style={styles.rowContainer} key={index}>
              <Text style={styles.tableData1}>{dayOfWeek[index]}</Text>
              <Text style={styles.tableData2}>{item || "Closed"}</Text>
            </View>
          ))}
          <TouchableOpacity
            onPress={() => {
              openMapsLocation();
            }}
            style={styles.locationContainer}
          >
            <MaterialIcon name="location-pin" size={30} color="#000" />
            <Text style={styles.addressText}>
              {restaurantDetails?.location?.display_address?.join(", ")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  restaurantName: {
    fontFamily: TYPOGRAPHY.RAJDHANI_BOLD,
    fontSize: 28,
    color: "#000",
    textAlign: "center",
    marginVertical: 20,
  },
  infoContainer: {
    flexDirection: "column",
    marginHorizontal: 20,
    marginTop: 50,
  },
  categoryRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoriesContainer: {
    flexDirection: "column",
  },
  categoriesText: {
    fontFamily: TYPOGRAPHY.RAJDHANI_SEMIBOLD,
    fontSize: 18,
  },
  categoryValueText: {
    fontFamily: TYPOGRAPHY.RAJDHANI_MEDIUM,
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 0.2,
    borderColor: "#000",
    borderRadius: 6,
  },
  ratingTopContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  ratingText: {
    fontFamily: TYPOGRAPHY.RAJDHANI_BOLD,
    fontSize: 20,
    color: "white",
    marginRight: 3,
  },
  reviewContainer: {
    paddingVertical: 2,
    flexDirection: "column",
    alignItems: "center",
  },
  reviewValue: {
    fontFamily: TYPOGRAPHY.RAJDHANI_MEDIUM,
    color: "#000",
  },
  reviewText: {
    fontFamily: TYPOGRAPHY.RAJDHANI_MEDIUM,
    color: "#000",
  },
  tableHeaderContainer: {
    flexDirection: "row",
    marginTop: 30,
    backgroundColor: "#E1E5EA",
    paddingVertical: 4,
  },
  headerText1: {
    fontFamily: TYPOGRAPHY.RAJDHANI_BOLD,
    fontSize: 22,
    color: "#000",
    flex: 0.4,
    textAlign: "center",
  },
  tableHeaderDivider: { height: 30, width: 1, backgroundColor: "#748DA6" },
  headerText2: {
    fontFamily: TYPOGRAPHY.RAJDHANI_BOLD,
    fontSize: 22,
    color: "#000",
    flex: 0.6,
    textAlign: "center",
  },
  tableDataContainer: {
    flexDirection: "column",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tableData1: {
    fontFamily: TYPOGRAPHY.RAJDHANI_MEDIUM,
    fontSize: 16,
    color: "#000",
    flex: 0.4,
    textAlign: "center",
  },
  tableData2: {
    fontFamily: TYPOGRAPHY.RAJDHANI_MEDIUM,
    fontSize: 16,
    color: "#000",
    flex: 0.6,
    textAlign: "center",
  },
  locationContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 40,
  },
  addressText: {
    fontFamily: TYPOGRAPHY.RAJDHANI_SEMIBOLD,
    fontSize: 16,
    marginTop: 8,
  },
});
