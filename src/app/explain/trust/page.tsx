"use client";

import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import SCLink from "@/components/SCLink";
import Subheader from "@/components/Subheader";

export default function ExplainTrustPage() {
  return (
    <div className="flex flex-col">
      <Header>Trust & Verification</Header>
      <Subheader>Why Stellarcarbon?</Subheader>
      <Paragraph>
        Providing a trustworthy way to help reduce CO₂ is our top priority. We
        support landscape conservation projects around the world that have real,
        measurable benefits — not just for the climate, but also for biodiversity
        and local communities. Our goal is to make sure every contribution has
        the greatest possible impact.
      </Paragraph>

      <Paragraph>
        To ensure quality, we only work with projects that are independently
        audited and follow internationally recognized standards. Before listing
        any project, we also do our own research, using a mix of scientific
        studies and satellite data to verify that the impact is real and
        lasting.
      </Paragraph>

      <Subheader>REDD+ eco-credits</Subheader>
      <Paragraph>
        The REDD+ framework (Reducing Emissions from Deforestation and Forest
        Degradation) is a UN-backed approach that supports long-term forest
        conservation by creating financial incentives to protect natural
        ecosystems. To be effective,{" "}
        <SCLink
          href="https://everland.earth/news/redd-101-additionality-leakage-risk/"
          target="_blank"
        >
          REDD+ projects
        </SCLink>{" "}
        must demonstrate <b>additionality</b>, meaning the emissions reductions
        would not have occurred without the project, and ensure{" "}
        <b>permanence</b>, so the forest remains protected over time. Projects
        must also address <b>leakage</b>, the risk that deforestation pressure
        simply shifts to nearby areas.
      </Paragraph>
      <Paragraph>
        Beyond carbon, REDD+ projects generate wide-ranging benefits. These
        include new job opportunities and essential services for local
        communities (community additionality), stronger protection for wildlife
        and habitats (biodiversity additionality), and activities that build
        resilience to climate change. Projects are regularly assessed for
        environmental and social risk, and contribute a portion of carbon
        credits to a global buffer pool as insurance against future reversals.
        Together, these safeguards help ensure REDD+ projects deliver credible,
        lasting impact.
      </Paragraph>

      <Subheader>Working with Verra</Subheader>
      <Paragraph>
        Verra’s Verified Carbon Standard (VCS) is the industry benchmark for
        voluntary carbon markets, thanks to its rigorous, science-based
        methodologies and multi-stage third-party validation process. By
        requiring each project to demonstrate clear baselines, additionality,
        and permanence before credits are issued, Verra ensures that every ton
        of CO₂ reduction is real and measurable. Its public registry offers full
        transparency so anyone can audit our balances and retirements at any time.
      </Paragraph>
    </div>
  );
}
