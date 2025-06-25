import { useAppContext } from "@/context/appContext";
import TruncatedHash from "./dashboard/TruncatedHash";

export default function WalletConnectionInfo() {
  const { walletConnection } = useAppContext();

  return (
    <div className="bg-darkest mx-6 md:mx-8 rounded border border-accentSecondary flex">
      <div className="flex flex-col items-center py-2 pl-2 ">
        <div className="p-2">
          <img className="h-8 w-8" src={walletConnection?.walletType.icon} />
        </div>
      </div>
      <div className="flex flex-col justify-center text-center flex-1">
        {/* <div className="">PUBKEY</div> */}

        <div className="p-4 text-wrap break-words text-lg text-white">
          <TruncatedHash hash={walletConnection?.stellarPubKey} uppercase />
        </div>
      </div>
    </div>
  );
}
