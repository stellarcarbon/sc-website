"use client";

import Header from "@/components/Header";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import Paragraph from "@/components/Paragraph";
import AuditTable from "@/containers/AuditTable";
import {
  mExplainTier3Config,
  mExplainConfig,
  Tier2NavItems,
  Tier3NavItems,
  useExplainContext,
} from "@/context/ExplainContext";
import { useEffect } from "react";
import Subheader from "@/components/Subheader";
import AuditTable2 from "@/containers/AuditTable2";

export default function ExplainInventoryPage() {
  const { setSelectedTier2, setSelectedTier3, setIsOpen } = useExplainContext();

  useEffect(() => {
    console.log("in");
    setSelectedTier2(mExplainConfig[Tier2NavItems.HOWITWORKS]);
    setSelectedTier3(mExplainTier3Config[Tier3NavItems.INVENTORY]);
    setIsOpen(true);
  }, []);

  return (
    <div className="flex flex-col">
      <Header>Our token balance</Header>
      <Paragraph>
        At Stellarcarbon we keep an inventory of VCU credits and{" "}
        <CARBONCurrencyIcon className="inline" /> tokens. When you sink{" "}
        <CARBONCurrencyIcon className="inline" />, CarbonSINK tokens are minted
        and we will retire an equal amount of VCU credits in the Verra registry.
      </Paragraph>
      <Subheader>Current inventory</Subheader>
      <Paragraph>Have a look at our current inventory (realtime!):</Paragraph>

      <AuditTable2 />

      <Paragraph>
        {`Any difference between the inventories on the blockchain and Verra are
            of temporary nature. As our users sink CARBON, retirement of these tokens is
             initiated. During
            this process the VCU's are dedicated to a certificate. Stellarcarbon
            provides personal certificates as well as a automatic community
            retirement certificate option.`}
        <br />
        <br />
        Eventually all CARBON pending retirement will be accounted for in these
        community certificates.
      </Paragraph>

      {/* <Paragraph>
        To maintain transparency in carbon credits and accurately track CO₂
        reductions, we provide a detailed breakdown of our balances and
        processes for sinking carbon on the Stellar blockchain. Below, we
        clarify how our system operates and how each figure displayed on this
        page is calculated.
      </Paragraph> */}
      {/* <UnitExplanationList /> */}

      {/* <span className="text-center py-4 font-semibold">
        {`1000 kg = 1 ton = 1 VCU = 1 CARBON = 1`}
        <CARBONCurrencyIcon className="inline ml-1" />
        {` = 1 CarbonSINK`}
      </span>
      <div className="m-auto md:w-[900px] mb-16">
        <AuditTable />
      </div> */}
    </div>
  );
}
