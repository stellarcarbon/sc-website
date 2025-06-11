"use client";

import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import Subheader from "@/components/Subheader";
import {
  mExplainConfig,
  Tier2NavItems,
  useExplainContext,
} from "@/context/ExplainContext";
import { useEffect } from "react";

export default function ExplainTrustPage() {
  const { setSelectedTier2 } = useExplainContext();

  useEffect(() => {
    setSelectedTier2(mExplainConfig[Tier2NavItems.TRUST]);
  }, []);

  return (
    <div className="flex flex-col">
      <Header>Trust & Verification</Header>
      <Paragraph>
        Providing a trustworthy solution to CO2 reduction so our users can
        compensate their emissions with confidence is our top priority. We do
        this by only working with projects that are enlisted in the Verra
        registry. The Verra registry is an accredited project registry with a
        Verified Carbon Standard. On top of that, Stellarcarbon is in direct
        contact with each of our projects making sure project goals are met.
      </Paragraph>
      <Subheader>Why Verra?</Subheader>
      <Paragraph>lorem</Paragraph>
      <Subheader>Project Vetting Criteria </Subheader>
      <Paragraph>lorem</Paragraph>
      <Subheader>Meet Our Projects</Subheader>
      <Paragraph>lorem</Paragraph>
    </div>
  );
}
