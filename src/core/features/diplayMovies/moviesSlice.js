import { createSlice } from "@reduxjs/toolkit";
import { fetchMovies } from "./actions/fetchMovies";

const initialState = { status: "idle" };

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        const data = { ...action.payload };
        state.data = data;
        state.status = "idle";
      })
      .addCase(fetchMovies.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "rejected";

        state.error = action.error.message;
      });
  },
});
