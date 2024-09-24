import appConfig from "@/config";
import { useAppContext } from "@/context/appContext";

export default function WalletConnectionInfo() {
  const { walletConnection } = useAppContext();

  return (
    <div
      className={`${
        appConfig.demo ? "bg-secondary" : "bg-primary"
      } mx-6 md:mx-8 rounded border border-accentSecondary grid grid-cols-5`}
    >
      <div className="flex flex-col items-center py-2 border-r border-accentSecondary">
        <div className="p-2">
          <img className="h-12 w-12" src={walletConnection?.walletType.icon} />
        </div>
        <div className="text-xs text-center">
          {walletConnection?.walletType.name}
        </div>
      </div>
      <div className="pt-2 col-span-4 flex flex-col justify-center text-center">
        {/* <div className="">PUBKEY</div> */}

        <div className="p-4  text-xs text-wrap break-words">
          {walletConnection?.stellarPubKey}
        </div>
      </div>
    </div>
  );
}
