"use client";

import { useAppContext } from "@/context/appContext";
import { useState } from "react";

import ParallaxDivider, {
  ParallaxBackgrounds,
} from "@/components/ParallaxDivider";
import WalletConnectionInfo from "../WalletConnectionInfo";
import TransactionSummary from "../TransactionSummary";
import WalletConnectionButtons from "./wcbuttons";
import OverviewContactInformationForm from "./ContactInformationForm";
import OverviewContactInformation from "./ContactInformation";

export default function Overview() {
  const { disconnectWallet } = useAppContext();

  const [showContactInformationForm, setShowContactInformationForm] =
    useState<boolean>(false);

  return (
    <>
      <div className="mt-10 md:mt-16 flex flex-col gap-4">
        <h1 className="self-center text-xl md:text-2xl font-semibold">
          Activity summary
        </h1>
        <TransactionSummary />
      </div>

      <div className="flex flex-col w-full gap-6 mt-8 md:mt-10">
        <h1 className="self-center text-xl md:text-2xl font-semibold">
          Wallet Connection
        </h1>
        <WalletConnectionInfo />

        {showContactInformationForm ? (
          <OverviewContactInformationForm
            onClose={() => setShowContactInformationForm(false)}
          />
        ) : (
          <>
            <OverviewContactInformation />
            <WalletConnectionButtons
              onEdit={() => setShowContactInformationForm(true)}
              onDisconnect={disconnectWallet}
            />
          </>
        )}
      </div>
      <div className="flex-1 flex items-end">
        <ParallaxDivider
          smallest
          image={ParallaxBackgrounds.RAINFOREST}
          yOffset={-420}
          roundedBottom
        />
      </div>
    </>
  );
}
