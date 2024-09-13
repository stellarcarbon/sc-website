import { WalletNetwork } from "stellar-wallets-kit";

const appConfig = {
  network:
    process.env.NODE_ENV === "production"
      ? WalletNetwork.PUBLIC
      : WalletNetwork.TESTNET,
};

export default appConfig;
