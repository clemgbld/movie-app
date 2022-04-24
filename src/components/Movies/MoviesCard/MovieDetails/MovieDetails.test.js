import { render, screen, waitFor } from "@testing-library/react";
import MovieDetails from "./MovieDetails";

describe("MoVieDetails", () => {
  const setup = () => {
    render(<MovieDetails />);
  };

  it("should render a modal", () => {
    setup();

    const modal = screen.getByRole("dialog");

    expect(modal).toBeInTheDocument();
  });
});
