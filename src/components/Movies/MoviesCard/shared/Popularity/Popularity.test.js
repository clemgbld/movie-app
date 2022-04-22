import { render, screen } from "@testing-library/react";
import Popularity from "./Popularity";

describe("Popularity", () => {
  it("should be rendered", () => {
    render(<Popularity percent={50} />);

    const popularity = screen.getByTestId("popularity");

    expect(popularity).toBeInTheDocument();
  });
});
