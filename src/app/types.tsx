import {
  MemoType,
  PaymentAsset,
  RetirementSummary,
  SinkingResponse,
  VcsProject,
} from "@/client";
import {
  ReasonOption,
  ReasonOptionKey,
} from "@/containers/sink/form/ReasonSelect";
import {
  ISupportedWallet,
  WalletNetwork,
} from "@creit.tech/stellar-wallets-kit";
import * as StellarSdk from "@stellar/stellar-sdk";

export type WalletConnection = {
  stellarPubKey: string;
  walletType: ISupportedWallet;
  personalDetails?: PersonalDetails;
  isAnonymous: boolean;
};

export type PersonalDetails = {
  username: string;
  useremail: string;
};

export interface SinkingFormData {
  tonnes: number;
  currency: PaymentAsset;
  memo: string;
}

export enum RetirementStatus {
  PENDING_USER = "Pending certificate attribution",
  PENDING_STELLARCARBON = "Pending finalization by Stellarcarbon",
  RETIRED = "Retired into certificate(s)",
}

export interface MyTransactionRecord {
  id: string;
  createdAt: Date;
  memo: string;
  assetAmount: number;
  asset: string;
  sinkAmount: number;
  retirementStatus: RetirementStatus;
  retirements: RetirementSummary[];
  recipient: string;
  funder: string;
  pagingToken: string;
}

export interface FrontpageTransactionRecord {
  hash: string;
  pubkey: string;
  createdAt: string;
  memo: string;
  sinkAmount: number;
  id?: string;
}

export const DEV_ACCOUNT =
  "GC53JCXZHW3SVNRE4CT6XFP46WX4ACFQU32P4PR3CU43OB7AKKMFXZ6Y";

export const CARBON_SINK_ACCOUNT =
  "GC7CDWMCWNCY7JYUW5UBEOLNBSTNDKKZSFTHKGZNPPSOXLFYFX3CSINK";

export const CARBON_ACCOUNT =
  "GCBOATLWKXACOWKRRWORARDI2HFDSYPALMTS23YBZKHOB6XLW6CARBON";

export interface SinkCarbonXdrPostRequest {
  funder: string;
  recipient?: string;
  carbonAmount?: number;
  paymentAsset?: PaymentAsset;
  vcsProjectId?: VcsProject;
  memoType?: MemoType;
  memoValue?: string;
  email?: string;
}

export interface SinkingTransaction {
  transactionPostRequest?: SinkCarbonXdrPostRequest;
  transactionPostResponse?: SinkingResponse;
}

export interface AccountBalance {
  xlm: number;
  usdc: number;
}

export interface AppConfiguration {
  network: WalletNetwork;
  server: StellarSdk.Horizon.Server;
  demo: boolean;
  apiBaseUrl: string;
  usdcXlmLiquidityPoolId?: string;
  usdcAssetCode?: string;
}
