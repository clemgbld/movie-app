describe("movie-App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("should render the title of the page", () => {
    cy.get("h1").should("contain", "MovieFlix.");
  });

  it("should render 20 movie cards", () => {
    cy.get("[role='contentinfo']").should("have.length", 20);
  });

  it("should be able to open the modal with the details", () => {
    cy.get("[data-cy='movie-img']").first().click();

    cy.get("[role='dialog']").should("be.visible");
  });

  it("should be able to close the modal by clicking on the button", () => {
    cy.get("[data-cy='movie-img']").first().click();

    cy.get("[data-cy='close']").click();

    cy.get("[role='dialog']").should("not.exist");
  });
});
