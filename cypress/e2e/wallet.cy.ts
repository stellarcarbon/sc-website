import { WalletConnection } from "../../src/app/context";

// Helper function to select & (mock-)connect wallet.
const connectWallet = () => {
  cy.visit("/wallet");
  // Wallet page should load within 5000ms
  cy.get("h1", { timeout: 5000 });

  cy.get("h1").contains("Wallet Page");

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
};

describe("New user", () => {
  beforeEach(() => {
    localStorage.removeItem("wallet");
  });

  it("Can connect wallet.", () => {
    connectWallet();

    cy.get("main").contains("Connected with Stellar PubKey:");
    cy.get("#stellarPubKey").contains("1234");
  });

  it("Can disconnect on personal details form", () => {
    connectWallet();

    cy.get("button")
      .contains("Disconnect & choose another STELLAR account")
      .click();

    cy.get("#ALBEDO_SelectWalletButton").should("have.class", "bg-white");
    cy.get("#checkbox_policy").should("not.be.checked");
    cy.get("button").should("be.disabled");
  });

  it("Can disconnect after setup is complete", () => {
    connectWallet();

    cy.get("button").contains("Continue anonymous").click();

    cy.get("button")
      .contains("Disconnect & choose another STELLAR account")
      .click();

    cy.get("#ALBEDO_SelectWalletButton").should("have.class", "bg-white");
    cy.get("#checkbox_policy").should("not.be.checked");
    cy.get("button").should("be.disabled");
  });

  it("Can add personal details after connecting wallet", () => {
    connectWallet();

    cy.get("input[name=username]").clear();
    cy.get("input[name=username]").type("testusername");
    cy.get("input[name=useremail]").clear();
    cy.get("input[name=useremail]").type("testuseremail@stellarcarbon.io");
    cy.get("button").contains("Submit & Continue").click();

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

  it("Can continue as anonymous user", () => {
    connectWallet();

    cy.get("button").contains("Continue anonymous").click();

    cy.get("p").contains("Wallet setup succesful!");
    cy.get("#stellarPubKey").contains("1234");

    cy.window().then((win) => {
      const localStorageWallet = JSON.parse(
        win.localStorage.getItem("wallet")!
      );
      expect(localStorageWallet.isAnonymous).to.be.true;
      expect(localStorageWallet.personalDetails).to.be.undefined;
      expect(localStorageWallet.stellarPubKey).to.equal("1234");
      expect(localStorageWallet.walletType).to.equal("ALBEDO");
    });
  });
});

describe("Existing user (anonymous)", () => {
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
  });

  it("will immediately land on connected page", () => {
    cy.visit("/wallet");
    cy.get("p").contains("Wallet setup succesful!");
  });

  it("can disconnect/reset the connection", () => {
    cy.visit("/wallet");
    cy.get("button")
      .contains("Disconnect & choose another STELLAR account")
      .click();
    cy.get("#ALBEDO_SelectWalletButton").should("have.class", "bg-white");
    cy.get("#checkbox_policy").should("not.be.checked");
    cy.get("button").should("be.disabled");
  });
});

describe("Existing user (personal details)", () => {
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
  });

  it("will immediately land on connect page", () => {
    cy.visit("/wallet");
    cy.get("p").contains("Wallet setup succesful!");
    cy.get("p").contains("Username: testusername");
    cy.get("p").contains("Email: testuseremail@stellarcarbon.io");
  });

  it("can disconnect/reset the connection", () => {
    cy.visit("/wallet");
    cy.get("button")
      .contains("Disconnect & choose another STELLAR account")
      .click();
    cy.get("#ALBEDO_SelectWalletButton").should("have.class", "bg-white");
    cy.get("#checkbox_policy").should("not.be.checked");
    cy.get("button").should("be.disabled");
  });
});

describe("Connect wallet error handling.", () => {
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

  it("has form validation on personal details form", () => {
    connectWallet();

    cy.get("input[name=username]").clear();
    cy.get("input[name=username]").type("testusername");
    cy.get("input[name=useremail]").clear();
    cy.get("input[name=useremail]").type("testuseremail@stellarcarbo"); // invalid email
    cy.get("button").contains("Submit & Continue").click();
    cy.get("button").contains("Submit & Continue").should("be.disabled");

    cy.get("p")
      .contains("Invalid email format")
      .should("have.class", "text-red-500");
  });
});
