"use client";

import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";
import * as StellarSdk from "@stellar/stellar-sdk";
import { client } from "@stellarcarbon/sc-sdk";
import { DetailedHTMLProps, ScriptHTMLAttributes } from "react";

export interface AppConfiguration {
  network: WalletNetwork;
  server: StellarSdk.Horizon.Server;
  demo: boolean;
  apiBaseUrl: string;
  pubnetDeployment: boolean;

  usdcXlmLiquidityPoolId?: string;
  usdcAssetCode?: string;
}

function buildConfig(): AppConfiguration {
  const demo = process.env.NEXT_PUBLIC_DEMO_VERSION === "true";
  let usdcXlmLiquidityPoolId = process.env.NEXT_PUBLIC_LIQUIDITY_POOL_ID;
  let usdcAssetCode = process.env.NEXT_PUBLIC_USDC_ASSET_CODE;

  // Distinguish between prod & test deployments
  let pubnetDeployment = process.env.NEXT_PUBLIC_PRODUCTION === "pubnet";

  let network = pubnetDeployment ? WalletNetwork.PUBLIC : WalletNetwork.TESTNET;
  let server = pubnetDeployment
    ? new StellarSdk.Horizon.Server("https://horizon.stellar.org")
    : new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");
  let apiBaseUrl = pubnetDeployment
    ? "https://api.stellarcarbon.io"
    : "https://testnet-api.stellarcarbon.io";

  if (
    process.env.NEXT_PUBLIC_USE_MAINNET === "true" &&
    process.env.NODE_ENV === "development"
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
    pubnetDeployment,
    network,
    server,
    apiBaseUrl,
    demo,
    usdcXlmLiquidityPoolId,
    usdcAssetCode,
  };
}

const appConfig = buildConfig();

export default appConfig;
