"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import {
  ISupportedWallet,
  StellarWalletsKit,
  WalletNetwork,
  WalletType,
} from "stellar-wallets-kit";
import { PersonalDetails, WalletConnection } from "../types";
import { loadAvailableWallets, walletConnectDialog } from "./walletFunctions";
import { useRouter, usePathname } from "next/navigation";
import TransactionHistoryService, {
  MyTransactionRecord,
} from "../wallet/TransactionHistoryService";

const DEV_ACCOUNT = "GC53JCXZHW3SVNRE4CT6XFP46WX4ACFQU32P4PR3CU43OB7AKKMFXZ6Y";

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
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  myTransactions: MyTransactionRecord[];
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
  const [myTransactions, setMyTransactions] = useState<MyTransactionRecord[]>(
    []
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    closeDrawer();
  }, [pathname]);

  useEffect(() => {
    if (walletConnection === null && pathname === "/wallet") {
      router.push("/wallet/connect");
    }

    if (
      (walletConnection?.isAnonymous || walletConnection?.personalDetails) &&
      pathname === "/wallet/connect"
    ) {
      router.push("/wallet");
    }
  }, [walletConnection, pathname, router]);

  useEffect(() => {
    // Load local storage if available
    const storedWalletConnectionJSONString = localStorage.getItem("wallet");
    if (storedWalletConnectionJSONString) {
      const wc: WalletConnection = JSON.parse(storedWalletConnectionJSONString);
      setWalletConnection(wc);
    }

    // Load supported wallets if not loaded yet.
    if (supportedWallets.length === 0) {
      loadAvailableWallets().then((wallets) => {
        setSupportedWallets(wallets);
        return;
      });
    }

    // Start loading transactions.
    const transactionHistoryService = new TransactionHistoryService(
      setMyTransactions,
      DEV_ACCOUNT
    );
    transactionHistoryService.fetchHistory();
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
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      myTransactions,
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
