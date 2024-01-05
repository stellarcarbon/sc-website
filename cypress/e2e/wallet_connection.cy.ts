import { WalletConnection } from "../../src/app/context/types";
import { canDisconnect, connectWallet } from "./flows";

declare global {
  interface Window {
    walletConnectDialogError: boolean;
  }
}

before(() => {});

describe("Setup wallet connection", () => {
  beforeEach(() => {
    localStorage.removeItem("wallet");
  });

  it("Can select a wallet and get stellar pub key from it.", () => {
    connectWallet();
  });

  it("Can disconnect on personal details form", () => {
    connectWallet();
    canDisconnect();
  });

  it("Can continue as anonymous", () => {
    connectWallet();
    cy.get("button").contains("Continue anonymous").click();
    cy.get("p").contains("Wallet setup succesful!");

    cy.window().then((win) => {
      const localStorageWallet = JSON.parse(
        win.localStorage.getItem("wallet")!
      );
      expect(localStorageWallet.isAnonymous).to.be.true;
      expect(localStorageWallet.personalDetails).to.not.exist;
      expect(localStorageWallet.stellarPubKey).to.equal("1234");
      expect(localStorageWallet.walletType).to.equal("ALBEDO");
    });
  });

  it("Can add personal details after connecting wallet", () => {
    connectWallet();

    cy.get("input[name=username]").clear();
    cy.get("input[name=username]").type("testusername");
    cy.get("input[name=useremail]").clear();
    cy.get("input[name=useremail]").type("testuseremail@stellarcarbon.io");
    cy.get("button").contains("Submit").click();

    cy.get("p").contains("Wallet setup succesful!");
    cy.get("#stellarPubKey").contains("1234");

    cy.window().then((win) => {
      const localStorageWallet = JSON.parse(
        win.localStorage.getItem("wallet")!
      );
      expect(localStorageWallet.isAnonymous).to.be.false;
      expect(localStorageWallet.personalDetails).to.exist;
      expect(localStorageWallet.personalDetails.username).to.equal(
        "testusername"
      );
      expect(localStorageWallet.personalDetails.useremail).to.equal(
        "testuseremail@stellarcarbon.io"
      );
      expect(localStorageWallet.stellarPubKey).to.equal("1234");
      expect(localStorageWallet.walletType).to.equal("ALBEDO");
    });
  });
});

describe("Connect wallet error handling.", () => {
  it("Resets the form and displays an error if connecting new wallet fails", () => {
    cy.visit("/wallet", {
      onBeforeLoad(win) {
        (win as any).walletConnectDialogError = true;
      },
    });
    cy.get("h1", { timeout: 5000 });

    cy.get("#ALBEDO_SelectWalletButton").click();
    cy.get("#checkbox_policy").click();

    cy.get("button").click();

    cy.get("#ALBEDO_SelectWalletButton").should("have.class", "bg-gray-700");
    cy.get("#checkbox_policy").should("not.be.checked");
    cy.get("button").should("be.disabled");
    cy.get("#SelectWalletError").contains(
      "Something went wrong connecting your wallet. Try again."
    );
  });

  it("has form validation on personal details form", () => {
    connectWallet();

    cy.get("input[name=username]").clear();
    cy.get("input[name=username]").type("testusername");
    cy.get("input[name=useremail]").clear();
    cy.get("input[name=useremail]").type("testuseremail@stellarcarbo"); // invalid email
    cy.get("button").contains("Submit").click();
    cy.get("button").contains("Submit").should("be.disabled");

    cy.get("p")
      .contains("Invalid email format")
      .should("have.class", "text-red-500");
  });
});
