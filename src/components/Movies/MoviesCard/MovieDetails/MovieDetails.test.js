import { render, screen, waitFor } from "@testing-library/react";
import MovieDetails from "./MovieDetails";
import {
  server,
  serverOveride,
  serverOverideWithMultipleGenres,
  serverOverideWithNoImages,
} from "../../../../mocks/showDetails";
import { createStore } from "../../../../core/store";
import { Provider } from "react-redux";
import { fakeMovieId } from "../../../../mocks/fixtures/fakeMovieId";

describe("MovieDetails", () => {
  const setup = () => {
    const closeModal = jest.fn();
    render(
      <Provider store={createStore()}>
        <MovieDetails id={fakeMovieId} closeModal={closeModal} />
      </Provider>
    );
  };

  beforeAll(() => server.listen());
  beforeEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render a modal", () => {
    setup();

    const modal = screen.getByRole("dialog");

    expect(modal).toBeInTheDocument();
  });

  it("should render a spinner initially", () => {
    setup();

    const spinner = screen.getByTestId("spinner");

    expect(spinner).toBeInTheDocument();
  });

  it("should no render a spinner when the movie details are loaded", async () => {
    setup();

    await waitFor(() => screen.findByAltText("Fight Club"));
    const spinner = screen.queryByTestId("spinner");

    expect(spinner).not.toBeInTheDocument();
  });

  it("should not render 401 error initially", () => {
    serverOveride(401, "401 Unauthorized Error");
    setup();

    const errorMessage = screen.queryByText("401 Unauthorized Error");

    expect(errorMessage).not.toBeInTheDocument();
  });

  it("should handle 401 error and display it", async () => {
    serverOveride(401, "401 Unauthorized Error");

    setup();

    const errorMessage = await waitFor(() =>
      screen.findByText("401 Unauthorized Error")
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("should handle 404 error and display it", async () => {
    serverOveride(404, "404 not found Error");
    setup();
    const errorMessage = await waitFor(() =>
      screen.findByText("404 not found Error")
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("should render a container", async () => {
    setup();

    const container = await waitFor(() => screen.findByRole("contentinfo"));

    expect(container).toBeInTheDocument();
  });

  it("should render the poster of the movie", async () => {
    setup();

    const poster = await waitFor(() => screen.findByAltText("Fight Club"));

    expect(poster).toBeInTheDocument();
  });

  it("should render the title of the movie with his release year", async () => {
    setup();

    const title = await waitFor(() => screen.getByText("Fight Club (1999)"));

    expect(title).toBeInTheDocument();
  });

  it("should display the genres's id of the movie", async () => {
    setup();

    const id = await waitFor(() => screen.findByText("18"));

    expect(id).toBeInTheDocument();
  });

  it("should display a genre", async () => {
    setup();
    const genre = await waitFor(() => screen.findByText("Drama"));
    expect(genre).toBeInTheDocument();
  });

  it("should display a list of genres", async () => {
    serverOverideWithMultipleGenres();
    setup();
    const genre1 = await waitFor(() => screen.findByText("Drama,"));
    const genre2 = await waitFor(() => screen.findByText("Action"));
    expect(genre1).toBeInTheDocument();
    expect(genre2).toBeInTheDocument();
  });

  it("should display the duration of the movie", async () => {
    setup();
    const duration = await waitFor(() => screen.findByText("2h19"));
    expect(duration).toBeInTheDocument();
  });

  it("shouldn't display any duration the movie doesn't have a duration", async () => {
    serverOverideWithNoImages();
    setup();
    const duration = await waitFor(() => screen.queryByText("2h19"));
    expect(duration).not.toBeInTheDocument();
  });

  it("should display the percentage of popularity of the movie", async () => {
    setup();
    const popularity = await waitFor(() => screen.findByTestId("popularity"));

    expect(popularity).toBeInTheDocument();
  });

  it("should display a tagline", async () => {
    setup();
    const tagline = await waitFor(() =>
      screen.findByText(
        "How much can you know about yourself if you've never been in a fight?"
      )
    );
    expect(tagline).toBeInTheDocument();
  });

  it("should display an overview of the movie", async () => {
    setup();
    const overview = await waitFor(() =>
      screen.findByText(
        'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.'
      )
    );

    expect(overview).toBeInTheDocument();
  });

  it("should render a button to close the modal", async () => {
    setup();
    const close = await waitFor(() => screen.findByRole("button"));

    expect(close).toBeInTheDocument();
  });
});
