"use client";

import Header from "@/components/Header";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import Paragraph from "@/components/Paragraph";
import SCLink from "@/components/SCLink";

export default function ExplainHowItWorks() {
  return (
    <div className="flex flex-col">
      <Header>How it works</Header>
      <Paragraph>
        When you sink CARBON (<CARBONCurrencyIcon className="inline" />) tokens
        on Stellarcarbon — either through our dApp or via a single API
        call — you're doing two things in one seamless transaction. First, the
        CARBON token is removed from circulation on the Stellar ledger. At the
        same time, that very transaction creates an on-chain commitment for us
        to retire one Verified Carbon Unit (VCU) on the{" "}
        <SCLink href="https://verra.org" target="_blank">
          Verra Registry
        </SCLink>
        .
      </Paragraph>

      <Paragraph>
        Behind the scenes, we maintain a strict 1:1 correspondence between
        CARBON and VCUs (check out our{" "}
        <SCLink href="/explain/how-it-works/inventory">token balance</SCLink>).
        Every token you sink triggers us to pull an equivalent VCU out of our
        Verra account and “retire” it so it can never be resold. This atomic
        pairing means the on-chain transactions and the off-chain retirements 
        always stay linked and in sync.
      </Paragraph>

      <div className="py-8">
        <img
          className="max-w-[80%] mx-auto"
          src="/explain_stellar_verra_integration.png"
          alt="Diagram: sinking a CARBON token on Stellar triggers retirement of one Verra VCU"
        />
        <em className="block text-center text-sm text-tertiary mt-1">
          CARBON ↔︎ CarbonSINK on-chain sink paired 1:1 with VCU retirement on Verra
        </em>
      </div>
    </div>
  );
}
