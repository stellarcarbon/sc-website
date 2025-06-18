"use client";

import Header from "@/components/Header";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import Paragraph from "@/components/Paragraph";
import SCLink from "@/components/SCLink";
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
        When you sink CARBON (<CARBONCurrencyIcon className="inline" />) tokens
        on Stellarcarbon (either through our web interface or via a single API
        call) you’re doing two things in one seamless transaction. First, the
        CARBON token is removed from circulation on the Stellar ledger. At the
        same time, that same transaction creates an on-chain commitment for us
        to retire one Verified Carbon Unit (VCU) on Verra’s registry.
      </Paragraph>

      <Paragraph>
        Behind the scenes, we maintain a strict 1:1 correspondence between
        CARBON and VCUs (check out our{" "}
        <SCLink href="/explain/how-it-works/inventory">token balance</SCLink>).
        Every token you burn triggers us to pull an equivalent VCU out of our
        Verra account and “retire” it so it can never be resold. This atomic
        pairing means your on-chain burn and the off-chain retirement always
        stay in sync.
      </Paragraph>

      <img
        className="max-w-[80%] mx-auto"
        src="/explain_stellar_verra_integration.png"
        alt="Diagram: burning a CARBON token on Stellar triggers retirement of one Verra VCU"
      />
      <em className="block text-center text-sm text-tertiary mt-1">
        Figure: CARBON ↔︎ CarbonSINK on-chain burn paired 1:1 with VCU
        retirement on Verra
      </em>
    </div>
  );
}
