"use client";
import { useAppContext } from "../context";
import Button from "@/app/wallet/components/Button";
import SelectWallet from "./containers/SelectWallet";

export default function WalletPage() {
  const { stellarPubKey, disconnectWallet } = useAppContext();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8">
      <h1 className="text-2xl">Wallet Kit Page</h1>
      <div id="content">
        {!stellarPubKey ? (
          <SelectWallet />
        ) : (
          <div className="flex flex-col justify-start items-center w-full flex-1 mt-8">
            <p>Connected with Stellar PubKey:</p>
            <span id="stellarPubKey" className="text-2xl break-all mt-4 mb-12">
              {stellarPubKey}
            </span>
            <Button onClick={disconnectWallet}>
              Disconnect & choose another STELLAR account
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
