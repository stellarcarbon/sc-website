"use client";

import Header from "@/components/Header";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import Paragraph from "@/components/Paragraph";
import Subheader from "@/components/Subheader";
import ExplainContainer from "@/containers/explain/ExplainContainer";
import {
  mExplainConfig,
  Tier2NavItems,
  useExplainContext,
} from "@/context/ExplainContext";
import { useEffect } from "react";

export default function ExplainHowItWorks() {
  const { setSelectedTier2, setSelectedTier3 } = useExplainContext();

  useEffect(() => {
    setSelectedTier2(mExplainConfig[Tier2NavItems.HOWITWORKS]);
    setSelectedTier3(undefined);
  });

  return (
    <div className="flex flex-col">
      <Header>How it works</Header>
      <Paragraph>
        A user can initiate a sinking transaction using our website or API,
        which sinks CARBON tokens (
        <CARBONCurrencyIcon className="inline" />) into the CarbonSINK. This
        transaction not only removes the token from circulation but also creates
        a commitment for Stellarcarbon to retire an equivalent amount of
        Verified Carbon Units (VCU) on Verra.
      </Paragraph>
    </div>
  );
}
