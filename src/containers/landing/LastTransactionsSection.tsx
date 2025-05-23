"use client";

import { MyTransactionRecord } from "@/app/types";
import TransactionHistoryService from "@/services/TransactionHistoryService";
import Header from "@/components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useAppContext } from "@/context/appContext";
import TransactionListItem from "@/components/dashboard/TransactionListItem";
import TransactionsLoading from "@/components/dashboard/transactions/TransactionsLoading";
import Paragraph from "@/components/Paragraph";
import { useRouter } from "next/navigation";
import LandingSection from "./LandingSection";
import LandingSectionHeader from "./LandingSectionHeader";

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
      <LandingSectionHeader>Using the blockchain</LandingSectionHeader>

      <Paragraph>
        All sunk CARBON is accounted for by using the Stellar blockchain
        technology, making it highly transparent that your contribution ends up
        in the right place.
        <br />
        <br /> Check out the most recent transactions on Stellarcarbon.
      </Paragraph>
      <Paragraph>
        <Link href="/transactions" className="underline text-sm">
          View the full list in our transaction explorer
        </Link>
      </Paragraph>
    </div>
  );

  const second = lastTransactions && (
    <div className="w-full md:w-[30vw] flex flex-col gap-1 justify-center">
      {lastTransactions.map((tx, idx) => {
        return <TransactionListItem key={`tx_${idx}`} transaction={tx} />;
      })}
    </div>
  );

  return <LandingSection first={first} second={second} />;
}
