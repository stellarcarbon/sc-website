import appConfig from "@/config";
import { StellarWalletsKit } from "@creit-tech/stellar-wallets-kit/sdk";
import { ISupportedWallet } from "@creit-tech/stellar-wallets-kit/types";
import { defaultModules } from "@creit-tech/stellar-wallets-kit/modules/utils";
import { LedgerModule } from "@creit-tech/stellar-wallets-kit/modules/ledger";
import { XBULL_ID } from "@creit-tech/stellar-wallets-kit/modules/xbull";
import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  setIsKitReady: (ready: boolean) => void;
  setSupportedWallets: Dispatch<SetStateAction<ISupportedWallet[]>>;
};

export function useSWKInit({ setIsKitReady, setSupportedWallets }: Props) {
  useEffect(() => {
    const loadWalletsKit = async () => {
      if (typeof window !== "undefined") {
        StellarWalletsKit.init({
          modules: [...defaultModules(), new LedgerModule()],
          selectedWalletId: XBULL_ID,
          network: appConfig.network,
        });

        // Load client-supported wallets
        const wallets = await StellarWalletsKit.refreshSupportedWallets();
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
