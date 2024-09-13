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
import DashboardTitle from "../DashboardTitle";

export default function Overview() {
  const { disconnectWallet } = useAppContext();

  const [showContactInformationForm, setShowContactInformationForm] =
    useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col">
        <DashboardTitle>Activity summary</DashboardTitle>
        <TransactionSummary />
      </div>

      <div className="flex flex-col w-full ">
        <DashboardTitle>Wallet Connection</DashboardTitle>
        <div className="flex flex-col gap-6">
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
