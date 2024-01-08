"use client";
import { useAppContext } from "../context/appContext";
import Button from "@/app/components/Button";
import SelectWallet from "./containers/SelectWallet";
import PubKeyDisplay from "./components/PubKeyDisplay";
import DisconnectWalletButton from "./components/DisconnectWalletButton";
import PersonalDetailsDisplay from "./components/PersonalDetailsDisplay";
import { redirect, useRouter } from "next/navigation";

export default function WalletPage() {
  const { walletConnection, supportedWallets } = useAppContext();

  const router = useRouter();

  if (
    !walletConnection ||
    (!walletConnection?.isAnonymous && !walletConnection?.personalDetails)
  ) {
    console.log(walletConnection);

    if (typeof window !== "undefined")
      // redirect() does not play nice with Cypress
      // redirect("/wallet/connect");
      window.location.replace("/wallet/connect");
  }

  return (
    <main className="flex flex-col bg-rainforest bg-cover bg-top bg-fixed items-center justify-start md:py-6 min-h-[calc(100vh-80px)]">
      {/* <h1 className="text-2xl">Wallet Page</h1> */}
      {walletConnection ? (
        walletConnection.isAnonymous || walletConnection.personalDetails ? (
          <>
            <p>Wallet setup succesful!</p>
            <PubKeyDisplay />
            <PersonalDetailsDisplay />
            <Button
              className="mb-8"
              onClick={() => {
                router.push("/checkout");
              }}
            >
              Continue to checkout
            </Button>
            <DisconnectWalletButton />
          </>
        ) : (
          <></>
        )
      ) : supportedWallets.length > 0 ? (
        <SelectWallet />
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
