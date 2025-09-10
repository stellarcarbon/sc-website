import Paragraph from "@/components/Paragraph";
import SCLink from "@/components/SCLink";
import { ReactNode, useMemo } from "react";

interface GlossaryItem {
  concept: string;
  definition: ReactNode;
}

export default function Glossary() {
  const glossaryItems: GlossaryItem[] = useMemo(
    () => [
      {
        concept: "Additionality",
        definition: `Additionality means that the positive impact of a project, such as reducing deforestation or capturing carbon, would not have happened without the project. It ensures that the benefits go beyond what would normally occur.`,
      },

      {
        concept: "Baseline",
        definition:
          "In REDD+, a baseline is the projected change in forest carbon stock that would occur without the project. It can also refer more broadly to the conditions before a project begins, used for comparison when evaluating project impact.",
      },
      {
        concept: "Business as usual (BAU)",
        definition:
          "BAU describes what would happen to emissions or forest use without any REDD+ activities. It assumes no change in current policies, practices, or behaviors.",
      },
      {
        concept: "CARBON",
        definition: "Token used to represent VCUs that are not retired.",
      },
      {
        concept: "CarbonSINK",
        definition: "Token used to represent retired VCUs.",
      },
      {
        concept: "Carbon market",
        definition:
          "A system where carbon credits are bought and sold. These credits represent reductions in greenhouse gas emissions. Stellarcarbon participates only in the voluntary carbon market, not regulated by law.",
      },
      {
        concept: "Carbon offset",
        definition:
          "A carbon offset is a reduction or removal of greenhouse gases used to compensate for emissions made elsewhere. One offset typically equals one metric ton of CO₂ equivalent.",
      },
      {
        concept: "Climate, Community and Biodiversity Alliance (CCBA)",
        definition:
          "An alliance of international NGOs promoting land-use projects that address climate change, support local communities, and protect biodiversity.",
      },
      {
        concept: "Co-benefit",
        definition:
          "Additional benefits of REDD+ beyond reducing emissions. These can include biodiversity conservation, poverty reduction, better governance, and climate adaptation.",
      },
      {
        concept: "Compensation claim",
        definition:
          "A claim that a company or individual has offset their own emissions by retiring carbon credits, effectively compensating for a specific footprint.",
      },
      {
        concept: "Contribution claim",
        definition:
          "A claim that a company or individual has supported climate action through the purchase or funding of carbon credits, without directly offsetting their own emissions.",
      },
      {
        concept: "Deforestation",
        definition:
          "The permanent conversion of forest land to non-forest uses, typically driven by human activity. Definitions vary slightly, but all involve significant loss of forest cover.",
      },
      {
        concept: "Degradation",
        definition:
          "Degradation refers to a decline in forest health or productivity, reducing its carbon storage or ecological function, without converting it into another land use.",
      },
      {
        concept: "Ex-ante carbon units",
        definition:
          "Credits issued for expected future emission reductions or removals, often based on projected performance of a project. They carry more uncertainty, since benefits are not yet verified.",
      },
      {
        concept: "Ex-post carbon units",
        definition:
          "Credits issued only after emission reductions or removals have been measured and verified. They represent realized impact and are generally considered more reliable than ex-ante credits.",
      },
      {
        concept: "Forest",
        definition:
          "A forest is generally defined by a minimum area, tree height, and canopy cover, with no dominant agricultural land use. Definitions vary by organization and country.",
      },
      {
        concept: "Free, prior and informed consent (FPIC)",
        definition:
          "FPIC ensures that communities can accept or reject projects affecting their lands. It must be given freely, in advance, and with full understanding of the proposed activities.",
      },
      {
        concept: "GHG Protocol",
        definition:
          "The Greenhouse Gas Protocol provides globally recognized standards for measuring, managing, and reporting greenhouse gas emissions across Scope 1, 2, and 3.",
      },
      {
        concept: "Integrity Council for the Voluntary Carbon Market (ICVCM)",
        definition:
          "An independent governance body developing the Core Carbon Principles (CCPs) to define high-quality carbon credits and improve trust in voluntary markets.",
      },
      {
        concept: "Leakage",
        definition:
          "Leakage happens when stopping deforestation in one area causes it to increase elsewhere. REDD+ projects must account for and reduce this risk.",
      },
      {
        concept: "Measuring, reporting and verifying (MRV)",
        definition:
          "MRV refers to tracking and confirming emissions reductions. It includes measuring forest carbon changes, reporting the data, and having it verified by independent bodies.",
      },
      {
        concept: "Opportunity cost",
        definition:
          "In REDD+, opportunity cost refers to the income lost by not converting forest land to more profitable uses like agriculture or logging.",
      },
      {
        concept: "REDD+",
        definition:
          "REDD+ stands for 'Reducing Emissions from Deforestation and Forest Degradation, and enhancing forest carbon stock in developing countries.' It refers to a UN-backed framework that includes local, subnational, national, and global actions aimed at reducing forest loss and improving forest health. The goal is to lower carbon emissions by preventing deforestation and degradation while also increasing carbon storage through forest conservation, sustainable management, and reforestation efforts. REDD+ is designed to deliver both environmental and social benefits, especially in regions facing high deforestation pressure.",
      },
      {
        concept: "Reforestation",
        definition:
          "The process of turning non-forested land back into forest, typically through planting, seeding, or encouraging natural regrowth on land that was previously forested.",
      },
      {
        concept: "Sinking",
        definition: (
          <div>
            {`The core function of Stellarcarbon. You don't just buy a token, we
            also immediatly remove it from circulation by creating CarbonSINK.
            Read more about this process `}
            <SCLink href="/explain/how-it-works/sinking-process">here</SCLink>.
          </div>
        ),
      },
      {
        concept: "Ton / tonne (t)",
        definition:
          "One ton is equivalent to 1000 kg (also called a metric ton).",
      },
      {
        concept: "tCO₂e",
        definition:
          "tCO₂e stands for tons of carbon dioxide equivalent. It's a unit used to measure the global warming potential of different greenhouse gases, converting them to a common standard based on their warming effect relative to carbon dioxide (CO₂). This allows for a standardized way to quantify and compare the impact of various greenhouse gases on climate change.",
      },
      {
        concept: "Validation",
        definition:
          "The process where an independent organization reviews a project's design before it starts, to ensure it meets specific standards such as those required for VCS or the Clean Development Mechanism (CDM).",
      },
      {
        concept: "Verification",
        definition:
          "A review by a qualified third party that checks whether a project has actually delivered the emissions reductions and other intended outcomes it set out to achieve.",
      },
      {
        concept: "Verified Carbon Standard (VCS)",
        definition:
          "A leading certification system in the voluntary carbon market. Projects approved under VCS generate Verified Emission Reductions (VERs), which are recognized units of avoided or removed emissions.",
      },
      {
        concept: "Voluntary Carbon Markets Integrity Initiative (VCMI)",
        definition:
          "An initiative that provides guidance on how companies can make credible claims about their use of carbon credits as part of broader climate strategies.",
      },
      {
        concept: "Voluntary market",
        definition:
          "A type of carbon market where buyers choose to purchase carbon credits on their own initiative. These credits are often used to compensate for emissions and are not required by law or regulation.",
      },
    ],
    []
  );

  return (
    <div>
      <ul>
        {glossaryItems.map((item, idx) => {
          return <GlossaryListItem key={`glossary_${idx}`} item={item} />;
        })}
      </ul>
    </div>
  );
}

function GlossaryListItem({ item }: { item: GlossaryItem }) {
  const anchorId = item.concept
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '');    // Trim leading/trailing hyphens
  
  return (
    <li id={anchorId} className="scroll-mt-6">
      <div className="px-4 text-xl font-bold tracking-wide">
        <SCLink href={`#${anchorId}`}>{item.concept}</SCLink>
      </div>
      <Paragraph>{item.definition}</Paragraph>
    </li>
  );
}
