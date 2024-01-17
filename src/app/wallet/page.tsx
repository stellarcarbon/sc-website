"use client";
import { useAppContext } from "../../context/appContext";
import Button from "@/components/Button";
import SelectWallet from "../../containers/SelectWallet";
import PubKeyDisplay from "../../components/wallet/PubKeyDisplay";
import DisconnectWalletButton from "../../components/wallet/DisconnectWalletButton";
import PersonalDetailsDisplay from "../../components/wallet/PersonalDetailsDisplay";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { time } from "console";
import Dashboard2 from "../../containers/Dashboard2";

export default function WalletPage() {
  const { walletConnection, supportedWallets, closeDrawer } = useAppContext();

  const router = useRouter();

  const navigate = () => {
    router.push("/wallet/connect");
  };

  return (
    <main className="flex flex-col bg-dalle bg-no-repeat bg-fixed bg-cover items-center justify-start md:py-6 min-h-[calc(100vh-176px)]">
      {!walletConnection ? (
        <div className="flex flex-col items-start bg-secondary md:border border-tertiary text-white min-h-[calc(100vh-176px)] md:min-h-0 md:min-w-[600px] md:max-w-[650px] py-4 md:py-6 md:p-0 pt-8 md:rounded-md border-gray shadow-lg">
          <div className="mt-0">
            <h1 className="text-3xl font-bold mx-6 my-0">Sinking carbon</h1>
            <p className="text-sm mx-6 my-8  md:max-w-[80%]">
              To create a carbonsink transaction you will need a wallet. We
              support various wallets that are well-known in the Stellar
              ecosystem.
              <br />
              <br /> After connecting you will be able to access your sinking
              history.
              <br />
              <br />
              {`By sinking CARBON tokens you are helping prevent more CO2
              emissions from occuring :)`}
            </p>
          </div>
          <Button className="my-4 self-center" onClick={navigate}>
            Connect wallet
          </Button>
        </div>
      ) : (
        <Dashboard2 />
      )}
    </main>
  );
}
