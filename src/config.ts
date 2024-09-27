import * as StellarSdk from "@stellar/stellar-sdk";
import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";

export interface AppConfiguration {
  network: WalletNetwork;
  server: StellarSdk.Horizon.Server;
  demo: boolean;
}

const appConfig: AppConfiguration = {
  network:
    process.env.NEXT_PUBLIC_PRODUCTION === "production"
      ? WalletNetwork.PUBLIC
      : WalletNetwork.TESTNET,
  server:
    process.env.NEXT_PUBLIC_PRODUCTION === "production"
      ? new StellarSdk.Horizon.Server("https://horizon.stellar.org")
      : new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org"),
  demo: process.env.NEXT_PUBLIC_DEMO_VERSION === "true",
};

export default appConfig;
