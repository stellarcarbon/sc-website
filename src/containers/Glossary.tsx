import { useMemo } from "react";

interface GlossaryItem {
  concept: string;
  definition: string;
}

export default function Glossary() {
  const glossaryItems: GlossaryItem[] = useMemo(
    () => [
      {
        concept: "CARBON",
        definition: "Token used to represent VCUs that are not retired.",
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
      <div>{item.concept}</div>
      <div>{item.definition}</div>
    </li>
  );
}
