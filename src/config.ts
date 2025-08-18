import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";
import * as StellarSdk from "@stellar/stellar-sdk";
import { client } from "@stellarcarbon/sc-sdk";

export interface AppConfiguration {
  network: WalletNetwork;
  server: StellarSdk.Horizon.Server;
  demo: boolean;
  apiBaseUrl: string;

  nodeEnv: "production" | "development" | "test";
  plausibleDataDomain: string;
  usdcXlmLiquidityPoolId?: string;
  usdcAssetCode?: string;
}

function buildConfig(): AppConfiguration {
  const demo = process.env.NEXT_PUBLIC_DEMO_VERSION === "true";
  let usdcXlmLiquidityPoolId = process.env.NEXT_PUBLIC_LIQUIDITY_POOL_ID;
  let usdcAssetCode = process.env.NEXT_PUBLIC_USDC_ASSET_CODE;

  let nodeEnv = process.env.NODE_ENV;

  let network =
    nodeEnv === "production" ? WalletNetwork.PUBLIC : WalletNetwork.TESTNET;
  let server =
    nodeEnv === "production"
      ? new StellarSdk.Horizon.Server("https://horizon.stellar.org")
      : new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");
  let apiBaseUrl =
    nodeEnv === "production"
      ? "https://api.stellarcarbon.io"
      : "https://testnet-api.stellarcarbon.io";

  let plausibleDataDomain =
    nodeEnv === "production" ? "new.stellarcarbon.io" : "test.stellarcarbon.io";

  if (
    process.env.NEXT_PUBLIC_USE_MAINNET === "true" &&
    nodeEnv === "development"
  ) {
    // Connect to mainnet while developing
    network = WalletNetwork.PUBLIC;
    server = new StellarSdk.Horizon.Server("https://horizon.stellar.org");
    apiBaseUrl = "https://api.stellarcarbon.io";
  }

  client.setConfig({
    baseUrl: apiBaseUrl,
  });

  return {
    nodeEnv,
    network,
    server,
    apiBaseUrl,
    demo,
    plausibleDataDomain,
    usdcXlmLiquidityPoolId,
    usdcAssetCode,
  };
}

const appConfig = buildConfig();

export default appConfig;
