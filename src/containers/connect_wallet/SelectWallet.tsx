import FormError from "@/components/FormError";
import LoadingWallets from "@/components/wallet/LoadingWallets";
import { useAppContext } from "@/context/appContext";
import { useConnectWalletContext } from "./ConnectWalletContext";
import SelectWalletButtons from "./SelectWalletButtons";

export default function SelectWallet() {
  const { supportedWallets } = useAppContext();
  const { selectedWallet, walletSelectError } = useConnectWalletContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 w-full">
        <h1 className="text-2xl font-bold">Connect your wallet</h1>

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
