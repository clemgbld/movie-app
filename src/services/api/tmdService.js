import baseUrl, { KEY } from "./TMD-API";
import numeral from "numeral";

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
    return endPoint
      ? `${this._image_path}${this._poster_size}${endPoint}`
      : "/img/no-image.PNG";
  }

  setBaseImgPathBackdrop(endPoint) {
    return endPoint
      ? `${this._image_path}${this._backdrop_size}${endPoint}`
      : "/img/no-backdrop.jpg";
  }

  formatRunTime(minutes) {
    return minutes
      ? numeral(minutes).format("00:00").slice(3).replace(":", "h")
      : null;
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

  async getDetails(id) {
    const params = {
      params: { language: this._language, api_key: this._key },
    };

    return this._fetch(`/movie/${id}`, params);
  }
}

export default new tmdService();
