import * as StellarSdk from "@stellar/stellar-sdk";
import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";

export interface AppConfiguration {
  network: WalletNetwork;
  server: StellarSdk.Horizon.Server;
  demo: boolean;
}

const appConfig: AppConfiguration = {
  network:
    process.env.NODE_ENV === "production"
      ? WalletNetwork.PUBLIC
      : WalletNetwork.TESTNET,
  server:
    process.env.NODE_ENV === "production"
      ? new StellarSdk.Horizon.Server("https://horizon.stellar.org")
      : new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org"),
  demo: process.env.NEXT_PUBLIC_DEMO_VERSION === "true",
};

export default appConfig;
