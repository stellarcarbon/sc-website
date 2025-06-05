"use client";

import { MyTransactionRecord } from "@/app/types";
import TransactionHistoryService from "@/services/TransactionHistoryService";
import Link from "next/link";
import { useEffect, useState } from "react";
import TransactionListItem from "@/components/dashboard/TransactionListItem";
import Paragraph from "@/components/Paragraph";
import LandingSection from "./LandingSection";

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
        All sunk CARBON is accounted for by using the Stellar blockchain
        technology, making it highly transparent that your contribution ends up
        in the right place.
        <br />
        <br /> Check out the most recent transactions on Stellarcarbon.
      </Paragraph>
      <Paragraph>
        <Link
          href="/transactions"
          className="underline text-sm text-accentSecondary"
        >
          View the full list in our transaction explorer
        </Link>
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
