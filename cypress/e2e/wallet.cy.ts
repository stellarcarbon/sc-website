describe("Connect & disconnect a wallet.", () => {
  it("Happy flow", () => {
    cy.visit("/wallet");
    cy.get("h1").contains("Wallet Kit Page");

    cy.get("#ALBEDO_SelectWalletButton").click();
    cy.get("#checkbox_policy").click();

    // Mock the stellar wallet kit part
    cy.window().then((win) =>
      cy.stub(win, "walletDialog").callsFake(() => {
        return "1234";
      })
    );

    cy.get("button").click();

    cy.get("#content").contains("Connected with Stellar PubKey:");
    cy.get("#stellarPubKey").contains("1234");

    cy.get("button")
      .contains("Disconnect & choose another STELLAR account")
      .click();

    cy.get("#ALBEDO_SelectWalletButton").should("have.class", "bg-white");
    cy.get("#checkbox_policy").should("not.be.checked");
    cy.get("button").should("be.disabled");
  });
  it("Resets the form and displays an error if the wallet kit part fails", () => {
    cy.visit("/wallet");

    cy.get("#ALBEDO_SelectWalletButton").click();
    cy.get("#checkbox_policy").click();

    cy.window().then((win) =>
      cy.stub(win, "walletDialog").callsFake(() => {
        throw Error();
      })
    );

    cy.get("button").click();

    cy.get("#ALBEDO_SelectWalletButton").should("have.class", "bg-white");
    cy.get("#checkbox_policy").should("not.be.checked");
    cy.get("button").should("be.disabled");
    cy.get("#SelectWalletError").contains(
      "Something went wrong connecting your wallet. Try again."
    );
  });
});
