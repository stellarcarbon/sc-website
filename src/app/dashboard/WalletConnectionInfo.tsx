import { useAppContext } from "@/context/appContext";

export default function WalletConnectionInfo() {
  const { walletConnection, supportedWallets } = useAppContext();

  return (
    <div className="bg-primary mx-4 rounded border border-accentSecondary grid grid-cols-5">
      <div className="py-2 border-r border-accentSecondary">
        <div className="p-2 text-center">
          <img src={supportedWallets[0]?.icon} />
        </div>
        <div className="text-sm text-center">
          {walletConnection?.walletType}
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
