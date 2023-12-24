"use client";

import {
  StellarWalletsKit,
  WalletNetwork,
  WalletType,
} from "stellar-wallets-kit";
import { useAppContext } from "./context";
import { useState } from "react";
import SelectWalletButton from "@/components/SelectWalletButton";
import Button from "@/components/Button";

export default function WalletPage() {
  const { walletId, setWalletId } = useAppContext();
  const [selectedWalletType, setSelectedWalletType] =
    useState<WalletType | null>(null);

  const connectWallet = async () => {
    let userWallet = WalletType.ALBEDO;

    let kit = new StellarWalletsKit({
      selectedWallet: userWallet,
      network: WalletNetwork.PUBLIC,
    });

    let walletAddress = await kit.getPublicKey();

    setWalletId(walletAddress);
  };

  const disconnectWallet = () => {
    setSelectedWalletType(null);
    setWalletId(undefined);
  };

  const selectWallet = (wType: WalletType) => {
    if (selectedWalletType === wType) {
      setSelectedWalletType(null);
    } else {
      setSelectedWalletType(wType);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8">
      <h1 className="text-2xl">Wallet Kit Page</h1>
      {!walletId ? (
        <div className="flex flex-col justify-start items-center w-full flex-1 mt-8">
          <div className="flex flex-col items-center">
            <p>Choose a wallet</p>
            <div className="flex justify-center gap-8 mt-4">
              <SelectWalletButton
                walletType={WalletType.ALBEDO}
                isSelected={selectedWalletType === WalletType.ALBEDO}
                onClick={() => selectWallet(WalletType.ALBEDO)}
              />
              <SelectWalletButton
                walletType={WalletType.XBULL}
                isSelected={selectedWalletType === WalletType.XBULL}
                onClick={() => selectWallet(WalletType.XBULL)}
              />
            </div>
          </div>
          {selectedWalletType !== null ? (
            <div className={`flex flex-col items-center gap-4 mt-16 w-80`}>
              <b>{`${selectedWalletType} selected.`}</b>
              <Button onClick={connectWallet}>Connect</Button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-start items-center w-full flex-1 mt-8">
          <p>Connected with Stellar PubKey:</p>
          <span className="text-2xl break-all mt-4 mb-12">{walletId}</span>
          <Button onClick={disconnectWallet}>
            Disconnect & choose another STELLAR account
          </Button>
        </div>
      )}
    </main>
  );
}
