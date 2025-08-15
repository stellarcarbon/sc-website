import appConfig from "@/config";
import {
  allowAllModules,
  ISupportedWallet,
  StellarWalletsKit,
  XBULL_ID,
} from "@creit.tech/stellar-wallets-kit";
import { LedgerModule } from "@creit.tech/stellar-wallets-kit/modules/ledger.module";
import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  ref: React.MutableRefObject<StellarWalletsKit | null>;
  setIsKitReady: (ready: boolean) => void;
  setSupportedWallets: Dispatch<SetStateAction<ISupportedWallet[]>>;
};

export function useSWKInit({ ref, setIsKitReady, setSupportedWallets }: Props) {
  useEffect(() => {
    const loadWalletsKit = async () => {
      if (typeof window !== "undefined") {
        // This import makes sure assigning the kit to the ref happens client side.
        const { StellarWalletsKit } = await import(
          "@creit.tech/stellar-wallets-kit"
        );
        const modules = allowAllModules();
        modules.push(new LedgerModule());
        const newSwk = new StellarWalletsKit({
          network: appConfig.network,
          selectedWalletId: XBULL_ID,
          modules,
        });
        ref.current = newSwk;

        // Load supported wallets
        const wallets = await newSwk.getSupportedWallets();
        setSupportedWallets(wallets);

        setIsKitReady(true);
      }
    };

    loadWalletsKit();
  }, [setIsKitReady, ref]);
}
