import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";
import * as StellarSdk from "@stellar/stellar-sdk";
import { AppConfiguration } from "./app/types";

function buildConfig(): AppConfiguration {
  const network =
    process.env.NEXT_PUBLIC_PRODUCTION === "production"
      ? WalletNetwork.PUBLIC
      : WalletNetwork.TESTNET;

  const server =
    process.env.NEXT_PUBLIC_PRODUCTION === "production"
      ? new StellarSdk.Horizon.Server("https://horizon.stellar.org")
      : new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");

  const demo = process.env.NEXT_PUBLIC_DEMO_VERSION === "true";

  return {
    network,
    server,
    demo,
  };
}

const appConfig = buildConfig();

export default appConfig;
