"use client";

import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import Glossary from "@/containers/Glossary";

export default function GlossaryPage() {
  return (
    <div className="flex flex-col">
      <Header>Glossary of key terms</Header>
      <Paragraph>
        Climate science and carbon accounting can be daunting at first.
        Let this glossary be your guide.
      </Paragraph>
      <Glossary />
    </div>
  );
}
