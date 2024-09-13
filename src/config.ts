import * as StellarSdk from "@stellar/stellar-sdk";
import { WalletNetwork } from "stellar-wallets-kit";

StellarSdk.xdr;

const appConfig = {
  network:
    process.env.NODE_ENV === "production"
      ? WalletNetwork.PUBLIC
      : WalletNetwork.TESTNET,
  server:
    process.env.NODE_ENV === "production"
      ? new StellarSdk.Horizon.Server("https://horizon.stellar.org")
      : new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org"),
};

export default appConfig;
