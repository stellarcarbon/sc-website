// Helper function to select & (mock-)connect wallet.
export const connectWallet = () => {
  cy.visit("/wallet");

  // Wallet page should load within 5000ms
  cy.location("pathname").should("eq", "/wallet/connect");

  cy.get("#ALBEDO_SelectWalletButtonDesktop").click();
  cy.get("#checkbox_policy").click();

  cy.get("button").contains("Connect wallet").click();

  // Assert if we are on contact info setup page
  cy.get("main").contains("Connected with Stellar PubKey:");
  cy.get("#stellarPubKey").contains("1234");

  cy.get("button").contains("Submit");
  cy.get("button").contains("Continue anonymous");
};

export const canDisconnect = () => {
  cy.get("button")
    .contains("Disconnect & choose another STELLAR account")
    .click();

  // Assert if we are back on wallet connection setup page
  cy.location("pathname").should("eq", "/wallet/connect");
  cy.get("#ALBEDO_SelectWalletButtonDesktop");
  cy.window().then((win) => {
    const wallet = win.localStorage.getItem("wallet");
    expect(wallet).to.be.null;
  });
};
