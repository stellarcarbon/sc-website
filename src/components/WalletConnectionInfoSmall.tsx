import { useAppContext } from "@/context/appContext";
import TruncatedHash from "./dashboard/TruncatedHash";

export default function WalletConnectionInfoSmall() {
  const { walletConnection } = useAppContext();

  return (
    <div className="flex bg-darker text-white border border-accentSecondary rounded cursor-pointer md:hover:bg-secondary md:hover:text-white">
      <div className="flex flex-col items-center border-rl border-accentSecondary p-1 px-2">
        <img
          className="h-5 w-5 md:h-6 md:h-6"
          src={walletConnection?.walletType.icon}
        />
      </div>
      <div className="flex items-center pr-2 text-xs">
        <TruncatedHash hash={walletConnection?.stellarPubKey} uppercase />
      </div>
    </div>
  );
}
