import { render, screen } from "@testing-library/react";
import MovieCard from "./MovieCard";

describe("MovieCard", () => {
  const setup = () => {
    const data = {
      img: "https://www.themoviedb.org/t/p/w220_and_h330_face/jBCUJ90BVXIDSLlXUvgQcj6LOHa.jpg",
      title: "Alerte Rouge",
      date: "10 mars 2022",
      popularity: "75",
    };

    render(<MovieCard data={data} />);
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
});
