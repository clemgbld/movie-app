import tmdService from "../../../../services/api/tmdService";
import { createAsyncThunk, isRejected } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  try {
    const res = await tmdService.getMovies();

    return res.data;
  } catch (err) {
    console.log(err.response.data.status_message);
    const customError = {
      name: "custom axios error",
      message: err.response.data.status_message,
    };

    throw customError;
  }
});
