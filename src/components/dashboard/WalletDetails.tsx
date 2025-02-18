import { useAppContext } from "@/context/appContext";
import { useState } from "react";
import StellarPubKey from "./StellarPubKey";
import CARBONCurrencyIcon from "../icons/CARBONCurrencyIcon";
import KeyValueEntry from "./overview/KeyValueEntry";
import WalletConnectionButtons from "./overview/wcbuttons";

const WalletDetails = ({
  onEdit,
  onDisconnect,
}: {
  onEdit: () => void;
  onDisconnect: () => void;
}) => {
  const { walletConnection } = useAppContext();

  if (!walletConnection) return null;

  return (
    <div className="w-full flex flex-col gap-2 bg-darker p-4 border border-tertiary rounded">
      <h2 className="text-2xl font-semibold mb-2 text-center">
        Wallet Connection Details
      </h2>

      <KeyValueEntry mkey="Wallet Type">
        <div className="flex gap-2 items-center">
          {walletConnection.walletType.name}
          <img className="h-5 w-5" src={walletConnection?.walletType.icon} />
        </div>
      </KeyValueEntry>
      <KeyValueEntry mkey="Public key">
        {<StellarPubKey pubKey={walletConnection?.stellarPubKey} />}
      </KeyValueEntry>
      <div className="mt-4">
        <KeyValueEntry mkey="Contact information">
          {walletConnection.isAnonymous ? (
            <span className="italic">Anonymous</span>
          ) : null}
        </KeyValueEntry>
        {!walletConnection.isAnonymous && (
          <div className="text-sm mt-2 mx-1">
            <div className="flex justify-between">
              <span className="font-medium">Username</span>
              {walletConnection.personalDetails?.username}
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Email</span>
              {walletConnection.personalDetails?.useremail}
            </div>
          </div>
        )}
      </div>

      <WalletConnectionButtons onEdit={onEdit} onDisconnect={onDisconnect} />
    </div>
  );
};

export default WalletDetails;
