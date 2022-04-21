import { rest } from "msw";
import { setupServer } from "msw/node";
import { createStore } from "../../store";
import { fetchMovies } from "./actions/fetchMovies";

const server = setupServer(
  rest.get("https://api.themoviedb.org/3/discover/movie", (req, res, ctx) => {
    return res(
      ctx.json({
        page: 1,
        results: [
          {
            poster_path: null,
            adult: false,
            overview: "test overview",
            realease_date: "2022",
            id: 1,
            original_title: "test movie",
            original_language: "english",
            title: "test movie",
            backdrop_path: null,
            popularity: 45,
            vote_count: 55,
            video: false,
            vote_average: 150,
          },
        ],
        total_results: 1,
        total_pages: 1,
      })
    );
  })
);

const serverOveride = (statusCode, message) => {
  server.use(
    rest.get("https://api.themoviedb.org/3/discover/movie", (req, res, ctx) => {
      return res(
        ctx.status(statusCode),
        ctx.json({
          status_code: statusCode,
          status_message: message,
        })
      );
    })
  );
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("display movies features", () => {
  it("the list of film should be empty initially", () => {
    const store = createStore();

    expect(store.getState()).toEqual({ movies: { status: "idle" } });
  });

  it("should be able to retrieve a list of movies", async () => {
    const store = createStore();

    await store.dispatch(fetchMovies());

    expect(store.getState()).toEqual({
      movies: {
        status: "idle",
        data: {
          page: 1,
          results: [
            {
              poster_path: null,
              adult: false,
              overview: "test overview",
              realease_date: "2022",
              id: 1,
              original_title: "test movie",
              original_language: "english",
              title: "test movie",
              backdrop_path: null,
              popularity: 45,
              vote_count: 55,
              video: false,
              vote_average: 150,
            },
          ],
          total_results: 1,
          total_pages: 1,
        },
      },
    });
  });

  it("should set the status to loading before receiving the data", () => {
    const store = createStore();
    store.dispatch(fetchMovies());
    expect(store.getState()).toEqual({ movies: { status: "loading" } });
  });

  it("should handle 401 error", async () => {
    serverOveride(401, "401 Unauthorized Error");

    const store = createStore();

    await store.dispatch(fetchMovies());

    expect(store.getState()).toEqual({
      movies: {
        status: "rejected",
        error: "401 Unauthorized Error",
      },
    });
  });

  it("should handle 404 error", async () => {
    serverOveride(404, "404 not found");

    const store = createStore();

    await store.dispatch(fetchMovies());

    expect(store.getState()).toEqual({
      movies: {
        status: "rejected",
        error: "404 not found",
      },
    });
  });
});
