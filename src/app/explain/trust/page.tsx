"use client";

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
      <Paragraph>
        Verra’s Verified Carbon Standard (VCS) is the industry benchmark for
        voluntary carbon markets, thanks to its rigorous, science-based
        methodologies and multi-stage third-party validation process. By
        requiring each project to demonstrate clear baselines, additionality,
        and permanence before credits are issued, Verra ensures that every tonne
        of CO₂ reduction is real and measurable. Its public registry offers full
        transparency so anyone can audit our offsets at any time.{" "}
      </Paragraph>

      <Subheader>Meet Our Project(s)</Subheader>
      <Paragraph>
        In our current stage of operations we only support one project. We hope
        to offer our users a selection of projects in the future.
      </Paragraph>
      <Paragraph>
        Our current project a is focussed on prevent deforestation and
        degradation of the forests in the Ucayali region. We have a dedicated
        page on the website with more information. Check it out{" "}
        <SCLink href={"/projects"}>here</SCLink>.
      </Paragraph>
    </div>
  );
}
