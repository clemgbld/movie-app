import { createSlice } from "@reduxjs/toolkit";
import { fetchDetails } from "./actions/showDetailsActions";

const initialState = {
  isOpen: false,
  status: "idle",
  data: {},
};

export const showDetailsSlice = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {
    showDetails(state) {
      state.isOpen = true;
    },
    hideDetails(state) {
      state.isOpen = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.data = { ...action.payload };
        state.status = "idle";
      })
      .addCase(fetchDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.status = "rejected";

        state.error = action.error.message;
      });
  },
});
