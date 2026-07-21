import { useEffect } from "react";

type Props = {
  isKitReady: boolean;
  loadWalletConnection: () => void;
};

export function useWalletConnectionInit({
  isKitReady,
  loadWalletConnection,
}: Props) {
  useEffect(() => {
    if (!isKitReady) return;

    loadWalletConnection();
  }, [isKitReady, loadWalletConnection]);
}
