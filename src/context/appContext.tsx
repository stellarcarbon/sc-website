"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import {
  ISupportedWallet,
  XBULL_ID,
  allowAllModules,
  StellarWalletsKit,
} from "@creit.tech/stellar-wallets-kit";
import {
  MyTransactionRecord,
  PersonalDetails,
  SinkCarbonXdrPostRequest,
  WalletConnection,
} from "@/app/types";
import { loadAvailableWalletsMock } from "./walletFunctions";

import useIsMobile from "@/hooks/useIsMobile";
import appConfig from "@/config";
import { useTransactionHistory } from "@/hooks/useTransactionHistory";
import { useWalletConnection } from "@/hooks/useWalletConnection";

declare global {
  interface Date {
    addDays(days: number): Date;
  }
}

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

// A global app context used to write & read state everywhere.
type AppContext = {
  // Wallet connection
  supportedWallets: ISupportedWallet[];
  walletConnection: WalletConnection | undefined | null;
  setWalletConnection: Dispatch<
    SetStateAction<WalletConnection | undefined | null>
  >;
  disconnectWallet: () => void;
  updateWalletConnection: (
    isAnonymous: boolean,
    personalDetails?: PersonalDetails
  ) => void;

  // Drawer
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  isDrawerClosing: boolean;

  // Personal transactions on dashboard
  myTransactions: MyTransactionRecord[] | null;
  pollForNewTransaction: (
    maxRetries?: number,
    delayMs?: number
  ) => Promise<void>;
  refetchTransactions: () => void;
  totalPending: number;
  totalSunk: number;

  // Round down support
  hasPendingRounding: boolean | undefined;
  setHasPendingRounding: Dispatch<SetStateAction<boolean | undefined>>;

  jwt: string | undefined;
  setJwt: Dispatch<SetStateAction<string | undefined>>;

  sinkRequest: SinkCarbonXdrPostRequest | undefined;
  setSinkRequest: Dispatch<
    SetStateAction<SinkCarbonXdrPostRequest | undefined>
  >;

  stellarWalletsKit: StellarWalletsKit | null;

  xlmBalance: number | undefined;
  usdcBalance: number | undefined;

  isMobileDevice: boolean;

  isDropdownOpen: boolean;
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;

  retirementGraceDays: number;
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
  const [supportedWallets, setSupportedWallets] = useState<ISupportedWallet[]>(
    []
  );
  const stellarWalletsKitRef = useRef<StellarWalletsKit | null>(null);

  const isMobileDevice = useIsMobile();

  const [jwt, setJwt] = useState<string>();
  const [sinkRequest, setSinkRequest] = useState<SinkCarbonXdrPostRequest>();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isDrawerClosing, setIsDrawerClosing] = useState<boolean>(false);
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerClosing(true);
    setTimeout(() => {
      setIsDrawerOpen(false);
      setIsDrawerClosing(false);
    }, 300);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const {
    walletConnection,
    setWalletConnection,
    updateWalletConnection,
    disconnectWallet,
    xlmBalance,
    usdcBalance,
    hasPendingRounding,
    setHasPendingRounding,
  } = useWalletConnection(stellarWalletsKitRef.current);

  const {
    myTransactions,
    totalPending,
    totalSunk,
    retirementGraceDays,
    pollForNewTransaction,
    refetch: refetchTransactions,
  } = useTransactionHistory(walletConnection?.stellarPubKey);

  useEffect(() => {
    const loadApp = async () => {
      const loadStellarWalletsKit = async () => {
        if (typeof window !== "undefined") {
          // This import makes sure assigning the kit to the ref happens client side.
          const { StellarWalletsKit } = await import(
            "@creit.tech/stellar-wallets-kit"
          );
          stellarWalletsKitRef.current = new StellarWalletsKit({
            network: appConfig.network,
            selectedWalletId: XBULL_ID,
            modules: allowAllModules(),
          });

          // Load supported wallets from stellar wallets kit
          let wallets;
          if (window.Cypress) {
            wallets = await loadAvailableWalletsMock();
          } else {
            wallets =
              (await stellarWalletsKitRef.current?.getSupportedWallets()) ?? [];
          }
          setSupportedWallets(wallets);
        }
      };

      if (stellarWalletsKitRef.current === null) {
        await loadStellarWalletsKit();
      }
    };

    loadApp();
  }, [myTransactions]);

  const providerValue = useMemo(() => {
    return {
      supportedWallets,
      walletConnection,
      setWalletConnection,

      disconnectWallet,
      updateWalletConnection,

      isDrawerOpen,
      openDrawer,
      closeDrawer,
      isDrawerClosing,

      myTransactions,
      pollForNewTransaction,
      refetchTransactions,
      totalPending,
      totalSunk,

      hasPendingRounding,
      setHasPendingRounding,

      jwt,
      setJwt,

      sinkRequest,
      setSinkRequest,

      stellarWalletsKit: stellarWalletsKitRef.current,

      xlmBalance,
      usdcBalance,

      isMobileDevice,

      isDropdownOpen,
      setIsDropdownOpen,

      retirementGraceDays,
    };
  }, [
    supportedWallets,
    walletConnection,
    setWalletConnection,
    isDrawerOpen,
    isDrawerClosing,
    myTransactions,
    pollForNewTransaction,
    refetchTransactions,
    totalPending,
    totalSunk,

    updateWalletConnection,
    hasPendingRounding,
    setHasPendingRounding,

    jwt,
    setJwt,
    sinkRequest,

    xlmBalance,
    usdcBalance,
    isMobileDevice,
    isDropdownOpen,
    disconnectWallet,
    retirementGraceDays,
  ]);

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
