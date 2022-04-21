import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

describe("Layout", () => {
  it("Layout should be render", () => {
    render(<Layout />);
    const header = screen.getByRole("heading");
    expect(header).toBeInTheDocument();
  });
});
