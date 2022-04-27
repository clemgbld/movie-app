import { createSlice } from "@reduxjs/toolkit";
import { fetchDetails } from "./actions/showDetailsActions";

const initialState = {
  cache: {},
  status: "idle",
  data: {},
};

export const showDetailsSlice = createSlice({
  name: "movieDetails",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = { ...action.payload };

        if (!state.cache[action.payload.id]) {
          state.cache = {
            ...state.cache,
            [action.payload.id]: action.payload,
          };
        }
      })
      .addCase(fetchDetails.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.status = "rejected";

        state.error = action.error.message;
      });
  },
});
