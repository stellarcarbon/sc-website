import { WalletConnection } from "@/app/context/types";

describe("Connected user visiting checkout", () => {
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
    cy.visit("/checkout");
  });

  it("Can fill in form and submit", () => {
    // cy.get('input[type="range"]').invoke("val", 10).trigger("input");
    // cy.get('input[type="range"]').invoke("val", 20).trigger("input");
    const arrows = "{rightarrow}".repeat(8);

    cy.get('input[type="range"]').click({ multiple: true, force: true });

    cy.get('input[type="range"]').type(arrows);
    // .click(20, 20, { force: true });
    //   .invoke("val", 10)
    //   .trigger("mousedown", { which: 1, position: "left" })
    //   //   .trigger("mousemove", { which: 1, clientX: 300 })
    //   .trigger("mouseup", { force: true, position: "left", which: 1 })
    //   .trigger("change", { position: "left" });
  });
});
