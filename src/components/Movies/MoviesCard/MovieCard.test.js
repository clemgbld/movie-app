import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server } from "../../../mocks/showDetails";
import { createStore } from "../../../core/store";
import { Provider } from "react-redux";
import { fakeMovieId } from "../../../mocks/fixtures/fakeMovieId";

import MovieCard from "./MovieCard";
describe("MovieCard", () => {
  const setup = () => {
    const data = {
      img: "https://www.themoviedb.org/t/p/w220_and_h330_face/jBCUJ90BVXIDSLlXUvgQcj6LOHa.jpg",
      title: "Alerte Rouge",
      date: "10 mars 2022",
      popularity: "75",
      id: fakeMovieId,
    };

    render(
      <Provider store={createStore()}>
        <div id="modal"></div>
        <MovieCard data={data} />
      </Provider>
    );
  };

  const openModal = () => {
    const img = screen.getByAltText("Alerte Rouge");

    userEvent.click(img);
  };

  const closeModalWithBtn = async () => {
    const btn = await waitFor(() => screen.getByRole("button"));

    userEvent.click(btn);
  };

  const closeModalWithOverlay = async () => {
    const modal = await waitFor(() => screen.getByRole("dialog"));

    userEvent.click(modal);
  };
  it("should render a card", () => {
    setup();

    const card = screen.getByRole("contentinfo");

    expect(card).toBeInTheDocument();
  });

  it("should display an image", () => {
    setup();

    const img = screen.getByAltText("Alerte Rouge");

    expect(img).toBeInTheDocument();
  });

  it("should display a title", () => {
    setup();

    const title = screen.getByText("Alerte Rouge");
    expect(title).toBeInTheDocument();
  });

  it("should display a date", () => {
    setup();

    const date = screen.getByText("10 mars 2022");
    expect(date).toBeInTheDocument();
  });

  it("should render the popularity of the movie", () => {
    setup();

    const popularity = screen.getByTestId("popularity");

    expect(popularity).toBeInTheDocument();
  });

  describe("handle modal opening and closing", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("should open the modal when the user clicks on an image", async () => {
      setup();

      openModal();

      const modal = await waitFor(() => screen.findByRole("dialog"));

      expect(modal).toBeInTheDocument();
    });

    it("should close the modal when the user clicks on the close button", async () => {
      setup();

      openModal();

      await closeModalWithBtn();

      const modal = screen.queryByRole("dialog");

      expect(modal).not.toBeInTheDocument();
    });

    it("should close the modal when the user clicks on the overlay", async () => {
      setup();

      openModal();

      await closeModalWithOverlay();

      const modal = screen.queryByRole("dialog");

      expect(modal).not.toBeInTheDocument();
    });

    it("shouldn't close the modal when the user clicks on the content ", async () => {
      setup();

      openModal();

      const content = await waitFor(() => screen.findAllByRole("contentinfo"));

      userEvent.click(content[0]);

      const modal = screen.getByRole("dialog");

      expect(modal).toBeInTheDocument();
    });

    it("should close the modal when the user hit Escape", () => {
      setup();
      openModal();

      userEvent.keyboard("{Escape}");

      const modal = screen.queryByRole("dialog");

      expect(modal).not.toBeInTheDocument();
    });

    it("should close the modal when the user hits Escape", () => {
      setup();
      openModal();

      userEvent.keyboard("{Escape}");

      const modal = screen.queryByRole("dialog");

      expect(modal).not.toBeInTheDocument();
    });

    it("should not close the modal when the user hits another key than Escape", () => {
      setup();
      openModal();

      userEvent.keyboard("{Shift}");

      const modal = screen.queryByRole("dialog");

      expect(modal).toBeInTheDocument();
    });
  });
});
