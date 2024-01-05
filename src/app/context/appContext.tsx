"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import {
  ISupportedWallet,
  StellarWalletsKit,
  WalletNetwork,
  WalletType,
} from "stellar-wallets-kit";
import { PersonalDetails, WalletConnection } from "./types";
import { loadAvailableWallets, walletConnectDialog } from "./walletFunctions";

// A global app context used to write & read state everywhere.

type AppContext = {
  connectionError: string | null;
  supportedWallets: ISupportedWallet[];
  walletConnection: WalletConnection | null;
  connectWallet: (walletType: WalletType) => void;
  disconnectWallet: () => void;
  setAnonymous: () => void;
  setPersonalDetails: (personalDetails: PersonalDetails) => void;
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
    // const loadAvailableWallets = async () => {
    //   const wallets = await StellarWalletsKit.getSupportedWallets();
    //   setSupportedWallets(wallets);
    // };
    loadAvailableWallets().then((wallets) => {
      setSupportedWallets(wallets);
      return;
    });
  }, []);

  const connectWallet = async (userWalletType: WalletType) => {
    setConnectionError(null);

    try {
      const walletConnection = await walletConnectDialog(userWalletType);
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

  const setAnonymous = () => {
    console.log("set as anonymouss");
    const updatedWalletConnection = {
      ...walletConnection,
      isAnonymous: true,
      personalDetails: undefined,
    } as WalletConnection;

    localStorage.setItem("wallet", JSON.stringify(updatedWalletConnection));
    setWalletConnection(updatedWalletConnection);
  };

  const setPersonalDetails = (personalDetails: PersonalDetails) => {
    console.log("set personal details");
    const updatedWalletConnection = {
      ...walletConnection,
      isAnonymous: false,
      personalDetails,
    } as WalletConnection;
    localStorage.setItem("wallet", JSON.stringify(updatedWalletConnection));
    setWalletConnection(updatedWalletConnection);
  };

  const providerValue = useMemo(() => {
    return {
      connectionError,
      supportedWallets,
      walletConnection,
      connectWallet,
      disconnectWallet,
      setAnonymous,
      setPersonalDetails,
    };
  }, [connectionError, supportedWallets, walletConnection]);

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
