// TODO: cannot use @creit.tech/stellar-wallets-kit in test environment right now...

import { test } from "vitest";

test("LocalStorageService");

// import LocalStorageService from "../src/app/services/LocalStorageService";
// import { WalletConnection } from "../src/app/types";
// import {
//   StellarWalletsKit,
//   WalletNetwork,
//   WalletType,
// } from "@creit.tech/stellar-wallets-kit";

// describe("LocalStorageService", () => {
//   const fakeWalletConnection: WalletConnection = {
//     stellarPubKey: "1234",
//     walletType: WalletType.ALBEDO,
//     personalDetails: undefined,
//     isAnonymous: true,
//     kit: new StellarWalletsKit({
//       selectedWallet: WalletType.ALBEDO,
//       network: WalletNetwork.PUBLIC,
//     }),
//   };

//   test("local storage is key is wallet", () => {
//     expect(LocalStorageService.LOCAL_STORAGE_KEY).equals("wallet");
//   });

//   test("can set wallet connection", () => {
//     LocalStorageService.setWalletConnection(fakeWalletConnection);
//     const wc = localStorage.getItem("wallet");
//     expect(wc).equals({
//       stellarPubKey: "1234",
//       walletType: WalletType.ALBEDO,
//       personalDetails: undefined,
//       isAnonymous: true,
//     });
//   });

//   test("can remove wallet connection", () => {
//     LocalStorageService.setWalletConnection(fakeWalletConnection);
//     const wc = localStorage.getItem("wallet");
//     expect(wc).equals({
//       stellarPubKey: "1234",
//       walletType: WalletType.ALBEDO,
//       personalDetails: undefined,
//       isAnonymous: true,
//     });

//     LocalStorageService.removeWalletConnection();
//     const wc2 = localStorage.getItem("wallet");
//     expect(wc2).equals(undefined);
//   });

//   test("can load wallet connection");
// });
