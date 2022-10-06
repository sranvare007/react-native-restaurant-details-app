import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { TYPOGRAPHY } from "../constants/TYPOGRAPHY";
import RestaurantCard from "./RestaurantCard";

export default function RestaurantCardList({
  totalCount,
  getRestaurantDetails,
  restaurantsList,
  navigation,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const getShowMore = () => {
    return restaurantsList.length < totalCount ? (
      isLoading ? (
        <ActivityIndicator size={"small"} color="#645CAA" />
      ) : (
        <TouchableOpacity
          onPress={async () => {
            setIsLoading(true);
            await getRestaurantDetails();
            setIsLoading(false);
          }}
          style={styles.showMoreContainer}
        >
          <Text style={styles.showMoreText}>Show More</Text>
        </TouchableOpacity>
      )
    ) : null;
  };

  function renderRestaurantCard({ item, index }) {
    return (
      <RestaurantCard
        id={item?.id}
        name={item?.name}
        imageUrl={item?.image_url}
        categories={item?.categories}
        is_closed={item?.is_closed}
        rating={item?.rating}
        navigation={navigation}
      />
    );
  }

  return (
    <FlatList
      data={restaurantsList}
      renderItem={renderRestaurantCard}
      ListFooterComponent={getShowMore}
      keyExtractor={(item) => item?.id}
    />
  );
}

const styles = StyleSheet.create({
  showMoreContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 10,
  },
  showMoreText: {
    fontFamily: TYPOGRAPHY.RAJDHANI_BOLD,
    fontSize: 18,
    color: "#000",
  },
});
