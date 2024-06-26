import { MemoType, PaymentAsset, VcsProject } from "@/client";
import { StellarWalletsKit, WalletType } from "stellar-wallets-kit";

export type WalletConnection = {
  kit: StellarWalletsKit;
  stellarPubKey: string;
  walletType: WalletType;
  personalDetails?: PersonalDetails;
  isAnonymous: boolean;
};

export type PersonalDetails = {
  username: string;
  useremail: string;
};

export interface CheckoutFormData {
  tonnes: number;
  currency: PaymentAsset;
  reason: ReasonOptions;
}

export enum ReasonOptions {
  ENVIRONMENT = "ENVIRONMENT",
  HOUSEHOLD = "HOUSEHOLD",
  AIRTRAVEL = "AIRTRAVEL",
  ROADTRAVEL = "ROADTRAVEL",
}

export interface MyTransactionRecord {
  id: string;
  createdAt: string;
  memo: string;
  assetAmount: number;
  asset: string;
  sinkAmount: number;
  // Add other relevant transaction properties here
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

export enum FormStatusMessages {
  creating = "Creating your transaction using Stellarcarbon API...",
  signTransaction = "Sign the transaction using your wallet in the pop-up.",
  awaitBlockchain = "Transaction signed. It has been submitted to the Stellar blockchain and we are awaiting confirmation. This can take a couple seconds...",
  completed = "Success! (did not really post to blockchain though)",
}

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
