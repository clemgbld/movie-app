import tmdService from "../../../../services/api/tmdService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  try {
    const res = await tmdService.getMovies();

    const dataFormated = {
      ...res.data,
      results: [...res.data.results].map((result) => {
        return {
          ...result,
          poster_path: tmdService.setBaseImgPathPoster(result.poster_path),
          backdrop_path: tmdService.setBaseImgPathBackdrop(
            result.backdrop_path
          ),
          vote_average: tmdService.setPopularityInPercent(result.vote_average),
        };
      }),
    };

    return dataFormated;
  } catch (err) {
    const customError = {
      name: "custom axios error",
      message: err.response.data.status_message,
    };

    throw customError;
  }
});
