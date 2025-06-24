"use client";

import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import Glossary from "@/containers/Glossary";

export default function GlossaryPage() {
  return (
    <div className="flex flex-col">
      <Header>Glossary of key terms</Header>
      <Paragraph>
        Here you can find explanation of the concepts used on this website.
      </Paragraph>
      <Glossary />
    </div>
  );
}
