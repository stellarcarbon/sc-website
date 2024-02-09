// Helper function to select & (mock-)connect wallet.
export const connectWallet = (anonymous: boolean) => {
  cy.visit("/wallet");

  cy.get("button").contains("Continue").click();

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
  cy.get("main").contains("Transaction history");
  cy.location("pathname").should("eq", "/wallet");
};

export const canDisconnect = () => {
  cy.get("button").contains("Remove").click();

  // Assert if we are back on wallet connection setup page
  cy.location("pathname").should("eq", "/wallet");
  cy.get("button").contains("Continue");
  cy.window().then((win) => {
    const wallet = win.localStorage.getItem("wallet");
    expect(wallet).to.be.null;
  });
};
