import { render, screen, waitFor } from "@testing-library/react";
import MoviesContainer from "./MoviesContainer";
import { Provider } from "react-redux";
import { createStore } from "../../../core/store";
import { server, serverOveride } from "../../../mocks/displayMovies";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("MoviesContainer", () => {
  const setup = () => {
    render(
      <Provider store={createStore()}>
        <MoviesContainer />
      </Provider>
    );
  };

  it("should be rendered", () => {
    setup();

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
  });

  it("should have spinner in the document initially", () => {
    setup();

    const spinner = screen.getByTestId("spinner");

    expect(spinner).toBeInTheDocument();
  });

  it("should display a 401 error to the screen", async () => {
    serverOveride(401, "401 Unauthorized Error");

    setup();

    const error = await waitFor(() =>
      screen.findByText("401 Unauthorized Error")
    );

    expect(error).toBeInTheDocument();
  });

  it("should display a 404 error to the screen", async () => {
    serverOveride(404, "404 not found Error");

    setup();

    const error = await waitFor(() => screen.findByText("404 not found Error"));

    expect(error).toBeInTheDocument();
  });

  it("should render the movies sucessfully", async () => {
    setup();

    const cards = await waitFor(() => screen.findAllByRole("contentinfo"));

    expect(cards.length).toBe(1);
  });
});
