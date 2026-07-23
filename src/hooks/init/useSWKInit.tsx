import appConfig from "@/config";
import type { ISupportedWallet } from "@creit-tech/stellar-wallets-kit/types";
import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  setIsKitReady: (ready: boolean) => void;
  setSupportedWallets: Dispatch<SetStateAction<ISupportedWallet[]>>;
};

export function useSWKInit({ setIsKitReady, setSupportedWallets }: Props) {
  useEffect(() => {
    const loadWalletsKit = async () => {
      if (typeof window !== "undefined") {
        const { initializeWalletsKit, refreshSupportedWallets } =
          await import("@/lib/walletsKitRuntime");

        initializeWalletsKit({
          network: appConfig.network,
        });

        // Load client-supported wallets
        const wallets = await refreshSupportedWallets();
        const availableWallets: ISupportedWallet[] = wallets.filter(
          (wallet) => wallet.isAvailable,
        );
        setSupportedWallets(availableWallets);

        setIsKitReady(true);
      }
    };

    loadWalletsKit();
  }, [setIsKitReady]);
}
