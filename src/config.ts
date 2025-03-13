import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";
import * as StellarSdk from "@stellar/stellar-sdk";
import { AppConfiguration } from "./app/types";
import { OpenAPI } from "./client";

function buildConfig(): AppConfiguration {
  const demo = process.env.NEXT_PUBLIC_DEMO_VERSION === "true";
  let network;
  let server;
  let apiBaseUrl;

  if (
    process.env.NEXT_PUBLIC_PRODUCTION === "production" ||
    process.env.NEXT_PUBLIC_USE_MAINNET === "true"
  ) {
    network = WalletNetwork.PUBLIC;
    server = new StellarSdk.Horizon.Server("https://horizon.stellar.org");
    apiBaseUrl = "https://api.stellarcarbon.io";
  } else {
    network = WalletNetwork.TESTNET;
    server = new StellarSdk.Horizon.Server(
      "https://horizon-testnet.stellar.org"
    );
    apiBaseUrl = "https://api.stellarcarbon.io/test";
  }

  OpenAPI.BASE = apiBaseUrl;

  return {
    network,
    server,
    apiBaseUrl,
    demo,
  };
}

const appConfig = buildConfig();

export default appConfig;
