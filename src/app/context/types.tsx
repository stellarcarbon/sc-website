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
