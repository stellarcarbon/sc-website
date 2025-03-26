import { useAppContext } from "@/context/appContext";
import TruncatedHash from "./dashboard/TruncatedHash";

export default function WalletConnectionInfoSmall() {
  const { walletConnection } = useAppContext();

  return (
    <div className="flex items-center gap-1 bg-darker text-white border border-accentSecondary rounded cursor-pointer md:hover:bg-secondary md:hover:text-white h-8 md:h-10 px-2">
      <img
        className="h-5 w-5 md:h-6 md:w-6"
        src={walletConnection?.walletType.icon}
      />

      <div className="flex items-center text-xs md:text-sm">
        <TruncatedHash hash={walletConnection?.stellarPubKey} uppercase />
      </div>
    </div>
  );
}
