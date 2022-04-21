import axios from "axios";

export const KEY = "92b418e837b833be308bbfb1fb2aca1e";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
});
