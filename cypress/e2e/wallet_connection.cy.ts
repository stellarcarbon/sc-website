import { WalletConnection } from "../../src/app/types";
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

  it("Can connect a wallet anonymously.", () => {
    connectWallet(true);

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

  it("Can disconnect after connecting", () => {
    connectWallet(true);
    canDisconnect();
  });

  it("Can connect a wallet with contact details", () => {
    connectWallet(false);

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
    // cy.visit("/wallet/connect", {
    //   onBeforeLoad(win) {
    //     (win as any).walletConnectDialogError = true;
    //   },
    // });

    cy.visit("/wallet", {
      onBeforeLoad(win) {
        (win as any).walletConnectDialogError = true;
      },
    });

    cy.get("button").contains("Connect wallet").click();
    cy.location("pathname").should("eq", "/wallet/connect");

    cy.get("button").contains("Connect wallet").click();

    cy.get("#ALBEDO_SelectWalletButtonDesktop").click();
    cy.get("#checkbox_policy").click();

    cy.get("button").contains("Connect wallet").click();

    cy.get("#checkbox_policy").should("not.be.checked");
    cy.get("p").contains(
      "Something went wrong connecting your wallet. Try again."
    );
  });

  it("has form validation on personal details form", () => {
    cy.visit("/wallet");

    cy.get("button").contains("Connect wallet").click();
    cy.location("pathname").should("eq", "/wallet/connect");

    cy.get("#ALBEDO_SelectWalletButtonDesktop").click();

    cy.get("input[name=username]").clear();
    cy.get("input[name=username]").type("testusername");
    cy.get("input[name=useremail]").clear();
    cy.get("input[name=useremail]").type("testuseremail@stellarcarbo"); // invalid email

    cy.get("#checkbox_policy").click();

    cy.get("button").contains("Connect wallet").click();

    cy.get("p")
      .contains("Invalid email address")
      .should("have.class", "text-red-500");
  });
});
