"use client";

import Header from "@/components/Header";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import Paragraph from "@/components/Paragraph";
import Subheader from "@/components/Subheader";
import AuditTable2 from "@/containers/AuditTable2";

export default function ExplainInventoryPage() {
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
    </div>
  );
}
