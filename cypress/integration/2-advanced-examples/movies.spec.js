describe("movie-App", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should render the title of the page", () => {
    cy.get("h1").should("contain", "MovieFlix.");
  });
});
