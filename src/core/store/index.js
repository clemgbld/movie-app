import { configureStore } from "@reduxjs/toolkit";
import { moviesSlice } from "../features/diplayMovies/moviesSlice";
import { showDetailsSlice } from "../features/showDetails/showDetailsSlice";

export const createStore = () => {
  const store = configureStore({
    reducer: {
      movies: moviesSlice.reducer,
      movieDetails: showDetailsSlice.reducer,
    },
  });

  return store;
};
