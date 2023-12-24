"use client";

import {
  StellarWalletsKit,
  WalletNetwork,
  WalletType,
} from "stellar-wallets-kit";
import { useAppContext } from "./context";

export default function WalletPage() {
  const { walletId, setWalletId } = useAppContext();

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
    setWalletId(undefined);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl">Wallet Kit Page</h1>
      {walletId ? (
        <div className="flex flex-col items-center">
          <p>Connected with wallet id:</p>
          <span className="text-2xl">{walletId}</span>
        </div>
      ) : (
        <p>Not connected</p>
      )}
      <div className="flex gap-4">
        <button
          onClick={connectWallet}
          className="group rounded-lg border px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          Connect
        </button>
        <button
          onClick={disconnectWallet}
          className="group rounded-lg border px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          Disconnect
        </button>
      </div>
    </main>
  );
}
