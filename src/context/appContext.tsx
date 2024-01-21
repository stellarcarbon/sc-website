"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import {
  ISupportedWallet,
  StellarWalletsKit,
  WalletNetwork,
  WalletType,
} from "stellar-wallets-kit";
import {
  MyTransactionRecord,
  PersonalDetails,
  WalletConnection,
} from "../app/types";
import { loadAvailableWallets, walletConnectDialog } from "./walletFunctions";
import { useRouter, usePathname } from "next/navigation";
import TransactionHistoryService from "../app/wallet/TransactionHistoryService";

// A global app context used to write & read state everywhere.
type AppContext = {
  connectionError: string | null;
  supportedWallets: ISupportedWallet[];
  walletConnection: WalletConnection | null;
  connectWallet: (
    walletType: WalletType,
    personalDetails: PersonalDetails
  ) => Promise<boolean>;
  disconnectWallet: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  myTransactions: MyTransactionRecord[] | null;
  setMyTransactions: Dispatch<SetStateAction<MyTransactionRecord[] | null>>;
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
  const [myTransactions, setMyTransactions] = useState<
    MyTransactionRecord[] | null
  >(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    closeDrawer();
  }, [pathname]);

  useEffect(() => {
    console.log("On mount AppContext");

    // Load local storage if available
    const storedWalletConnectionJSONString = localStorage.getItem("wallet");
    if (storedWalletConnectionJSONString) {
      const wc: WalletConnection = JSON.parse(storedWalletConnectionJSONString);
      wc.kit = new StellarWalletsKit({
        selectedWallet: wc.walletType,
        network: WalletNetwork.PUBLIC,
      });
      setWalletConnection(wc);
    }

    // Load supported wallets if not loaded yet.
    if (supportedWallets.length === 0) {
      loadAvailableWallets().then((wallets) => {
        setSupportedWallets(wallets);
        return;
      });
    }
  }, []);

  const connectWallet = async (
    userWalletType: WalletType,
    personalDetails: PersonalDetails
  ): Promise<boolean> => {
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

      return true;
    } catch (error) {
      console.log("connect wallet error", error);
      setConnectionError(
        "Something went wrong connecting your wallet. Try again."
      );
      return false;
    }
  };

  const disconnectWallet = () => {
    localStorage.removeItem("wallet");
    setWalletConnection(null);
    setMyTransactions(null);
  };

  const providerValue = useMemo(() => {
    return {
      connectionError,
      supportedWallets,
      walletConnection,
      connectWallet,
      disconnectWallet,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      myTransactions,
      setMyTransactions,
    };
  }, [
    connectionError,
    supportedWallets,
    walletConnection,
    isDrawerOpen,
    myTransactions,
  ]);

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
