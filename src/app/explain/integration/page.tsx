"use client";

import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import {
  mExplainConfig,
  Tier2NavItems,
  useExplainContext,
} from "@/context/ExplainContext";
import { useEffect } from "react";

export default function ExplainIntegrationPage() {
  const { setSelectedTier2 } = useExplainContext();

  useEffect(() => {
    setSelectedTier2(mExplainConfig[Tier2NavItems.BUSINESS]);
  }, []);

  return (
    <div className="flex flex-col">
      <Header>For business</Header>
      <Paragraph>
        If you have a Stellar based business, it is easy to integrate with
        Stellarcarbon to help conserve the rainforest.
      </Paragraph>
    </div>
  );
}
