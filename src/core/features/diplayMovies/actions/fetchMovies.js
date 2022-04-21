import tmdService from "../../../../services/api/tmdService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const res = await tmdService.getMovies();

  return res.data;
});
