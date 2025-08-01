import appConfig from "@/config";
import {
  allowAllModules,
  StellarWalletsKit,
  XBULL_ID,
} from "@creit.tech/stellar-wallets-kit";
import { useEffect } from "react";

type Props = {
  ref: React.MutableRefObject<StellarWalletsKit | null>;
  setIsKitReady: (ready: boolean) => void;
};

export function useSWKInit({ ref, setIsKitReady }: Props) {
  // Load wallets kit
  useEffect(() => {
    const loadWalletsKit = async () => {
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
        ref.current = newSwk;

        setIsKitReady(true);
      }
    };

    loadWalletsKit();
  }, [setIsKitReady, ref]);
}
