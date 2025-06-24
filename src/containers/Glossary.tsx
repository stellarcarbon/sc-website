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
        concept: "CARBON",
        definition: "Token used to represent VCUs that are not retired.",
      },
      {
        concept: "CarbonSINK",
        definition: "Token used to represent retired VCUs.",
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
  return (
    <li>
      <div className="px-4 text-xl font-bold tracking-wide">{item.concept}</div>
      <Paragraph>{item.definition}</Paragraph>
    </li>
  );
}
