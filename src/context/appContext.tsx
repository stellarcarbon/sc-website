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
import {
  loadAvailableWalletsMock,
  walletConnectDialog,
} from "./walletFunctions";
import { usePathname } from "next/navigation";
import WalletConnectionService from "@/services/WalletConnectionService";
import { OpenAPI } from "@/client";
import TransactionHistoryService from "@/services/TransactionHistoryService";
import RoundingService from "@/services/RoundingService";
import appConfig from "@/config";

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV === "development") {
  OpenAPI.BASE = "http://localhost:8000";
  // OpenAPI.BASE = "https://api-beta.stellarcarbon.io";
} else {
  OpenAPI.BASE = "https://api-beta.stellarcarbon.io/test";
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
  connectionError: string | null;
  supportedWallets: ISupportedWallet[];
  walletConnection: WalletConnection | undefined | null;
  connectWallet: (
    wallet: ISupportedWallet,
    personalDetails: PersonalDetails
  ) => Promise<boolean>;
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
  const stellarWalletsKitRef = useRef<StellarWalletsKit | null>(null);

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

  const pathname = usePathname();

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
        const wc = WalletConnectionService.loadWalletConnection();
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
      } else {
        if (
          myTransactions === null &&
          walletConnection?.stellarPubKey !== "" &&
          pathname !== "/dashboard/transactions/history/" // This path will fetch on its own.
        ) {
          // Load personal transactions.
          TransactionHistoryService.fetchAccountHistory(
            walletConnection?.stellarPubKey!
          ).then((transactionRecords): void => {
            setMyTransactions(transactionRecords);
          });
        }

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

  const connectWallet = async (
    wallet: ISupportedWallet,
    personalDetails: PersonalDetails
  ): Promise<boolean> => {
    setConnectionError(null);

    try {
      const walletConnection = await walletConnectDialog(wallet);
      if (walletConnection.stellarPubKey === "") {
        throw Error("No pubkey from wallet connect dialog");
      }

      if (personalDetails.useremail !== "") {
        walletConnection.personalDetails = personalDetails;
        walletConnection.isAnonymous = false;
      } else {
        walletConnection.isAnonymous = true;
      }

      WalletConnectionService.setWalletConnection(walletConnection);
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

  const updateWalletConnection = useCallback(
    (isAnonymous: boolean, personalDetails?: PersonalDetails) => {
      const newWalletConnection: WalletConnection = {
        ...walletConnection!,
        personalDetails,
        isAnonymous,
      };

      WalletConnectionService.setWalletConnection(newWalletConnection);
      setWalletConnection(newWalletConnection);
    },
    [walletConnection]
  );

  const disconnectWallet = () => {
    WalletConnectionService.removeWalletConnection();
    setWalletConnection(undefined);
    setMyTransactions(null);
  };

  const providerValue = useMemo(() => {
    return {
      connectionError,
      supportedWallets,
      walletConnection,
      connectWallet,
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
    };
  }, [
    connectionError,
    supportedWallets,
    walletConnection,
    isDrawerOpen,
    myTransactions,
    updateWalletConnection,
    hasPendingRounding,
    sinkRequest,
  ]);

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
