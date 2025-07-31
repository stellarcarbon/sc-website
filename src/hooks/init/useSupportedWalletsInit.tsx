import {
  ISupportedWallet,
  StellarWalletsKit,
} from "@creit.tech/stellar-wallets-kit";
import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  ref: React.MutableRefObject<StellarWalletsKit | null>;
  isKitReady: boolean;
  setSupportedWallets: Dispatch<SetStateAction<ISupportedWallet[]>>;
};

export function useSupportedWalletsInit({
  ref,
  isKitReady,
  setSupportedWallets,
}: Props) {
  useEffect(() => {
    if (!isKitReady) return;

    ref
      .current!.getSupportedWallets()
      .then((wallets) => setSupportedWallets(wallets));
  }, [isKitReady, ref, setSupportedWallets]);
}
