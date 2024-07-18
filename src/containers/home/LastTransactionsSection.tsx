"use client";

import { MyTransactionRecord } from "@/app/types";
import TransactionHistoryService from "@/app/services/TransactionHistoryService";
import Header from "@/components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useAppContext } from "@/context/appContext";
import TransactionListItem from "@/components/dashboard/TransactionListItem";
import TransactionsLoading from "@/app/dashboard/transactions/history/TransactionsLoading";

export default function LastTransactionsSection() {
  const [lastTransactions, setLastTransactions] = useState<
    MyTransactionRecord[]
  >([]);

  useEffect(() => {
    TransactionHistoryService.fetchRecentTransactions().then((records) => {
      setLastTransactions(records);
    });
  }, [lastTransactions]);

  return (
    <div className="bg-tertiary py-12 w-full">
      <div className="flex flex-col gap-8 md:gap-0 md:flex-row h-full w-full">
        {/* Text */}
        <div className="m-auto pl-[5%] md:w-[40%] ">
          <Header>Using the blockchain</Header>
          <div className="tracking-wide leading-7">
            <p>
              All sunk CARBON is accounted for by using the Stellar blockchain
              technology, making it highly transparent that your contribution
              ends up in the right place.
              <br />
              <br /> Check out the most recent transactions on Stellarcarbon.
            </p>
            <Link href="/transactions" className="underline text-sm">
              View the full list here
            </Link>
          </div>
        </div>

        {/* Transaction list */}
        <>
          {lastTransactions && (
            <div className="mx-2 md:flex-1 md:max-w-[60%] min-h-[400px] flex flex-col items-center justify-center gap-1">
              {lastTransactions.map((tx, idx) => {
                return (
                  <TransactionListItem
                    key={`tx_${idx}`}
                    onClick={() => {}}
                    transaction={tx}
                  />
                );
              })}
            </div>
          )}
        </>
      </div>
    </div>
  );
}
