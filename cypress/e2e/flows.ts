// Helper function to select & (mock-)connect wallet.
export const connectWallet = (anonymous: boolean) => {
  cy.visit("/wallet");

  // Wallet page should load within 5000ms
  cy.location("pathname").should("eq", "/wallet/connect");

  cy.get("#ALBEDO_SelectWalletButtonDesktop").click();
  cy.get("#checkbox_policy").click();

  if (!anonymous) {
    cy.get("input[name=username]").clear();
    cy.get("input[name=username]").type("testusername");
    cy.get("input[name=useremail]").clear();
    cy.get("input[name=useremail]").type("testuseremail@stellarcarbon.io");
  }

  cy.get("button").contains("Connect wallet").click();

  // Assert if we are dashboard
  cy.get("main").contains("Connected with Stellar PubKey:");
  cy.get("#stellarPubKey");
  cy.location("pathname").should("eq", "/wallet");
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
