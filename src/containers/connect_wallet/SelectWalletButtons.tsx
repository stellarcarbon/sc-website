import SelectWalletButton from "@/components/wallet/SelectWalletButton";
import { useAppContext } from "@/context/appContext";
import { useConnectWalletContext } from "../../context/ConnectWalletContext";
import { useCallback } from "react";
import { ISupportedWallet } from "@creit.tech/stellar-wallets-kit";
import SelectWalletButtonDesktop from "@/components/wallet/SelectWalletButtonDesktop";

export default function SelectWalletButtons() {
  const { isMobileDevice, supportedWallets } = useAppContext();
  const { selectedWallet, setSelectedWallet } = useConnectWalletContext();

  const selectWallet = useCallback(
    (wallet: ISupportedWallet) => {
      if (selectedWallet === wallet) {
        setSelectedWallet(undefined);
      } else {
        setSelectedWallet(wallet);
      }
    },
    [selectedWallet, setSelectedWallet]
  );

  return (
    <div className="grid grid-cols-3 gap-4">
      {supportedWallets.map((supportedWallet, idx) => {
        if (isMobileDevice) {
          return (
            <SelectWalletButton
              key={`selectwalletbtn_${idx}`}
              wallet={supportedWallet}
              isSelected={supportedWallet.id === selectedWallet?.id}
              onClick={() => selectWallet(supportedWallet)}
              disabled={
                !supportedWallet.isAvailable ||
                supportedWallet.type === "WALLET_CONNECT"
              }
            />
          );
        } else {
          return (
            <SelectWalletButtonDesktop
              key={`swbd_${idx}`}
              wallet={supportedWallet}
              isSelected={supportedWallet.id === selectedWallet?.id}
              onClick={() => selectWallet(supportedWallet)}
              disabled={
                !supportedWallet.isAvailable ||
                supportedWallet.type === "WALLET_CONNECT"
              }
            />
          );
        }
      })}
    </div>
  );
}
