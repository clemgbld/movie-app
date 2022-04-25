import { createSelector } from "@reduxjs/toolkit";

export const selectIsOpen = (state) => state.movieDetails.isOpen;

export const selectStatus = (state) => state.movieDetails.status;

export const selectError = (state) => state.movieDetails.error;

export const selectMovieDetails = (state) => state?.movieDetails?.data;

export const selectGenres = (state) => state.movieDetails.data.genres;

export const selectGenresNames = createSelector(
  (state) => selectMovieDetails(state).genres,

  (genres) => genres?.map((genre) => genre.name)
);
