import { createSlice } from "@reduxjs/toolkit";

// it would have been easier to create a local state with useState but i really want to emphasize the separation of concern between the core and the UI

const initialState = {
  isOpen: false,
};

export const showDetailsSlice = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {
    showDetails(state, action) {
      state.isOpen = true;
    },
    hideDetails(state, action) {
      state.isOpen = false;
    },
  },
});
