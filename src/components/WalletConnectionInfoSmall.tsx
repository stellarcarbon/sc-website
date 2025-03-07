import { useAppContext } from "@/context/appContext";
import TruncatedHash from "./dashboard/TruncatedHash";

export default function WalletConnectionInfoSmall() {
  const { walletConnection } = useAppContext();

  return (
    <div className="flex bg-darker text-white border border-accentSecondary rounded cursor-pointer hover:bg-secondary">
      <div className="flex flex-col items-center border-rl border-accentSecondary p-2">
        <img className="h-6 w-6" src={walletConnection?.walletType.icon} />
      </div>
      <div className="flex items-center px-2 text-xs">
        <TruncatedHash pubKey={walletConnection?.stellarPubKey} />
      </div>
    </div>
  );
}
