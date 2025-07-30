import { PersonalDetails, WalletConnection } from "@/app/types";
import appConfig from "@/config";
import RoundingService from "@/services/RoundingService";
import TransactionHistoryService from "@/services/TransactionHistoryService";
import WalletConnectionStorageService from "@/services/WalletConnectionService";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SEP10JWTService } from "./useSEP10JWT";
import { Recipient } from "@stellarcarbon/sc-sdk";

export function useWalletConnection(
  stellarWalletsKit: StellarWalletsKit | null
) {
  const router = useRouter();

  // Null at first, will become undefined after attempting to load from local storage fails.
  const [walletConnection, setWalletConnection] = useState<
    WalletConnection | null | undefined
  >(null);

  const [xlmBalance, setXlmBalance] = useState<number>();
  const [usdcBalance, setUsdcBalance] = useState<number>();

  const [hasPendingRounding, setHasPendingRounding] = useState<boolean>();

  // Load existing wallet connection
  useEffect(() => {
    if (stellarWalletsKit === null) return;

    const loadWalletConnection = () => {
      const wc = WalletConnectionStorageService.loadWalletConnection();
      if (wc !== undefined) {
        stellarWalletsKit.setWallet(wc.walletType.id);
      }
      setWalletConnection(wc);
    };

    if (walletConnection === null) {
      loadWalletConnection();
    } else if (walletConnection !== undefined) {
      TransactionHistoryService.fetchAccountBalance(
        appConfig.server,
        walletConnection.stellarPubKey
      ).then((accountBalance) => {
        setXlmBalance(accountBalance.xlm);
        setUsdcBalance(accountBalance.usdc);
      });

      // Pending rounding check
      if (walletConnection !== undefined && hasPendingRounding === undefined) {
        RoundingService.hasPendingRounding(walletConnection.stellarPubKey).then(
          (isPending) => setHasPendingRounding(isPending)
        );
      }
    }
  }, [walletConnection, hasPendingRounding, stellarWalletsKit]);

  const updateWalletConnection = useCallback(
    (recipient?: Recipient) => {
      // console.log(walletConnection);
      // TODO: add /recipients POST/PATCH here
      console.log("updateWalletConn", recipient);

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

    xlmBalance,
    usdcBalance,
  };
}
