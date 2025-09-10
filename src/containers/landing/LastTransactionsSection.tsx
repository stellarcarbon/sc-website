"use client";

import { MyTransactionRecord } from "@/app/types";
import TransactionHistoryService from "@/services/TransactionHistoryService";
import { useEffect, useState } from "react";
import TransactionListItem from "@/components/dashboard/TransactionListItem";
import Paragraph from "@/components/Paragraph";
import LandingSection from "./LandingSection";
import SCLink from "@/components/SCLink";

export default function LastTransactionsSection() {
  const [lastTransactions, setLastTransactions] = useState<
    MyTransactionRecord[]
  >([]);

  useEffect(() => {
    TransactionHistoryService.fetchRecentTransactions().then((records) => {
      setLastTransactions(records);
    });
  }, []);

  const first = (
    <div>
      <div className="px-4 text-4xl font-bold leading-tight tracking-light mb-2">
        Using Stellar
      </div>

      <Paragraph>
        Every time you sink CARBON, your contribution is recorded on
        {`Stellar's`} distributed ledger — transparent, permanent, and
        verifiable. The feed here shows the latest sinking transactions from
        contributors across the network, each one a step toward measurable
        climate impact.
      </Paragraph>
      <Paragraph>
        Stellarcarbon then bundles these contributions into official
        retirements in the Verra Registry. That means your action counts
        immediately on Stellar, as it is backed by certified off-chain impact.
      </Paragraph>
      <Paragraph>
        <SCLink href="/transactions">
          Explore the full transaction history
        </SCLink>
      </Paragraph>
    </div>
  );

  const second = lastTransactions && (
    <div className="w-full flex flex-col gap-1 items-center *:justify-center">
      {lastTransactions.map((tx, idx) => {
        return <TransactionListItem key={`tx_${idx}`} transaction={tx} />;
      })}
    </div>
  );

  return <LandingSection first={first} second={second} />;
}
