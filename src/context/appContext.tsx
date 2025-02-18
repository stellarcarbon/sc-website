"use client";

import {
  createContext,
  useCallback,
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
  WalletNetwork,
} from "@creit.tech/stellar-wallets-kit";
import * as StellarSdk from "@stellar/stellar-sdk";
import {
  MyTransactionRecord,
  PersonalDetails,
  SinkCarbonXdrPostRequest,
  WalletConnection,
} from "@/app/types";
import {
  loadAvailableWalletsMock,
  walletConnectDialog,
} from "./walletFunctions";
import { usePathname, useRouter } from "next/navigation";
import WalletConnectionStorageService from "@/services/WalletConnectionService";
import { OpenAPI } from "@/client";
import TransactionHistoryService from "@/services/TransactionHistoryService";
import RoundingService from "@/services/RoundingService";
import { AppConfiguration } from "@/app/types";
import useIsMobile from "@/hooks/useIsMobile";

console.log(`NEXT_PUBLIC_PRODUCTION: ${process.env.NEXT_PUBLIC_PRODUCTION}`);
if (process.env.NEXT_PUBLIC_PRODUCTION === "development") {
  OpenAPI.BASE = "http://localhost:8000";
  // OpenAPI.BASE = "https://api.stellarcarbon.io";
} else if (process.env.NEXT_PUBLIC_PRODUCTION === "production") {
  OpenAPI.BASE = "https://api.stellarcarbon.io";
} else {
  OpenAPI.BASE = "https://api.stellarcarbon.io/test";
}

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

  // Personal transactions on dashboard
  myTransactions: MyTransactionRecord[] | null;
  setMyTransactions: Dispatch<SetStateAction<MyTransactionRecord[] | null>>;

  // Round down support
  hasPendingRounding: boolean | undefined;
  setHasPendingRounding: Dispatch<SetStateAction<boolean | undefined>>;

  sinkRequest: SinkCarbonXdrPostRequest | undefined;
  setSinkRequest: Dispatch<
    SetStateAction<SinkCarbonXdrPostRequest | undefined>
  >;

  stellarWalletsKit: StellarWalletsKit | null;

  appConfig: AppConfiguration;

  xlmBalance: number | undefined;
  usdcBalance: number | undefined;

  isMobileDevice: boolean;
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

  // Null at first, will become undefined after attempting to load from local storage fails.
  const [walletConnection, setWalletConnection] = useState<
    WalletConnection | null | undefined
  >(null);
  const [myTransactions, setMyTransactions] = useState<
    MyTransactionRecord[] | null
  >(null);
  const [hasPendingRounding, setHasPendingRounding] = useState<boolean>();
  const [sinkRequest, setSinkRequest] = useState<SinkCarbonXdrPostRequest>();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const [xlmBalance, setXlmBalance] = useState<number>();
  const [usdcBalance, setUsdcBalance] = useState<number>();

  const pathname = usePathname();
  const router = useRouter();

  const appConfig = useMemo(() => {
    return {
      network:
        process.env.NEXT_PUBLIC_PRODUCTION === "production"
          ? WalletNetwork.PUBLIC
          : WalletNetwork.TESTNET,
      server:
        process.env.NEXT_PUBLIC_PRODUCTION === "production"
          ? new StellarSdk.Horizon.Server("https://horizon.stellar.org")
          : new StellarSdk.Horizon.Server(
              "https://horizon-testnet.stellar.org"
            ),
      demo: process.env.NEXT_PUBLIC_DEMO_VERSION === "true",
    };
  }, []);

  useEffect(() => {
    closeDrawer();
  }, [pathname]);

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
          console.log("StellarWalletsKit loaded", stellarWalletsKitRef.current);

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

      const loadWalletConnection = () => {
        const wc = WalletConnectionStorageService.loadWalletConnection();
        if (wc !== undefined) {
          stellarWalletsKitRef.current?.setWallet(wc.walletType.id);
        }
        setWalletConnection(wc);
      };

      if (stellarWalletsKitRef.current === null) {
        await loadStellarWalletsKit();
      }

      if (walletConnection === null) {
        loadWalletConnection();
      } else if (walletConnection === undefined) {
      } else {
        if (
          myTransactions === null &&
          pathname !== "/dashboard/transactions/history/" // This path will fetch on its own.
        ) {
          // Load personal transactions.
          TransactionHistoryService.fetchAccountHistory(
            walletConnection.stellarPubKey!
          ).then((transactionRecords): void => {
            setMyTransactions(transactionRecords);
          });
        }

        TransactionHistoryService.fetchAccountBalance(
          appConfig.server,
          walletConnection.stellarPubKey
        ).then((accountBalance) => {
          setXlmBalance(accountBalance.xlm);
          setUsdcBalance(accountBalance.usdc);
        });

        // Pending rounding check
        if (
          walletConnection !== undefined &&
          hasPendingRounding === undefined &&
          pathname !== "/dashboard/transactions/" // This path will fetch on its own.
        ) {
          RoundingService.hasPendingRounding(
            walletConnection.stellarPubKey
          ).then((isPending) => setHasPendingRounding(isPending));
        }
      }
    };

    loadApp();
  }, [
    walletConnection,
    myTransactions,
    pathname,
    hasPendingRounding,
    appConfig,
  ]);

  const updateWalletConnection = useCallback(
    (isAnonymous: boolean, personalDetails?: PersonalDetails) => {
      const newWalletConnection: WalletConnection = {
        ...walletConnection!,
        personalDetails,
        isAnonymous,
      };

      WalletConnectionStorageService.setWalletConnection(newWalletConnection);
      setWalletConnection(newWalletConnection);
    },
    [walletConnection]
  );

  const disconnectWallet = () => {
    WalletConnectionStorageService.removeWalletConnection();
    setWalletConnection(undefined);
    setMyTransactions(null);
  };

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

      myTransactions,
      setMyTransactions,

      hasPendingRounding,
      setHasPendingRounding,

      sinkRequest,
      setSinkRequest,

      stellarWalletsKit: stellarWalletsKitRef.current,

      appConfig,

      xlmBalance,
      usdcBalance,

      isMobileDevice,
    };
  }, [
    supportedWallets,
    walletConnection,
    isDrawerOpen,
    myTransactions,
    updateWalletConnection,
    hasPendingRounding,
    sinkRequest,
    appConfig,
    xlmBalance,
    usdcBalance,
    isMobileDevice,
  ]);

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
