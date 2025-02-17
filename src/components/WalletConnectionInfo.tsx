import { useAppContext } from "@/context/appContext";
import StellarPubKey from "./dashboard/StellarPubKey";

export default function WalletConnectionInfo() {
  const { walletConnection } = useAppContext();

  return (
    <div className="bg-darker mx-6 md:mx-8 rounded border border-accentSecondary flex">
      <div className="flex flex-col items-center py-2 border-r border-accentSecondary">
        <div className="p-2">
          <img className="h-8 w-8" src={walletConnection?.walletType.icon} />
        </div>
      </div>
      <div className="flex flex-col justify-center text-center flex-1">
        {/* <div className="">PUBKEY</div> */}

        <div className="p-4 text-wrap break-words px-2 md:text-base">
          <StellarPubKey pubKey={walletConnection?.stellarPubKey} />
        </div>
      </div>
    </div>
  );
}
