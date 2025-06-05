"use client";

import { MyTransactionRecord, RetirementStatus } from "@/app/types";
import TransactionListItem from "@/components/dashboard/TransactionListItem";
import SectionHeader from "@/components/SectionHeader";
import TransactionExplorerHeader from "@/containers/TransactionExplorer/TransactionExplorerHeader";
import { useAppContext } from "@/context/appContext";
import { PropsWithChildren } from "react";

export default function TxExplorerHelpPage() {
  const demoTransaction: MyTransactionRecord = {
    id: "abcdwxyz",
    createdAt: new Date(),
    memo: "example transaction",
    assetAmount: 2.5,
    asset: "XLM",
    sinkAmount: 1,
    retirementStatus: RetirementStatus.PENDING_USER,
    retirements: [],
    recipient: "recipient",
    funder: "funder",
    pagingToken: "000",
  };

  return (
    <div className="flex flex-col bg-darkest md:border border-tertiary md:rounded pt-2 pb-12 md:px-2 md:mb-8">
      <TransactionExplorerHeader />
      <div className="px-3 my-1 mb-4 flex flex-col gap-4">
        <div>
          Use this tool to browse historical contribution data. All
          Stellarcarbon transactions are completely publicly visible.
        </div>
        <div>
          Each transaction represents an individual contribution to the
          Stellarcarbon initiative. All contributions will be retired into
          eco-credits on the Verra registry.
        </div>
      </div>
      {/* <div>
        A sink carbon transaction is a swap of CARBON (payment) tokens for the
        same amount of CarbonSINK tokens. This generates an obligation for
        Stellarcarbon to retire eco-credits on the user’s behalf.
      </div> */}

      {/* <div className="px-3 text-xl md:text-2xl font-semibold my-2">
        Transactions
      </div> */}
      <div className="px-3 flex flex-col gap-3">
        <div className="">Take a look at this transaction tile:</div>
        <div className="my-4">
          <TransactionListItem transaction={demoTransaction} disabled />
        </div>

        <div>
          These tiles represent sinking transactions. It shows a summary of a
          Stellarcarbon transaction on the blockchain.
        </div>
        <div className="flex flex-col gap-6">
          <FieldContainer>
            <FieldKey>ID</FieldKey>
            <FieldValue>
              This is hash of the transaction, uniquely identifying it on the
              Stellar blockchain.
            </FieldValue>
          </FieldContainer>

          <FieldContainer>
            <FieldKey>Date</FieldKey>
            <FieldValue>The date the transaction was created at.</FieldValue>
          </FieldContainer>

          <FieldContainer>
            <FieldKey>Sink amount</FieldKey>
            <FieldValue>
              The amount of CARBON swapped for CarbonSINK tokens. This generates
              an obligation for Stellarcarbon to retire eco-credits on the
              user’s behalf.
            </FieldValue>
          </FieldContainer>

          <FieldContainer>
            <FieldKey>Memo</FieldKey>
            <FieldValue>
              A note left by the contributor, often the reason why they sunk
              CARBON.
            </FieldValue>
          </FieldContainer>
        </div>
      </div>
    </div>
  );
}

function FieldContainer({ children }: PropsWithChildren) {
  return <div className="flex flex-col items-start">{children}</div>;
}

function FieldKey({ children }: PropsWithChildren) {
  return (
    <div className="font-bold pr-1 text-xl text-accentSecondary">
      {children}
    </div>
  );
}

function FieldValue({ children }: PropsWithChildren) {
  return <div>{children}</div>;
}
