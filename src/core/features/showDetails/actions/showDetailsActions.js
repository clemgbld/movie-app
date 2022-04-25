import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import tmdService from "../../../../services/api/tmdService";

export const showDetails = createAction("movieDetails/showDetails");

export const hideDetails = createAction("movieDetails/hideDetails");

export const fetchDetails = createAsyncThunk(
  "movieDetails/fetchDetails",
  async (movieId) => {
    try {
      const res = await tmdService.getDetails(movieId);

      const dataFormated = {
        ...res.data,
        poster_path: tmdService.setBaseImgPathPoster(res.data.poster_path),
        backdrop_path: tmdService.setBaseImgPathBackdrop(
          res.data.backdrop_path
        ),
        vote_average: tmdService.setPopularityInPercent(res.data.vote_average),
        runtime: tmdService.formatRunTime(res.data.runtime),
        year: res.data.release_date.slice(0, 4),
      };

      return dataFormated;
    } catch (err) {
      const customError = {
        name: "custom axios error",
        message: err.response.data.status_message,
      };

      throw customError;
    }
  }
);
