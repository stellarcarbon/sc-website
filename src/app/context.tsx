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
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const connectWallet = async (userWalletType: WalletType) => {
    setConnectionError(null);

    try {
      const pubKey = await window.walletDialog(userWalletType);
      setStellarPubKey(pubKey);
    } catch (error) {
      setConnectionError(
        "Something went wrong connecting your wallet. Try again."
      );
    }
  };

  const disconnectWallet = () => {
    setStellarPubKey(undefined);
  };

  const providerValue = useMemo(() => {
    return {
      stellarPubKey,
      connectionError,
      connectWallet,
      disconnectWallet,
    };
  }, [stellarPubKey, connectionError]);

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};

// Attach the walletDialog function to the window so we can mock it during test.
declare global {
  interface Window {
    walletDialog: (userWalletType: WalletType) => Promise<string>;
  }
}

export const walletDialog = async (
  userWalletType: WalletType
): Promise<string> => {
  let kit = new StellarWalletsKit({
    selectedWallet: userWalletType,
    network: WalletNetwork.PUBLIC,
  });

  let stellarPubKey = await kit.getPublicKey(); // will throw on error

  return stellarPubKey;
};

if (typeof window !== "undefined") {
  (window as any).walletDialog = walletDialog;
}
