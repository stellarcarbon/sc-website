import { WalletType } from "stellar-wallets-kit";

export type WalletConnection = {
  stellarPubKey: string;
  walletType: WalletType;
  personalDetails?: PersonalDetails;
  isAnonymous: boolean;
};

export type PersonalDetails = {
  username: string;
  useremail: string;
};

export type Payment = {
  hash: string;
  createdAt: Date;
  transactionSuccesful: boolean;
  transaction?: Transaction;
};

export type Transaction = {
  paymentAsset: string;
  paymentAmount: number;
  memo: string;
};
