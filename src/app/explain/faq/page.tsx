"use client";

import {
  mExplainConfig,
  Tier2NavItems,
  useExplainContext,
} from "@/context/ExplainContext";
import { useEffect } from "react";

export default function FAQPage() {
  const { setSelectedTier2 } = useExplainContext();

  useEffect(() => {
    setSelectedTier2(mExplainConfig[Tier2NavItems.FAQ]);
  }, []);

  return <div className="flex flex-col">FAQPage</div>;
}
