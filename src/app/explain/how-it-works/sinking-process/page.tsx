"use client";

import Header from "@/components/Header";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import Paragraph from "@/components/Paragraph";
import Subheader from "@/components/Subheader";

export default function ExplainSinkingProcessPage() {
  return (
    <div className="flex flex-col">
      <Header>Sinking process</Header>

      <Paragraph>
        Customers can sink <CARBONCurrencyIcon className="inline" /> tokens,
        meaning they buy the token and immediatly {`"lock it in"`}. This locking
        means the <CARBONCurrencyIcon className="inline" /> is no longer a
        tradeable object and the investment into the project is now funded.
      </Paragraph>

      <Subheader>Sinking</Subheader>
      <Paragraph>
        The locking mechanism is contained within each transaction.
        Stellarcarbon only offers transactions that immediately retires the{" "}
        <CARBONCurrencyIcon className="inline" /> in exchange for CarbonSINK. As
        such, the customer will receive CarbonSINK in their wallet, not the{" "}
        <CARBONCurrencyIcon className="inline" /> itself. The CarbonSINK asset
        represents an equal amount of <CARBONCurrencyIcon className="inline" />{" "}
        sunk and has no inherent value.
      </Paragraph>

      <Subheader>Key guarantees for blockchain experts</Subheader>
      <Paragraph>
        <ul className="list-disc mx-6 space-y-2">
          <li>
            <b>Atomicity</b>: both token burn and mint occur in a single Ledger
            transaction.
          </li>
          <li>
            <b>Transparency</b>: every sink is publicly visible on Stellar’s
            block explorer and in our audit tool.
          </li>
          <li>
            <b>Traceability</b>: on-chain events are correlated to off-chain
            retirements via requestId.
          </li>
        </ul>
      </Paragraph>
    </div>
  );
}
