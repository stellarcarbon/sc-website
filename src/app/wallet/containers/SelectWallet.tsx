"use client";

import { WalletType } from "stellar-wallets-kit";
import SelectWalletButton from "../components/SelectWalletButton";
import { useAppContext } from "@/app/context/appContext";
import { useState } from "react";
import Button from "../../components/Button";
import SelectWalletButtonDesktop from "../components/SelectWalletButtonDesktop";

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
      <div className="flex flex-col flex-1 items-start md:min-w-[600px] md:max-w-[650px] py-10 p-6 border rounded-sm border-gray shadow-lg">
        {/* <p className="px-8">
          Select a wallet that will be used for signing the Stellarcarbon
          transaction.
        </p> */}
        <h1 className="text-2xl font-bold mx-8 my-1">
          First connect your wallet
        </h1>
        <p className="text-sm mx-8 my-1 max-w-[80%]">
          To continue you will need a wallet to sign the sinking transaction.
          Connect a wallet to be able to create new transactions and access your
          sinking history.
          <br />
          <br />
          By sinking CARBON tokens you are helping prevent more CO2 emissions
          from occuring :)
        </p>
        {selectedWalletType ? (
          <b className="md:hidden">{`${selectedWalletType}`}</b>
        ) : (
          <></>
        )}

        {/* Mobile buttons */}
        <div className="flex flex-wrap justify-center gap-8 mt-4 md:hidden">
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

        {/* Desktop buttons */}
        <div className="md:flex flex-col hidden gap-4 my-4 w-[90%]">
          {supportedWallets.map((supportedWallet) => {
            return (
              <SelectWalletButtonDesktop
                key={`swbd_${supportedWallet.type}`}
                wallet={supportedWallet}
                isSelected={selectedWalletType === supportedWallet.type}
                onClick={() => selectWallet(supportedWallet.type)}
              >
                {supportedWallet.name}
              </SelectWalletButtonDesktop>
            );
          })}
        </div>

        <div className="mx-8 my-2 gap-2">
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

        <div className="flex self-center mt-4 mb-2">
          <Button
            disabled={selectedWalletType === null || !tncAccepted}
            onClick={() => {
              connectWallet(selectedWalletType!);

              // TODO: move this form-reset to after completing the pop-up
              setSelectedWalletType(null);
              setTncAccepted(false);
            }}
          >
            Connect wallet
          </Button>
        </div>
        <div className="flex flex-col items-center text-center gap-4 w-80">
          {connectionError && (
            <span id="SelectWalletError" className="text-red-500">
              {connectionError}
            </span>
          )}
        </div>
      </div>

      {/* <div className="flex flex-col items-center gap-4 mt-16 w-80">
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
      </div> */}
    </>
  );
}
