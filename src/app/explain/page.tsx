import Banner from "@/components/Banner";
import ContentContainer from "@/components/ContentContainer";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import Paragraph from "@/components/Paragraph";
import Subheader from "@/components/Subheader";
import AuditTable from "@/containers/AuditTable";
import Link from "next/link";

export default function ExplainPage() {
  return (
    <main className="flex flex-col items-center font-noto">
      <Banner
        title="Stellarcarbon"
        subtitle="Explained"
        background="blockchain-bg"
      />

      <ContentContainer>
        <Header>
          <div>
            <span>An introduction to </span>
            <CARBONCurrencyIcon className="inline" width={30} height={40} />
          </div>
        </Header>
        <Paragraph>
          At Stellarcarbon, we offer a unique solution for individuals and
          businesses to take direct climate action. By sinking{" "}
          <CARBONCurrencyIcon className="inline" />, users actively contribute
          to real-world CO₂ reduction and support credible, vetted projects that
          make a measurable impact on the environment. Each token represents an
          estimated 1 tonne of CO₂ emission equivalent.
        </Paragraph>
        <Subheader>Confidence</Subheader>
        <Paragraph>
          Providing a trustworthy solution to CO2 reduction so our users can
          compensate their emissions with confidence is our top priority. We do
          this by only working with projects that are enlisted in the Verra
          registry. The Verra registry is an accredited project registry with a
          Verified Carbon Standard. On top of that, Stellarcarbon is in direct
          contact with each of our projects making sure project goals are met.
        </Paragraph>
        <Subheader>How it works</Subheader>
        <Paragraph>
          A user can initiate a sinking transaction using our website or API,
          which sinks CARBON tokens (
          <CARBONCurrencyIcon className="inline" />) into the CarbonSINK. This
          transaction not only removes the token from circulation but also
          creates a commitment for Stellarcarbon to retire an equivalent amount
          of Verified Carbon Units (VCU) on Verra.
        </Paragraph>

        <Header>Our token balance</Header>
        <Paragraph>
          To maintain transparency in carbon credits and accurately track CO₂
          reductions, we provide a detailed breakdown of our balances and
          processes for sinking carbon on the Stellar blockchain. Below, we
          clarify how our system operates and how each figure displayed on this
          page is calculated.
        </Paragraph>

        <UnitExplanationList />
        <Paragraph>
          {`Any difference between the inventories on the blockchain and Verra are
          of temporary nature. As our users sink CARBON, retirement of these tokens is
           initiated. During
          this process the VCU's are dedicated to a certificate. Stellarcarbon
          provides personal certificates as well as a automatic community
          retirement certificate option.`}
          <br />
          <br />
          Eventually all CARBON pending retirement will be accounted for in
          these community certificates.
        </Paragraph>
        <span className="text-center py-4 font-semibold">
          {`1000 kg = 1 ton = 1 VCU = 1 CARBON = 1`}
          <CARBONCurrencyIcon className="inline ml-1" />
          {` = 1 CarbonSINK`}
        </span>
        <div className="m-auto md:w-[900px] mb-16">
          <AuditTable />
        </div>

        <Header>Understanding Carbon Accounting on Stellar</Header>

        <Paragraph>
          At Stellarcarbon, transparency is key. Our platform enables anyone to
          support meaningful CO₂ reduction projects, but we know that clear
          accounting is essential to building trust and credibility. This page
          provides a detailed view of how we track, balance, and “sink” CO₂
          emissions using our CARBON and CarbonSINK tokens on the Stellar
          blockchain.
        </Paragraph>
        <Paragraph>
          Every step in our process, from inventory tracking to retirement on
          Verra, is meticulously recorded and displayed here. Using an atomic
          swap system, we ensure that for every CARBON token purchased and
          retired, a corresponding CarbonSINK token is issued, representing
          verifiable CO₂ compensation. Our tables and figures give a real-time
          view of our current inventory, available supply, and the pending
          emissions still to be offset, making the carbon accounting process
          clear and accessible for everyone.
        </Paragraph>
        <Paragraph>
          With this transparent system, you can confidently support projects
          that genuinely contribute to biodiversity and climate impact, knowing
          exactly how your carbon offset is managed and retired.
        </Paragraph>

        <Header>Audit tool</Header>

        <Paragraph>
          To enhance transparency and give users full confidence in our carbon
          accounting process, we offer an open-source auditing tool available on
          GitHub. This tool allows anyone to independently verify our carbon
          balance, track the lifecycle of CARBON and CarbonSINK tokens, and
          monitor the integrity of our sinking mechanism on the Stellar
          blockchain. We also use it ourselves behind the scenes to power our
          API.
          <br />
          <br /> Check it out{" "}
          <Link
            className="underline"
            href="https://github.com/stellarcarbon/sc-audit"
            target="_blank"
          >
            here
          </Link>
          .
        </Paragraph>
      </ContentContainer>
      <Footer />
    </main>
  );
}

function UnitExplanationList() {
  return (
    <ul className="mx-3 px-8 pt-4 my-4 list-disc bg-primary border border-tertiary rounded-md md:w-[90%] self-center">
      <UnitExplanation
        title={`VCU pool on Verra`}
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
