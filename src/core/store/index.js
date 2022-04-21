import { configureStore } from "@reduxjs/toolkit";
import { moviesSlice } from "../features/diplayMovies/moviesSlice";

export const createStore = () => {
  const store = configureStore({
    reducer: {
      movies: moviesSlice.reducer,
    },
  });

  return store;
};
