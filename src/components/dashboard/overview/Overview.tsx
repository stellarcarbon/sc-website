"use client";

import { useAppContext } from "@/context/appContext";
import TransactionSummary from "../TransactionSummary";
import TruncatedHash from "../TruncatedHash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import SectionHeader from "@/components/SectionHeader";
import Button from "@/components/Button";
import OverviewContactInfo from "./OverviewContactInfo";
import { OverviewContactInfoContextProvider } from "@/context/OverviewContactInfoContext";

export default function Overview() {
  const { walletConnection, disconnectWallet } = useAppContext();

  return (
    <div className="w-full">
      <TransactionSummary />

      {walletConnection && (
        <OverviewContactInfoContextProvider>
          <OverviewContactInfo />
        </OverviewContactInfoContextProvider>
      )}

      {walletConnection && (
        <>
          <SectionHeader>
            <div>Connected wallet</div>
            <Button onClick={disconnectWallet} className="h-8 text-base">
              <FontAwesomeIcon className="text-sm" icon={faRightFromBracket} />
              <div className="font-normal text-sm">Disconnect</div>
            </Button>
          </SectionHeader>

          <div className="flex flex-col w-full justify-start px-3 md:px-6 my-6">
            {/* <DashboardHeader>Connected wallet</DashboardHeader> */}
            <div
              className="flex items-center justify-between p-2
          bg-primary border rounded border-accentSecondary"
            >
              <div className="flex items-center gap-2">
                <div className="p-1">
                  <img
                    className="h-6 w-6"
                    src={walletConnection?.walletType.icon}
                  />
                </div>
                <div>{walletConnection?.walletType.name}</div>
              </div>

              <div>
                <TruncatedHash
                  hash={walletConnection.stellarPubKey}
                  uppercase
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
