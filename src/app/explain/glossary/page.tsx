"use client";

import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import Glossary from "@/containers/Glossary";
import {
  mExplainConfig,
  Tier2NavItems,
  useExplainContext,
} from "@/context/ExplainContext";
import { useEffect } from "react";

export default function GlossaryPage() {
  const { setSelectedTier2 } = useExplainContext();

  useEffect(() => {
    setSelectedTier2(mExplainConfig[Tier2NavItems.GLOSSARY]);
  }, []);

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
