import { server, serverOveride } from "../../../test-utils/displayMovies";
import { createStore } from "../../store";
import { fetchMovies } from "./actions/fetchMovies";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("display movies features", () => {
  it("the list of film should be empty initially", () => {
    const store = createStore();

    expect(store.getState().movies).toEqual({ status: "idle" });
  });

  it("should be able to retrieve a list of movies with data correctly formated", async () => {
    const store = createStore();

    await store.dispatch(fetchMovies());

    expect(store.getState().movies).toEqual({
      status: "idle",
      data: {
        page: 1,
        results: [
          {
            poster_path:
              "https://image.tmdb.org/t/p/w220_and_h330_face/53WqEWbwQQ3WsO6cOWkzNbym43.jpg",
            adult: false,
            overview: "test overview",
            realease_date: "2022",
            id: 1,
            original_title: "test movie",
            original_language: "english",
            title: "test movie",
            backdrop_path:
              "https://image.tmdb.org/t/p/original/53WqEWbwQQ3WsO6cOWkzNbym43.jpg",
            popularity: 45,
            vote_count: 55,
            video: false,
            vote_average: 61,
          },
        ],
        total_results: 1,
        total_pages: 1,
      },
    });
  });

  it("should set the status to loading before receiving the data", () => {
    const store = createStore();
    store.dispatch(fetchMovies());
    expect(store.getState().movies).toEqual({ status: "loading" });
  });

  it("should handle 401 error", async () => {
    serverOveride(401, "401 Unauthorized Error");

    const store = createStore();

    await store.dispatch(fetchMovies());

    expect(store.getState().movies).toEqual({
      status: "rejected",
      error: "401 Unauthorized Error",
    });
  });

  it("should handle 404 error", async () => {
    serverOveride(404, "404 not found");

    const store = createStore();

    await store.dispatch(fetchMovies());

    expect(store.getState().movies).toEqual({
      status: "rejected",
      error: "404 not found",
    });
  });
});
