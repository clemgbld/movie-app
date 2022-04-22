import { KEY } from "./TMD-API";
import baseUrl from "./TMD-API";

class tmdService {
  constructor() {
    this._key = KEY;
    this._baseUrl = baseUrl;
    this._language = "en-US";
    this._image_path = "https://image.tmdb.org/t/p";
    this._poster_size = "/w220_and_h330_face";
    this._backdrop_size = "/original";
  }

  async _fetch(endpoint, params) {
    const res = await this._baseUrl.get(endpoint, params);

    return res;
  }

  setBaseImgPathPoster(endPoint) {
    return `${this._image_path}${this._poster_size}${endPoint}`;
  }

  setBaseImgPathBackdrop(endPoint) {
    return `${this._image_path}${this._backdrop_size}${endPoint}`;
  }

  setPopularityInPercent(voteAverage) {
    return voteAverage * 10;
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
