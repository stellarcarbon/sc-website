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

export default function LastTransactionsSection() {
  const [lastTransactions, setLastTransactions] = useState<
    MyTransactionRecord[]
  >([]);

  useEffect(() => {
    TransactionHistoryService.fetchRecentTransactions().then((records) => {
      setLastTransactions(records);
    });
  }, []);

  return (
    <div className="bg-secondary py-12 w-full border-y border-y-secondary px-3 md:px-[5%]">
      <div className="flex flex-col gap-8 md:gap-0 md:flex-row md:items-center h-full w-full">
        {/* Text */}
        <div className="md:w-[50%]">
          <Header>Using the blockchain</Header>

          <Paragraph>
            All sunk CARBON is accounted for by using the Stellar blockchain
            technology, making it highly transparent that your contribution ends
            up in the right place.
            <br />
            <br /> Check out the most recent transactions on Stellarcarbon.
          </Paragraph>
          <Paragraph>
            <Link href="/transactions" className="underline text-sm">
              View the full list in our transaction explorer
            </Link>
          </Paragraph>
        </div>

        {/* Transaction list */}
        <>
          {lastTransactions && (
            <div className="mx-3 md:flex-1 flex justify-end">
              <div className="w-full md:w-[30vw] flex flex-col gap-1 justify-center">
                {lastTransactions.map((tx, idx) => {
                  return (
                    <TransactionListItem key={`tx_${idx}`} transaction={tx} />
                  );
                })}
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
}
