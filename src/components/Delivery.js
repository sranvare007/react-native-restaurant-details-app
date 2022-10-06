import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocationCoords } from "../features/locationCoord";
import { setRestaurantsList } from "../features/restaurantList";
import * as Location from "expo-location";
import { NetworkManager } from "../network/networkManager";
import RestaurantCardList from "./RestaurantCardsList";
import ErrorComponent from "./ErrorComponent";
import LoadingComponent from "./LoadingComponent";
import { TYPOGRAPHY } from "../constants/TYPOGRAPHY";
import PageCenterText from "./PageCenterText";

export default function Delivery({ navigation }) {
  const PAGINATION_LIMIT = 10;
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const locationCoords = useSelector((state) => state.locationCoords);
  const restaurantsList = useSelector(
    (state) => state.restaurantsList.restaurantsList
  );
  const totalCount = useSelector((state) => state.restaurantsList.totalCount);
  const dispatch = useDispatch();

  useEffect(() => {
    getLocationPermission();
    // if (totalCount == null) {
    //   getRestaurantDetails();
    // } else {
    // }
  }, []);

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    if (totalCount == null) {
      getRestaurantDetails(location.coords.longitude, location.coords.latitude);
    }
    dispatch(
      setLocationCoords({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      })
    );
  }

  async function getRestaurantDetails(longitude, latitude) {
    const response = await NetworkManager.getRestaurantsList({
      term: "delivery",
      longitude: longitude,
      latitude: latitude,
      limit: PAGINATION_LIMIT,
      offset: restaurantsList.length,
    });
    dispatch(
      setRestaurantsList({
        restaurantsList: response.businesses,
        totalCount: response.total,
      })
    );
    setIsLoading(false);
  }

  if (errorMsg != null && errorMsg != "") {
    return <ErrorComponent />;
  }

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (!isLoading && restaurantsList.length == 0) {
    return <PageCenterText text={"No nearby restaurant found!"} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <RestaurantCardList
        totalCount={totalCount}
        getRestaurantDetails={getRestaurantDetails}
        restaurantsList={restaurantsList}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column" },
});
