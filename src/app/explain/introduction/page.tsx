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
        businesses to take direct climate action. You can simply pay us and we
        will make sure 95% of your money will go to a vetted rainforest
        conversation project. Behind the scenes we use a{" "}
        <SCLink href="/explain/how-it-works/sinking-process">sinking</SCLink>{" "}
        mechanism to make sure the corresponding Verified Carbon Units (VCU) are
        retired on the Verra registry.
      </Paragraph>
      <Paragraph>
        {`If you are just looking to make a contribution to the Stellarcarbon
        initiative, that's all you need to know. Just connect your Stellar
        wallet `}
        <SCLink href="/connect">here</SCLink>.
      </Paragraph>

      <Paragraph>
        Otherwise, have a look around on this explain page where we try be as
        transparent as possible about the accounting mechanisms behind
        Stellarcarbon.
      </Paragraph>

      <Subheader>Why rainforest conservation matters</Subheader>
      <Paragraph>
        Rainforests cover under 2 % of Earth’s land but store 25 % of its carbon
        and house over half of all land species. Protecting them locks away CO₂,
        regulates rainfall, and prevents erosion. Importantly, conservation
        projects hire local residents as forest keepers, offering stable,
        well-paid jobs that align community welfare with ecosystem protection.
      </Paragraph>
    </div>
  );
}

export function UnitExplanationList() {
  return (
    <ul className="mx-3 px-8 pt-4 my-4 list-disc bg-primary border border-tertiary rounded-md md:w-[90%] self-center">
      <UnitExplanation
        title={`Carbon pool on Verra`}
        text={`This is our current inventory of VCU's at Verra.`}
      />
      <UnitExplanation
        title={`VCU's burned on Verra`}
        text={`These VCU's have been 'burned' at the Verra registry, making them no longer tradeable.`}
      />
      <UnitExplanation
        title={`CARBON on Stellar`}
        text={`The amount CARBON currently for available for sale on the Stellar blockchain.`}
      />
      <UnitExplanation
        title={`CarbonSINK on Stellar`}
        text={`When CARBON is sold, CarbonSINK is created and the CARBON is sunk, indicating this token can no longer be sold.`}
      />
    </ul>
  );
}

function UnitExplanation({ title, text }: { title: string; text: string }) {
  return (
    <li className="mb-4">
      <h3 className="text-xl">{title}</h3>
      <span className="text-sm">{text}</span>
    </li>
  );
}
