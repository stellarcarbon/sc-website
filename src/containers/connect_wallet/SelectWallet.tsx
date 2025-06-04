import FormError from "@/components/FormError";
import LoadingWallets from "@/components/wallet/LoadingWallets";
import { useAppContext } from "@/context/appContext";
import { useConnectWalletContext } from "../../context/ConnectWalletContext";
import SelectWalletButtons from "./SelectWalletButtons";
import { useEffect, useRef } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function SelectWallet() {
  const { supportedWallets } = useAppContext();
  const { selectedWallet, walletSelectError } = useConnectWalletContext();

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (walletSelectError && containerRef.current) {
      const yOffset = -80; // Adjust scroll by -64px
      const y =
        containerRef.current.getBoundingClientRect().top +
        window.scrollY +
        yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [walletSelectError]);

  return (
    <div ref={containerRef} className="flex flex-col gap-4">
      <div className="flex flex-col w-full">
        <DashboardHeader>Select your wallet</DashboardHeader>

        <span className="text-sm mb-1 max-w-[80%] hidden md:block">
          Connect a wallet to be able to create new transactions.
        </span>
        <span className="text-xs max-w-[80%] md:hidden">
          {selectedWallet
            ? `Current selection: ${selectedWallet.name}`
            : `Tap your wallet choice.`}
        </span>
      </div>

      {supportedWallets.length === 0 ? (
        <LoadingWallets />
      ) : (
        <SelectWalletButtons />
      )}

      {walletSelectError && <FormError>{`Please select a wallet`}</FormError>}
    </div>
  );
}
