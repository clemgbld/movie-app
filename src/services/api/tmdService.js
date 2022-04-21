import { KEY } from "./TMD-API";
import baseUrl from "./TMD-API";
import { response } from "msw";
import { isRejectedWithValue } from "@reduxjs/toolkit";

class tmdService {
  constructor() {
    this._key = KEY;
    this._baseUrl = baseUrl;
    this._language = "en-US";
  }

  async _fetch(endpoint, params) {
    const res = await this._baseUrl.get(endpoint, params);

    return res;
  }

  async getMovies() {
    const params = {
      params: {
        page: 1,
        include_video: true,
        sortBy: "popularity.desc",
        language: this._language,
        api_key: this._key,
      },
    };

    return this._fetch("/discover/movie", params);
  }
}

export default new tmdService();
