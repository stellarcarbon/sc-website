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
  SinkCarbonXdrPostRequest,
  WalletConnection,
} from "@/app/types";
import { loadAvailableWalletsMock } from "./walletFunctions";

import useIsMobile from "@/hooks/useIsMobile";
import appConfig from "@/config";
import { useTransactionHistory } from "@/hooks/useTransactionHistory";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { getRecipient, Recipient } from "@stellarcarbon/sc-sdk";
import { useSEP10JWT } from "@/hooks/useSEP10JWT";
import { SEP10Target } from "./SEP10Context";

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
  updateWalletConnection: (recipient?: Recipient) => void;

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

  sep10Target: SEP10Target;
  setSep10Target: Dispatch<SetStateAction<SEP10Target>>;
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

  // const [swk, setSwk] = useState<StellarWalletsKit | null>(null);

  const isMobileDevice = useIsMobile();

  const [sep10Target, setSep10Target] = useState<SEP10Target>("dashboard"); // where the sep10 flow will eventually redirect to
  const [jwt, setJwt] = useState<string>();
  useSEP10JWT(jwt, setJwt);

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
    loadWalletConnection,
  } = useWalletConnection();

  const {
    myTransactions,
    totalPending,
    totalSunk,
    retirementGraceDays,
    pollForNewTransaction,
    refetch: refetchTransactions,
  } = useTransactionHistory(walletConnection?.stellarPubKey);

  const loadAccount = useCallback(
    async (token: string): Promise<Recipient | undefined> => {
      if (!walletConnection) return;

      const res = await getRecipient({
        path: { recipient_address: walletConnection.stellarPubKey },
        fetch: (request: Request) => {
          const authRequest = new Request(request, {
            headers: {
              ...Object.fromEntries(request.headers.entries()),
              Authorization: `Bearer ${token}`,
            },
          });
          return fetch(authRequest);
        },
      });

      if (res.response.status === 404 && walletConnection.recipient) {
        // Account doesn't exist
        updateWalletConnection();
      } else if (res.data) {
        updateWalletConnection(res.data);
        return res.data;
      }
    },
    [walletConnection, updateWalletConnection]
  );

  const [isKitReady, setIsKitReady] = useState(false);

  // Load wallets kit
  useEffect(() => {
    const loadWalletsKit = async () => {
      console.log("initialize app");
      if (typeof window !== "undefined") {
        // This import makes sure assigning the kit to the ref happens client side.
        const { StellarWalletsKit } = await import(
          "@creit.tech/stellar-wallets-kit"
        );
        const newSwk = new StellarWalletsKit({
          network: appConfig.network,
          selectedWalletId: XBULL_ID,
          modules: allowAllModules(),
        });
        stellarWalletsKitRef.current = newSwk;

        setIsKitReady(true);
      }
    };

    loadWalletsKit();
  }, []);

  // Load supported wallets from stellar wallets kit
  useEffect(() => {
    if (!isKitReady) return;

    stellarWalletsKitRef
      .current!.getSupportedWallets()
      .then((wallets) => setSupportedWallets(wallets));
  }, [isKitReady]);

  // Load wallet connection & JWT from storage
  useEffect(() => {
    if (!isKitReady) return;

    loadWalletConnection(stellarWalletsKitRef.current!);
  }, [isKitReady, loadWalletConnection]);

  useEffect(() => {
    if (!jwt) return;

    console.log("hier");
    loadAccount(jwt);
  }, [jwt]);

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

      sep10Target,
      setSep10Target,
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
    sep10Target,
  ]);

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
