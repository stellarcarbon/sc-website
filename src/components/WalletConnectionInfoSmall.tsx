import { useAppContext } from "@/context/appContext";
import TruncatedHash from "./dashboard/TruncatedHash";

export default function WalletConnectionInfoSmall() {
  const { walletConnection } = useAppContext();

  if (!walletConnection) {
    return <div className="w-10 h-10"></div>;
  }

  return (
    <div
      className={` flex justify-center items-center gap-1 bg-darkest text-white border border-accentSecondary rounded cursor-pointer md:hover:bg-secondary md:hover:text-white h-10 min-w-10 md:h-10 px-2`}
    >
      <img
        className="h-4 w-4 md:h-6 md:w-6"
        src={walletConnection?.walletType.icon}
      />

      <div className="hidden md:flex items-center text-[10px] md:text-sm">
        <TruncatedHash hash={walletConnection?.stellarPubKey} uppercase />
      </div>
    </div>
  );
}
