import { useAppContext } from "@/context/appContext";
import StellarPubKey from "./StellarPubKey";

export default function WalletConnectionInfo() {
  const { walletConnection } = useAppContext();

  return (
    <div className="bg-darker mx-6 md:mx-8 rounded border border-accentSecondary flex">
      <div className="flex flex-col items-center py-2 border-r border-accentSecondary">
        <div className="p-2">
          <img className="h-12 w-12" src={walletConnection?.walletType.icon} />
        </div>
        <div className="text-xs text-center">
          {walletConnection?.walletType.name}
        </div>
      </div>
      <div className="flex flex-col justify-center text-center flex-1">
        {/* <div className="">PUBKEY</div> */}

        <div className="p-4 text-wrap break-words px-12 md:text-xl">
          <StellarPubKey pubKey={walletConnection?.stellarPubKey} />
        </div>
      </div>
    </div>
  );
}
