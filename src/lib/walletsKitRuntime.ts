"use client";

import {
  STELLAR_NETWORKS,
  StellarNetworkPassphrase,
} from "@/constants/stellarNetwork";
import { StellarWalletsKit } from "@creit-tech/stellar-wallets-kit/sdk";
import { Networks } from "@creit-tech/stellar-wallets-kit/types";
import { defaultModules } from "@creit-tech/stellar-wallets-kit/modules/utils";
import { LedgerModule } from "@creit-tech/stellar-wallets-kit/modules/ledger";
import { XBULL_ID } from "@creit-tech/stellar-wallets-kit/modules/xbull";

const toSwkNetwork = (network: StellarNetworkPassphrase): Networks => {
  return network === STELLAR_NETWORKS.PUBLIC
    ? Networks.PUBLIC
    : Networks.TESTNET;
};

export const initializeWalletsKit = ({
  network,
  selectedWalletId,
}: {
  network: StellarNetworkPassphrase;
  selectedWalletId?: string;
}) => {
  StellarWalletsKit.init({
    modules: [...defaultModules(), new LedgerModule()],
    selectedWalletId: selectedWalletId ?? XBULL_ID,
    network: toSwkNetwork(network),
  });
};

export const refreshSupportedWallets = () => {
  return StellarWalletsKit.refreshSupportedWallets();
};

export const setWallet = (walletId: string) => {
  StellarWalletsKit.setWallet(walletId);
};

export const getAddress = () => {
  return StellarWalletsKit.getAddress();
};

export const signTransaction = (
  xdr: string,
  options?: Parameters<typeof StellarWalletsKit.signTransaction>[1],
) => {
  return StellarWalletsKit.signTransaction(xdr, options);
};
