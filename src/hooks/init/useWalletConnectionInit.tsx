import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";
import { useEffect } from "react";

type Props = {
  ref: React.MutableRefObject<StellarWalletsKit | null>;
  isKitReady: boolean;
  loadWalletConnection: (swk: StellarWalletsKit) => void;
};

export function useWalletConnectionInit({
  ref,
  isKitReady,
  loadWalletConnection,
}: Props) {
  useEffect(() => {
    if (!isKitReady) return;

    loadWalletConnection(ref.current!);
  }, [isKitReady, loadWalletConnection, ref]);
}
