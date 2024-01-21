import { WalletConnection } from "../../src/app/types";
import { canDisconnect } from "./flows";

describe("Anonymous user visiting dashboard", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem(
        "wallet",
        JSON.stringify({
          stellarPubKey: "6666",
          walletType: "ALBEDO",
          isAnonymous: true,
        } as WalletConnection)
      );
    });
    cy.visit("/wallet");
  });

  it("Can view stellar pub key", () => {
    cy.get("span").contains("6666");
  });

  it("Can disconnect wallet", () => {
    canDisconnect();
  });
});

describe("User with personal details visiting dashboard", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem(
        "wallet",
        JSON.stringify({
          stellarPubKey: "6666",
          walletType: "ALBEDO",
          isAnonymous: false,
          personalDetails: {
            username: "testusername",
            useremail: "testuseremail@stellarcarbon.io",
          },
        } as WalletConnection)
      );
    });
    cy.visit("/wallet");
  });

  it("Can view stellar pub key", () => {
    cy.get("span").contains("6666");
  });

  it("Can see that the connection is NOT anonymous", () => {
    cy.get("span").contains("testusername");
    cy.get("span").contains("testuseremail@stellarcarbon.io");
  });

  // it("Can continue to checkout", () => {
  //   cy.get("button").contains("Continue to checkout").click();
  //   cy.location("pathname").should("eq", "/checkout");
  // });

  it("Can disconnect wallet", () => {
    canDisconnect();
  });
});
