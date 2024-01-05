"use client";

import { WalletType } from "stellar-wallets-kit";
import SelectWalletButton from "../components/SelectWalletButton";
import { useAppContext } from "@/app/context/appContext";
import { useState } from "react";
import Button from "../components/Button";

export default function SelectWallet() {
  const { connectWallet, connectionError, supportedWallets } = useAppContext();
  const [selectedWalletType, setSelectedWalletType] =
    useState<WalletType | null>(null);
  const [tncAccepted, setTncAccepted] = useState<boolean>(false);

  const selectWallet = (wType: WalletType) => {
    if (selectedWalletType === wType) {
      setSelectedWalletType(null);
    } else {
      setSelectedWalletType(wType);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        {selectedWalletType ? (
          <b>{`${selectedWalletType}`}</b>
        ) : (
          <p>Choose a wallet</p>
        )}

        <div className="flex flex-wrap justify-center gap-8 mt-4">
          {supportedWallets.map((supportedWallet) => {
            return (
              <SelectWalletButton
                key={`selectWalletButton_${supportedWallet.type}`}
                wallet={supportedWallet}
                isSelected={selectedWalletType === supportedWallet.type}
                onClick={() => selectWallet(supportedWallet.type)}
              />
            );
          })}
        </div>

        <div className="mt-4 gap-2">
          <input
            type="checkbox"
            checked={tncAccepted}
            onChange={() => setTncAccepted(!tncAccepted)}
            id="checkbox_policy"
          />
          <label className="p-4 mb-4 cursor-pointer" htmlFor="checkbox_policy">
            I agree with privacy policy.
          </label>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 mt-16 w-80">
        <Button
          disabled={selectedWalletType === null || !tncAccepted}
          onClick={() => {
            connectWallet(selectedWalletType!);

            // TODO: move this form-reset to after completing the pop-up
            setSelectedWalletType(null);
            setTncAccepted(false);
          }}
        >
          Connect
        </Button>
      </div>

      <div className="flex flex-col items-center text-center gap-4 mt-16 w-80">
        {connectionError && (
          <span id="SelectWalletError" className="text-red-500">
            {connectionError}
          </span>
        )}
      </div>
    </>
  );
}
