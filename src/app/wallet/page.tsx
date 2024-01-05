"use client";
import { useAppContext } from "../context/appContext";
import Button from "@/app/wallet/components/Button";
import SelectWallet from "./containers/SelectWallet";
import ContactInfo from "./containers/ContactInfo";
import PubKeyDisplay from "./components/PubKeyDisplay";
import DisconnectWalletButton from "./components/DisconnectWalletButton";
import PersonalDetailsDisplay from "./components/PersonalDetailsDisplay";
import { useRouter } from "next/navigation";

export default function WalletPage() {
  const { walletConnection, supportedWallets, disconnectWallet } =
    useAppContext();
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-start p-8">
      <h1 className="text-2xl">Wallet Page</h1>
      {walletConnection ? (
        walletConnection.isAnonymous || walletConnection.personalDetails ? (
          <>
            <p>Wallet setup succesful!</p>
            <PubKeyDisplay />
            <PersonalDetailsDisplay />
            <Button
              className="mb-8"
              onClick={() => {
                router.push("/wallet/checkout");
              }}
            >
              Continue to checkout
            </Button>
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
