import { createSlice } from "@reduxjs/toolkit";

const dineInRestaurantsListSlice = createSlice({
  name: "dineInRestaurantsList",
  initialState: {
    restaurantsList: [],
    totalCount: null,
  },
  reducers: {
    setDineInRestaurantsList: (state, action) => {
      state.restaurantsList = state.restaurantsList.concat(
        action.payload.restaurantsList
      );
      if (state.totalCount == null) {
        state.totalCount = action.payload.totalCount;
      }
    },
  },
});

export const { setDineInRestaurantsList } = dineInRestaurantsListSlice.actions;
export default dineInRestaurantsListSlice.reducer;
