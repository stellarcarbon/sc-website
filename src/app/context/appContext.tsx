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
import { useRouter } from "next/navigation";

// A global app context used to write & read state everywhere.

type AppContext = {
  connectionError: string | null;
  supportedWallets: ISupportedWallet[];
  walletConnection: WalletConnection | null;
  connectWallet: (
    walletType: WalletType,
    personalDetails: PersonalDetails
  ) => void;
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

  const router = useRouter();

  useEffect(() => {
    if (walletConnection === null) {
      router.push("/wallet/connect");
    }

    if (walletConnection?.isAnonymous || walletConnection?.personalDetails) {
      router.push("/wallet");
    }
  }, [walletConnection]);

  useEffect(() => {
    // Load local storage if available
    const storedWalletConnectionJSONString = localStorage.getItem("wallet");
    if (storedWalletConnectionJSONString) {
      const wc: WalletConnection = JSON.parse(storedWalletConnectionJSONString);
      setWalletConnection(wc);
      console.log("swc");
    }

    // Load supported wallets if not loaded yet.
    if (supportedWallets.length === 0) {
      console.log("no wallets");
      loadAvailableWallets().then((wallets) => {
        setSupportedWallets(wallets);
        return;
      });
    }
  }, []);

  const connectWallet = async (
    userWalletType: WalletType,
    personalDetails: PersonalDetails
  ) => {
    setConnectionError(null);

    try {
      const walletConnection = await walletConnectDialog(userWalletType);

      if (personalDetails.useremail !== "") {
        walletConnection.personalDetails = personalDetails;
        walletConnection.isAnonymous = false;
      } else {
        walletConnection.isAnonymous = true;
      }

      localStorage.setItem("wallet", JSON.stringify(walletConnection));
      setWalletConnection(walletConnection);
    } catch (error) {
      console.log("connect wallet error", error);
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