import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { TYPOGRAPHY } from "../constants/TYPOGRAPHY";

export default function RestaurantCard({
  id,
  imageUrl,
  name,
  categories = [],
  rating,
  is_closed,
  navigation,
}) {
  const [categoriesString, setCategoriesString] = useState("");
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    let tempCategoriesString = "";
    categories.map((item, index) => {
      if (index === categories.length - 1) {
        tempCategoriesString += item.title;
      } else {
        tempCategoriesString += item.title + ", ";
      }
    });
    setCategoriesString(tempCategoriesString);
  }, []);

  return (
    <TouchableOpacity
      style={styles.cardStyle}
      onPress={() => {
        const routes = navigation.getState()?.routes;
        const prevRoute = routes[routes.length - 1];
        prevRoute.name == "DeliveryList"
          ? navigation.navigate("DeliveryDetails", {
              id,
            })
          : navigation.navigate("DiningDetails", {
              id,
            });
      }}
    >
      <Image source={{ uri: imageUrl }} style={styles.imageStyle} />
      <TouchableOpacity
        onPress={() => {
          setIsFav(!isFav);
        }}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          height: 35,
          width: 35,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: 20,
        }}
      >
        <Icon name={isFav ? "heart" : "heart-o"} size={20} color="red" />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <View style={styles.nameRatingContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <View
            style={[
              styles.ratingContainer,
              parseFloat(rating) >= 4
                ? { backgroundColor: "green" }
                : { backgroundColor: "red" },
            ]}
          >
            <Text style={styles.ratingText}>
              {parseFloat(rating).toFixed(1)}
            </Text>
            <Icon name="star" size={14} color={"white"} />
          </View>
        </View>
        <Text style={styles.categoriesText}>{categoriesString}</Text>

        {is_closed && <Text style={styles.closedText}>Opens at 10:00 AM</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardStyle: {
    flexDirection: "column",
    backgroundColor: "#fff",
    height: 250,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: -1, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    overflow: "hidden",
    marginVertical: 9,
    marginHorizontal: 14,
  },
  imageStyle: { height: 180, width: "100%" },
  infoContainer: {
    flexDirection: "column",
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: "relative",
  },
  nameRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameText: {
    fontFamily: TYPOGRAPHY.RAJDHANI_BOLD,
    fontSize: 20,
    color: "#000",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 3,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    fontFamily: "Rajdhani-SemiBold",
    fontSize: 14,
    color: "white",
    marginRight: 3,
  },
  categoriesText: {
    fontFamily: TYPOGRAPHY.RAJDHANI_MEDIUM,
    fontSize: 14,
    color: "#5F6F94",
  },
  closedText: {
    fontFamily: TYPOGRAPHY.RAJDHANI_MEDIUM,
    fontSize: 14,
    color: "red",
  },
});
