describe("Wallet Page", () => {
  it("Should contain a title", () => {
    cy.visit("/wallet");
    cy.get("h1").contains("Wallet Kit Page");
  });
});
