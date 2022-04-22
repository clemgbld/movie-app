import { createSelector } from "@reduxjs/toolkit";

export const selectStatus = (state) => state.movies.status;

export const selectError = (state) => state.movies.error;

// taking avantage of the memoization for improving performance;
export const selectMovies = createSelector(
  (state) => state.movies.data?.results,

  (results) => results?.map((movie) => movie)
);
