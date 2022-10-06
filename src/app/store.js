import { configureStore } from "@reduxjs/toolkit";
import locationCoordsReducer from "../features/locationCoord";
import restaurantsList from "../features/restaurantList";
import dineInRestaurantList from "../features/dineInRestaurantList";

export default configureStore({
  reducer: {
    locationCoords: locationCoordsReducer,
    restaurantsList: restaurantsList,
    dineInRestaurantsList: dineInRestaurantList,
  },
});
