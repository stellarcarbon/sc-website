"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import {
  ISupportedWallet,
  StellarWalletsKit,
  WalletType,
} from "stellar-wallets-kit";
import {
  MyTransactionRecord,
  PersonalDetails,
  WalletConnection,
} from "../app/types";
import {
  loadAvailableWalletsMock,
  walletConnectDialog,
} from "./walletFunctions";
import { usePathname } from "next/navigation";
import LocalStorageService from "@/app/services/LocalStorageService";
import { OpenAPI } from "@/client";

OpenAPI.BASE = "https://api-beta.stellarcarbon.io";

// A global app context used to write & read state everywhere.
type AppContext = {
  // Wallet connection
  connectionError: string | null;
  supportedWallets: ISupportedWallet[];
  walletConnection: WalletConnection | undefined | null;
  connectWallet: (
    walletType: WalletType,
    personalDetails: PersonalDetails
  ) => Promise<boolean>;
  disconnectWallet: () => void;

  // Drawer
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;

  // Personal transactions on dashboard
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

  const pathname = usePathname();

  const loadAvailableWallets = useCallback(async (): Promise<void> => {
    let wallets;
    if (window.Cypress) {
      wallets = await loadAvailableWalletsMock();
    } else {
      wallets = await StellarWalletsKit.getSupportedWallets();
    }

    setSupportedWallets(wallets);
  }, []);

  useEffect(() => {
    closeDrawer();
  }, [pathname]);

  useEffect(() => {
    // Load local storage if available
    if (walletConnection === null) {
      const wc = LocalStorageService.loadWalletConnection();
      setWalletConnection(wc);
    }

    // Load supported wallets if not loaded yet.
    if (supportedWallets.length === 0) {
      loadAvailableWallets();
    }
  }, [loadAvailableWallets, supportedWallets, walletConnection]);

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

      LocalStorageService.setWalletConnection(walletConnection);
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
    LocalStorageService.removeWalletConnection();
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
