"use client";

import Header from "@/components/Header";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import Paragraph from "@/components/Paragraph";
import SCLink from "@/components/SCLink";
import Subheader from "@/components/Subheader";

export default function ExplainSinkingProcessPage() {
  return (
    <div className="flex flex-col">
      <Header>Sinking process</Header>

      <Paragraph>
        Our customers can sink <CARBONCurrencyIcon className="inline" /> tokens,
        meaning they buy the token and immediately lock it onto their account. 
        This locking means the <CARBONCurrencyIcon className="inline" /> is no 
        longer a tradeable object and the investment into the project is now 
        funded. The owner of the account on which the balance is locked may 
        claim the environmental benefit.
      </Paragraph>

      <Paragraph>
        An essential part of the mechanism is that the input{" "}
        <CARBONCurrencyIcon className="inline" /> is permanently removed from
        circulation. In cryptocurrency jargon this is also known as {`"token burning"`}.
        We avoid this phrase because sinking <CARBONCurrencyIcon className="inline" />
        {" "}causes a reduction of CO₂ in the atmosphere, and no combustion is 
        involved.
      </Paragraph>

      <Subheader>Sinking transaction</Subheader>
      <Paragraph>
        The locking mechanism is contained within each transaction.
        Stellarcarbon builds transactions that swap the purchased{" "}
        <CARBONCurrencyIcon className="inline" /> for CarbonSINK. As such, the 
        recipient receives CarbonSINK in their wallet as proof of their contribution.
        This creates an obligation for Stellarcarbon to process a{" "}
        <SCLink href="/explain/how-it-works/retirement">retirement</SCLink> in the
        Verra Registry. The CarbonSINK asset represents an equal amount of{" "}
        <CARBONCurrencyIcon className="inline" /> sunk and cannot be traded or
        transferred.
      </Paragraph>

      <Subheader>Key guarantees for blockchain experts</Subheader>
      <Paragraph>
        <ul className="list-disc mx-6 space-y-2">
          <li>
            <b>Atomicity</b>: both token burn and mint occur in a single ledger
            transaction.
          </li>
          <li>
            <b>Transparency</b>: every sinking transaction is publicly visible on 
            Stellar block explorers and in our audit tool.
          </li>
          <li>
            <b>Traceability</b>: retirements link to the hash digests of the 
            transactions that they incorporate.
          </li>
        </ul>
      </Paragraph>
    </div>
  );
}
