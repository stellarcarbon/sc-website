"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import {
  StellarWalletsKit,
  WalletNetwork,
  WalletType,
} from "stellar-wallets-kit";

// A global app context used to store & read state everywhere.

type AppContext = {
  stellarPubKey?: string;
  wallet?: StellarWalletsKit;
  connectionError: string | null;
  connectWallet: (walletType: WalletType) => void;
  disconnectWallet: () => void;
};

const AppContext = createContext<AppContext | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw Error("No AppContext available");
  }
  return context;
};

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [stellarPubKey, setStellarPubKey] = useState<string | undefined>();
  const [wallet, setWallet] = useState<StellarWalletsKit | undefined>();
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const connectWallet = async (userWalletType: WalletType) => {
    setConnectionError(null);
    let kit = new StellarWalletsKit({
      selectedWallet: userWalletType,
      network: WalletNetwork.PUBLIC,
    });

    let stellarPubKey = await kit.getPublicKey().catch((error) => {
      setConnectionError(
        "Something went wrong connecting your wallet. Try again."
      );
      return "";
    });

    if (stellarPubKey === "") return;

    setStellarPubKey(stellarPubKey);
    setWallet(kit);
  };

  const disconnectWallet = () => {
    setStellarPubKey(undefined);
    setWallet(undefined);
  };

  const providerValue = useMemo(() => {
    return {
      stellarPubKey,
      wallet,
      connectionError,
      connectWallet,
      disconnectWallet,
    };
  }, [stellarPubKey, wallet, connectionError]);

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
