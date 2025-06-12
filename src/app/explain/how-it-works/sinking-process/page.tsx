"use client";

import Header from "@/components/Header";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import Paragraph from "@/components/Paragraph";
import Subheader from "@/components/Subheader";
import {
  mExplainTier3Config,
  mExplainConfig,
  Tier2NavItems,
  Tier3NavItems,
  useExplainContext,
} from "@/context/ExplainContext";
import { useEffect } from "react";

export default function ExplainSinkingProcessPage() {
  const { setSelectedTier3, setSelectedTier2 } = useExplainContext();

  useEffect(() => {
    setSelectedTier2(mExplainConfig[Tier2NavItems.HOWITWORKS]);
    setSelectedTier3(mExplainTier3Config[Tier3NavItems.SINKINGPROCESS]);
  }, []);

  return (
    <div>
      <Header>Sinking process</Header>

      <Paragraph>
        As a user you can {`"sink"`} <CARBONCurrencyIcon className="inline" />{" "}
        tokens, meaning you buy the token and immediatly lock it in. This
        locking or sinking means the <CARBONCurrencyIcon className="inline" />{" "}
        no longer a tradeable object and we will commit to the actual investment
        into the project.
        {/* which means you buy
          the token and it immediatly gets {`"sunk"`} so that it is no longer a
          tradeable asset, garantueeing the project is financed. */}
        {/* By sinking{" "}
          <CARBONCurrencyIcon className="inline" />, users actively contribute to
          real-world CO₂ reduction and support credible, vetted projects that make
          a measurable impact on the environment. Each token represents an
          estimated 1 tonne of CO₂ emission equivalent. */}
      </Paragraph>
    </div>
  );
}
