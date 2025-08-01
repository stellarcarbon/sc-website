import { WalletConnection } from "@/app/types";
import appConfig from "@/config";
import RoundingService from "@/services/RoundingService";
import TransactionHistoryService from "@/services/TransactionHistoryService";
import WalletConnectionStorageService from "@/services/WalletConnectionService";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { SEP10JWTService } from "./useSEP10JWT";
import { Recipient } from "@stellarcarbon/sc-sdk";

export function useWalletConnection() {
  const router = useRouter();

  // Null at first, will become undefined after attempting to load from local storage fails.
  const [walletConnection, setWalletConnection] = useState<
    WalletConnection | null | undefined
  >(null);

  const [xlmBalance, setXlmBalance] = useState<number>();
  const [usdcBalance, setUsdcBalance] = useState<number>();

  const [hasPendingRounding, setHasPendingRounding] = useState<boolean>();

  const loadWalletConnection = useCallback((swk: StellarWalletsKit) => {
    const wc = WalletConnectionStorageService.loadWalletConnection();
    if (wc !== undefined) {
      swk.setWallet(wc.walletType.id);
    }
    setWalletConnection(wc);

    if (wc) {
      TransactionHistoryService.fetchAccountBalance(
        appConfig.server,
        wc.stellarPubKey
      ).then((accountBalance) => {
        setXlmBalance(accountBalance.xlm);
        setUsdcBalance(accountBalance.usdc);
      });

      RoundingService.hasPendingRounding(wc.stellarPubKey).then((isPending) =>
        setHasPendingRounding(isPending)
      );
    }
  }, []);

  const updateWalletConnection = useCallback(
    (recipient?: Recipient) => {
      const newWalletConnection: WalletConnection = {
        ...walletConnection!,
        recipient,
      };

      WalletConnectionStorageService.setWalletConnection(newWalletConnection);
      setWalletConnection(newWalletConnection);
    },
    [walletConnection]
  );

  const disconnectWallet = useCallback(() => {
    WalletConnectionStorageService.removeWalletConnection();
    SEP10JWTService.removeJWT();
    setWalletConnection(undefined);
    // setMyTransactions(null);
    router.push("/");
  }, [router]);

  return {
    walletConnection,
    setWalletConnection,

    updateWalletConnection,
    disconnectWallet,

    hasPendingRounding,
    setHasPendingRounding,

    loadWalletConnection,

    xlmBalance,
    usdcBalance,
  };
}
