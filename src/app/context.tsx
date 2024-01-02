"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import {
  ISupportedWallet,
  StellarWalletsKit,
  WalletNetwork,
  WalletType,
} from "stellar-wallets-kit";

// A global app context used to store & read state everywhere.
export type WalletConnection = {
  stellarPubKey: string;
  walletType: WalletType;
  name?: string;
  email?: string;
};

type AppContext = {
  connectionError: string | null;
  supportedWallets: ISupportedWallet[];
  walletConnection: WalletConnection | null;
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
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [supportedWallets, setSupportedWallets] = useState<ISupportedWallet[]>(
    []
  );
  const [walletConnection, setWalletConnection] =
    useState<WalletConnection | null>(null);

  useEffect(() => {
    // Load local storage if available
    const storedWalletConnectionJSONString = localStorage.getItem("wallet");
    if (storedWalletConnectionJSONString) {
      const wc: WalletConnection = JSON.parse(storedWalletConnectionJSONString);
      setWalletConnection(wc);
    }

    // Load supported wallets
    const loadAvailableWallets = async () => {
      const wallets = await StellarWalletsKit.getSupportedWallets();
      setSupportedWallets(wallets);
    };
    loadAvailableWallets();
  }, []);

  const connectWallet = async (userWalletType: WalletType) => {
    setConnectionError(null);

    try {
      const walletConnection = await window.walletDialog(userWalletType);
      localStorage.setItem("wallet", JSON.stringify(walletConnection));
      setWalletConnection(walletConnection);
    } catch (error) {
      console.log(error);
      setConnectionError(
        "Something went wrong connecting your wallet. Try again."
      );
    }
  };

  const disconnectWallet = () => {
    localStorage.removeItem("wallet");
    setWalletConnection(null);
    console.log("removed wallet item");
  };

  const providerValue = useMemo(() => {
    return {
      connectionError,
      supportedWallets,
      walletConnection,
      connectWallet,
      disconnectWallet,
    };
  }, [connectionError, supportedWallets, walletConnection]);

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};

// Attach the walletDialog function to the window so we can mock it during test.
declare global {
  interface Window {
    walletDialog: (userWalletType: WalletType) => Promise<WalletConnection>;
  }
}

export const walletDialog = async (
  userWalletType: WalletType
): Promise<WalletConnection> => {
  let kit = new StellarWalletsKit({
    selectedWallet: userWalletType,
    network: WalletNetwork.PUBLIC,
  });

  let stellarPubKey = await kit.getPublicKey(); // will throw on error

  return {
    stellarPubKey,
    walletType: userWalletType,
  };
};

if (typeof window !== "undefined") {
  (window as any).walletDialog = walletDialog;
}
