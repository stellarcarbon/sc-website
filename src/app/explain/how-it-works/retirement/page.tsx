"use client";

import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import Subheader from "@/components/Subheader";
import Glossary from "@/containers/Glossary";
import {
  mExplainConfig,
  mExplainTier3Config,
  Tier2NavItems,
  Tier3NavItems,
  useExplainContext,
} from "@/context/ExplainContext";
import { useEffect } from "react";

export default function ExplainRetirementPage() {
  const { setSelectedTier2, setSelectedTier3 } = useExplainContext();

  useEffect(() => {
    setSelectedTier2(mExplainConfig[Tier2NavItems.HOWITWORKS]);
    setSelectedTier3(mExplainTier3Config[Tier3NavItems.RETIREMENT]);
  }, []);
  return (
    <div className="flex flex-col">
      <Header>Retirement process</Header>
      <Paragraph>
        When a user makes a transaction on Stellarcarbon, an equal amount of
        VCU's in the Verra registry has to be retired. This retirement leads a
        to certificate that can be added your personal or business balance sheet
        to show prove you are offsetting emissions.
      </Paragraph>
      <Subheader>What is retirement?</Subheader>
      <Paragraph>
        Retiring a VCU permanently removes it from circulation—turning it from
        transferable inventory into an exclusive, claimable one-tonne CO₂e
        reduction on your balance sheet. Until its retired, a VCU remains merely
        a tradable credit with no impact on anyone’s carbon accounting.
      </Paragraph>
      <Subheader>Fractional retirements</Subheader>
      <Paragraph>
        Retirement on the Verra registry only happens in whole units, but we
        also provide the option to make 'fractional retirements'. We allow users
        to create a retirement of 1.5 tonnes for example, which is not possible
        on Verra directly. Stellarcarbon built a mechanism that retires the
        remaining fractions into a community retirement.
      </Paragraph>
      <img
        className="max-w-[80%] mx-auto"
        src="/explain_retirement.png"
        alt="retirement process"
      />
    </div>
  );
}
