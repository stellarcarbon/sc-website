"use client";

import Header from "@/components/Header";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import Paragraph from "@/components/Paragraph";
import SCLink from "@/components/SCLink";
import Subheader from "@/components/Subheader";

export default function ExplainIntroductionPage() {
  return (
    <div className="flex flex-col">
      <Header>
        <div>
          <span>An introduction to </span>
          <CARBONCurrencyIcon className="inline" width={30} height={40} />
        </div>
      </Header>
      <Paragraph>
        At Stellarcarbon, we offer a simple solution for individuals and
        businesses to take direct climate action. Customers can simply connect a
        Stellar wallet, create a transaction and we will make sure 95% of that
        money goes towards{" "}
        <SCLink href="/projects">rainforest conservation</SCLink>. Behind the
        scenes we use a{" "}
        <SCLink href="/explain/how-it-works/sinking-process">
          sinking mechanism
        </SCLink>{" "}
        to make sure the corresponding Verified Carbon Units (VCU) are retired
        on the Verra registry in a transparent way. This makes it very easy for
        Stellar users to compensate for their CO2 emissions or contribute to
        nature conservation projects.
      </Paragraph>
      <Paragraph>
        {`That's all you need to know to contribute to the Stellarcarbon initiative. Just `}
        <SCLink href="/connect">connect your Stellar wallet</SCLink>. Otherwise,
        keep exploring!
      </Paragraph>

      {/* <Paragraph>
        Otherwise, have a look around on this explain page where we try be as
        transparent as possible about the accounting mechanisms behind
        Stellarcarbon.
      </Paragraph> */}

      <Subheader>Why rainforest conservation matters</Subheader>
      <Paragraph>
        Rainforests cover just 2 % of land yet hold 25 % of its land-based
        carbon and shelter over half of all land species. If the forests in
        Ucayali & Huánuco were to be removed it would be disastrous from an
        ecological viewpoint. Without protection, developers could clear them
        for farms, ranches or roads, releasing massive CO₂ and fragmenting
        habitat. By chipping in, you ensure the forest stays intact and the
        carbon stays locked away.
      </Paragraph>
    </div>
  );
}
