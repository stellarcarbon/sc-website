"use client";

import { useAppContext } from "@/context/appContext";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DemoWalletConnectionInfo() {
  const { walletConnection, disconnectWallet, appConfig } = useAppContext();

  return (
    <div
      className={`${
        appConfig.demo ? "bg-secondary" : "bg-primary"
      } md:rounded-t border-b border-tertiary grid grid-cols-7`}
    >
      <div className="flex flex-col items-center py-2 border-r border-tertiary">
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
      <div className="flex flex-col items-center justify-center border-l border-tertiary col-span-2">
        <button
          onClick={disconnectWallet}
          className="bg-accent p-2 px-3 rounded text-black hover:bg-red-500 flex items-center gap-2 text-sm"
        >
          <FontAwesomeIcon icon={faSignOut} />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
}
