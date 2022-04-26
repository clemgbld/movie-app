import {
  server,
  serverOveride,
  serverOverideWithNoImages,
} from "../../../../mocks/displayMovies";
import { retrieveMoviesDataSUT } from "./sut-builder";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("display movies features", () => {
  it("the list of film should be empty initially", () => {
    const { selectDataStatus } = retrieveMoviesDataSUT().build();

    expect(selectDataStatus()).toBe("idle");
  });

  it("should have no data initially", () => {
    const { selectData } = retrieveMoviesDataSUT().build();
    expect(selectData()).toEqual({});
  });

  it("should be able to retrieve a list of movies with data correctly formated", async () => {
    const { selectData, selectDataStatus, retrieveMoviesData } =
      retrieveMoviesDataSUT().build();

    await retrieveMoviesData();

    expect(selectDataStatus()).toBe("idle");
    expect(selectData()).toEqual({
      page: 1,
      results: [
        {
          poster_path:
            "https://image.tmdb.org/t/p/w220_and_h330_face/53WqEWbwQQ3WsO6cOWkzNbym43.jpg",
          adult: false,
          overview: "test overview",
          realease_date: "2022",
          id: 550,
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
    });
  });

  it("should be able to retrieve a list of movies with data correctly formated when there is no background image and/or poster image", async () => {
    serverOverideWithNoImages();

    const { selectData, selectDataStatus, retrieveMoviesData } =
      retrieveMoviesDataSUT().build();

    await retrieveMoviesData();

    expect(selectDataStatus()).toBe("idle");
    expect(selectData()).toEqual({
      page: 1,
      results: [
        {
          poster_path: "/img/no-image.PNG",
          adult: false,
          overview: "test overview",
          realease_date: "2022",
          id: 550,
          original_title: "test movie",
          original_language: "english",
          title: "test movie",
          backdrop_path: "/img/no-backdrop.jpg",
          popularity: 45,
          vote_count: 55,
          video: false,
          vote_average: 61,
        },
      ],
      total_results: 1,
      total_pages: 1,
    });
  });

  it("should set the status to loading before receiving the data", () => {
    const { retrieveMoviesData, selectDataStatus } =
      retrieveMoviesDataSUT().build();
    retrieveMoviesData();
    expect(selectDataStatus()).toBe("loading");
  });

  it("should handle 401 error", async () => {
    serverOveride(401, "401 Unauthorized Error");

    const { retrieveMoviesData, selectDataStatus, selectErrorMessage } =
      retrieveMoviesDataSUT().build();

    await retrieveMoviesData();

    expect(selectErrorMessage()).toBe("401 Unauthorized Error");
    expect(selectDataStatus()).toBe("rejected");
  });

  it("should handle 404 error", async () => {
    serverOveride(404, "404 not found");

    const { retrieveMoviesData, selectDataStatus, selectErrorMessage } =
      retrieveMoviesDataSUT().build();

    await retrieveMoviesData();

    expect(selectErrorMessage()).toBe("404 not found");
    expect(selectDataStatus()).toBe("rejected");
  });
});
