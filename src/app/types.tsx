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
  currency: CurrencyOptions;
  reason: ReasonOptions;
}

export enum CurrencyOptions {
  XLM = "XLM",
  USDC = "USDC",
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
