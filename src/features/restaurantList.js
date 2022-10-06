import { createSlice } from "@reduxjs/toolkit";

const restaurantsListSlice = createSlice({
  name: "restaurantsList",
  initialState: {
    restaurantsList: [],
    totalCount: null,
  },
  reducers: {
    setRestaurantsList: (state, action) => {
      state.restaurantsList = state.restaurantsList.concat(
        action.payload.restaurantsList
      );
      if (state.totalCount == null) {
        state.totalCount = action.payload.totalCount;
      }
    },
  },
});

export const { setRestaurantsList } = restaurantsListSlice.actions;
export default restaurantsListSlice.reducer;
