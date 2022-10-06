import { SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { NetworkManager } from "../network/networkManager";
import { useDispatch, useSelector } from "react-redux";
import { setDineInRestaurantsList } from "../features/dineInRestaurantList";
import RestaurantCardList from "./RestaurantCardsList";
import LoadingComponent from "./LoadingComponent";
import PageCenterText from "./PageCenterText";

export default function Dining({ navigation }) {
  const PAGINATION_LIMIT = 10;

  const [isLoading, setIsLoading] = useState(true);
  const locationCoords = useSelector((state) => state.locationCoords);
  const restaurantsList = useSelector(
    (state) => state.dineInRestaurantsList.restaurantsList
  );
  const totalCount = useSelector(
    (state) => state.dineInRestaurantsList.totalCount
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      totalCount == null &&
      locationCoords.latitude != null &&
      locationCoords.longitude != null
    ) {
      getRestaurantDetails();
    }
  }, [locationCoords]);

  async function getRestaurantDetails() {
    const response = await NetworkManager.getRestaurantsList({
      term: "restaurant_reservation",
      longitude: locationCoords.longitude,
      latitude: locationCoords.latitude,
      limit: PAGINATION_LIMIT,
      offset: restaurantsList.length,
    });
    dispatch(
      setDineInRestaurantsList({
        restaurantsList: response.businesses,
        totalCount: response.total,
      })
    );
    setIsLoading(false);
  }

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (restaurantsList.length == 0) {
    return <PageCenterText text={"No nearby restaurant found!"} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
      <RestaurantCardList
        totalCount={totalCount}
        getRestaurantDetails={getRestaurantDetails}
        restaurantsList={restaurantsList}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}
