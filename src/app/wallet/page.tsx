"use client";
import { useAppContext } from "../context";
import Button from "@/app/wallet/components/Button";
import SelectWallet from "./containers/SelectWallet";
import ContactInfo from "./containers/ContactInfo";
import PubKeyDisplay from "./components/PubKeyDisplay";
import DisconnectWalletButton from "./components/DisconnectWalletButton";
import PersonalDetailsDisplay from "./components/PersonalDetailsDisplay";

export default function WalletPage() {
  const { walletConnection, supportedWallets, disconnectWallet } =
    useAppContext();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8">
      <h1 className="text-2xl">Wallet Page</h1>
      {walletConnection ? (
        walletConnection.isAnonymous || walletConnection.personalDetails ? (
          <>
            <p>Wallet setup succesful!</p>
            <PubKeyDisplay />
            <PersonalDetailsDisplay />
            <DisconnectWalletButton />
          </>
        ) : (
          <ContactInfo />
        )
      ) : supportedWallets.length > 0 ? (
        <SelectWallet />
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
