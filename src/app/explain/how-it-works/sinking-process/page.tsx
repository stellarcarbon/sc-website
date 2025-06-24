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
        As a user you can {`"sink"`} <CARBONCurrencyIcon className="inline" />{" "}
        tokens, meaning you buy the token and immediatly lock it in. This
        locking or sinking means the <CARBONCurrencyIcon className="inline" />{" "}
        no longer a tradeable object and we will commit to the actual investment
        into the project.
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
