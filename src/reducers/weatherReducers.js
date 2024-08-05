import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    isLoading: false,
    weatherData: null,
    error: null,
  },
  reducers: {
    weatherFetching: (state) => {
      state.isLoading = true;
    },
    weatherFetchSuccess: (state, action) => {
      state.isLoading = false;
      state.weatherData = action.payload;
    },
    weatherFetchError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { weatherFetching, weatherFetchSuccess, weatherFetchError } =
  weatherSlice.actions;
export default weatherSlice.reducer;
