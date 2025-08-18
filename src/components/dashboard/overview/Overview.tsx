"use client";

import { useAppContext } from "@/context/appContext";
import TransactionSummary from "../TransactionSummary";
import TruncatedHash from "../TruncatedHash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import SectionHeader from "@/components/SectionHeader";
import Button from "@/components/Button";
import OverviewContactInfo from "./OverviewContactInfo";
import { InlineContactInfoContextProvider } from "@/context/InlineContactInfoContext";

export default function Overview() {
  const { walletConnection, disconnectWallet } = useAppContext();

  return (
    <div className="w-full">
      <TransactionSummary />

      {walletConnection && (
        <InlineContactInfoContextProvider>
          <OverviewContactInfo />
        </InlineContactInfoContextProvider>
      )}
    </div>
  );
}
