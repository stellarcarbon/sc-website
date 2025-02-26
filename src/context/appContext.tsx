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
} from "@creit.tech/stellar-wallets-kit";
import {
  MyTransactionRecord,
  PersonalDetails,
  SinkCarbonXdrPostRequest,
  WalletConnection,
} from "@/app/types";
import { loadAvailableWalletsMock } from "./walletFunctions";
import { usePathname } from "next/navigation";
import WalletConnectionStorageService from "@/services/WalletConnectionService";
import TransactionHistoryService from "@/services/TransactionHistoryService";
import RoundingService from "@/services/RoundingService";
import useIsMobile from "@/hooks/useIsMobile";
import appConfig from "@/config";

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
  setMyTransactions: Dispatch<SetStateAction<MyTransactionRecord[] | null>>;

  // Round down support
  hasPendingRounding: boolean | undefined;
  setHasPendingRounding: Dispatch<SetStateAction<boolean | undefined>>;

  sinkRequest: SinkCarbonXdrPostRequest | undefined;
  setSinkRequest: Dispatch<
    SetStateAction<SinkCarbonXdrPostRequest | undefined>
  >;

  stellarWalletsKit: StellarWalletsKit | null;

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
  const [isDrawerClosing, setIsDrawerClosing] = useState<boolean>(false);
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    // setIsDrawerOpen(false);
    setIsDrawerClosing(true);
    setTimeout(() => {
      setIsDrawerOpen(false);
      setIsDrawerClosing(false);
    }, 300);
  };

  const [xlmBalance, setXlmBalance] = useState<number>();
  const [usdcBalance, setUsdcBalance] = useState<number>();

  const pathname = usePathname();

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
  }, [walletConnection, myTransactions, pathname, hasPendingRounding]);

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
      isDrawerClosing,

      myTransactions,
      setMyTransactions,

      hasPendingRounding,
      setHasPendingRounding,

      sinkRequest,
      setSinkRequest,

      stellarWalletsKit: stellarWalletsKitRef.current,

      xlmBalance,
      usdcBalance,

      isMobileDevice,
    };
  }, [
    supportedWallets,
    walletConnection,
    isDrawerOpen,
    isDrawerClosing,
    myTransactions,
    updateWalletConnection,
    hasPendingRounding,
    sinkRequest,

    xlmBalance,
    usdcBalance,
    isMobileDevice,
  ]);

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
