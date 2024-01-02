import { WalletConnection } from "../../src/app/context";

describe("Connect & disconnect a wallet.", () => {
  it("Happy flow new user", () => {
    cy.visit("/wallet");
    // Wallet page should load within 5000ms
    cy.get("h1", { timeout: 5000 });

    cy.get("h1").contains("Wallet Kit Page");

    cy.get("#ALBEDO_SelectWalletButton").click();
    cy.get("#checkbox_policy").click();

    // Mock the stellar wallet kit part
    cy.window().then((win) =>
      cy.stub(win, "walletDialog").callsFake(() => {
        return {
          stellarPubKey: "1234",
          walletType: "ALBEDO",
        } as WalletConnection;
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

  it("Happy flow existing user", () => {
    // Prepare localstorage
    cy.window().then((win) => {
      win.localStorage.setItem(
        "wallet",
        JSON.stringify({
          stellarPubKey: "6666",
          walletType: "ALBEDO",
        } as WalletConnection)
      );
    });

    // Test
    cy.visit("/wallet");
    cy.get("h1", { timeout: 5000 });

    cy.get("#stellarPubKey").contains("6666");
    cy.get("button")
      .contains("Disconnect & choose another STELLAR account")
      .click();

    cy.get("#ALBEDO_SelectWalletButton").should("have.class", "bg-white");

    cy.window().then((win) => {
      expect(win.localStorage.getItem("wallet")).to.be.null;
    });
  });

  it("Resets the form and displays an error if connecting new wallet fails", () => {
    cy.visit("/wallet");
    cy.get("h1", { timeout: 5000 });

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
