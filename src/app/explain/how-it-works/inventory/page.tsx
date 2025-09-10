"use client";

import Header from "@/components/Header";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import Paragraph from "@/components/Paragraph";
import Subheader from "@/components/Subheader";
import AuditTable from "@/containers/AuditTable";

export default function ExplainInventoryPage() {
  return (
    <div className="flex flex-col">
      <Header>Our token balance</Header>
      <Paragraph>
        At Stellarcarbon we hold an inventory of VCU credits which fully backs
        the <CARBONCurrencyIcon className="inline" /> in circulation. When
        you sink <CARBONCurrencyIcon className="inline" />, CarbonSINK tokens 
        are minted and we retire an equal amount of VCUs in the Verra Registry.
      </Paragraph>
      <Subheader>Current inventory</Subheader>
      <Paragraph className="!pb-0">
        Take a look at our real-time inventory summary:
      </Paragraph>

      <AuditTable />

      <Paragraph>
        Any difference between the inventories on Stellar and Verra is of a 
        temporary nature. As contributors sink CARBON, retirement of these tokens is
        initiated. During this process the VCUs are retired into a certificate.
        Stellarcarbon provides personal certificates as well as an automatic community
        certificate option. Over time all CARBON pending retirement will be accounted 
        for in these retirement certificates.
      </Paragraph>
    </div>
  );
}
