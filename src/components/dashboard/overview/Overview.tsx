"use client";

import { useAppContext } from "@/context/appContext";
import { useState } from "react";

import ParallaxDivider, {
  ParallaxBackgrounds,
} from "@/components/ParallaxDivider";
import TransactionSummary from "../TransactionSummary";
import OverviewContactInformationForm from "./ContactInformationForm";
import DashboardTitle from "../DashboardTitle";
import WalletDetails from "../WalletDetails";

export default function Overview() {
  const { disconnectWallet } = useAppContext();

  const [showContactInformationForm, setShowContactInformationForm] =
    useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col mt-0 md:mt-4">
        {/* <DashboardTitle>
          Activity summary<span> (testnet)</span>
        </DashboardTitle> */}
        <TransactionSummary />
      </div>

      {/* <div className="flex flex-col w-full mt-8 md:mt-12">
        <DashboardTitle>Wallet Connection</DashboardTitle>
        <div className="flex flex-col items-center gap-6 mt-6 mx-4 md:mx-8">
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
      </div> */}

      <div className="flex flex-col items-center gap-10 px-4 md:px-8 mt-8">
        {showContactInformationForm ? (
          <OverviewContactInformationForm
            onClose={() => setShowContactInformationForm(false)}
          />
        ) : (
          <WalletDetails
            onEdit={() => setShowContactInformationForm(true)}
            onDisconnect={disconnectWallet}
          />
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
