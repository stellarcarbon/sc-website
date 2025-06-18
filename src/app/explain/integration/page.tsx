"use client";

import Codeblock from "@/components/Codeblock";
import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import SCLink from "@/components/SCLink";
import Subheader from "@/components/Subheader";
import {
  mExplainConfig,
  Tier2NavItems,
  useExplainContext,
} from "@/context/ExplainContext";
import { useEffect } from "react";

export default function ExplainIntegrationPage() {
  const { setSelectedTier2 } = useExplainContext();

  useEffect(() => {
    setSelectedTier2(mExplainConfig[Tier2NavItems.BUSINESS]);
  }, []);

  return (
    <div className="flex flex-col">
      <Header>For business</Header>
      <Paragraph>
        Enable your product or platform to automatically channel value into
        rainforest and ecosystem projects. Whether you run a web app, mobile
        dApp, or backend service on Stellar, you can integrate carbon-sinking
        with just a few lines of code, so every transaction your users make also
        contributes to nature.
      </Paragraph>

      <Subheader>HTTP API integration</Subheader>
      <Paragraph>
        Request a sinking transaction from our API and sign it with your company
        wallet or let your customer sign it with theirs, you choose what fits
        best. Post the signed transaction back to our API and you done.
      </Paragraph>

      <Subheader>Soroban Smart-Contract integration</Subheader>
      <Paragraph>
        If you use smart contracts in your workflow, you can easily add a single
        line to sink CARBON:
        <Codeblock>
          {`contract.call("sink", (user_address, contribution_amount))?;`}
        </Codeblock>
      </Paragraph>

      <Subheader>Contact us</Subheader>
      <Paragraph>
        We are eager to help you integrate Stellarcarbon into your Stellar
        workflows. Just send us an email at{" "}
        <SCLink href={"mailto:info@stellarcarbon.io"}>
          info@stellarcarbon.io
        </SCLink>
        .
      </Paragraph>
    </div>
  );
}
