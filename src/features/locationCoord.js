import { createSlice } from "@reduxjs/toolkit";

export const locationCoordsSlice = createSlice({
  name: "locationCoords",
  initialState: {
    longitude: null,
    latitude: null,
  },
  reducers: {
    setLocationCoords: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export const { setLocationCoords } = locationCoordsSlice.actions;
export default locationCoordsSlice.reducer;
