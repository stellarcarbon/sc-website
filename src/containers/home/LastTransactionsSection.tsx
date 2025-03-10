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

  const router = useRouter();

  useEffect(() => {
    TransactionHistoryService.fetchRecentTransactions().then((records) => {
      setLastTransactions(records);
    });
  }, []);

  return (
    <div className="bg-tertiary py-12 w-full border-y border-y-secondary px-[5%] ">
      <div className="flex flex-col gap-8 md:gap-0 md:flex-row h-full w-full">
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
          <Link href="/transactions" className="underline text-sm">
            View the full list here
          </Link>
        </div>

        {/* Transaction list */}
        <>
          {lastTransactions && (
            <div className="mx-2 md:flex-1 flex justify-end">
              <div className="w-full md:w-[30vw] flex flex-col gap-1">
                {lastTransactions.map((tx, idx) => {
                  return (
                    <TransactionListItem
                      key={`tx_${idx}`}
                      onClick={() => {
                        router.push(
                          `/transactions/explorer/detail/?id=${tx.id}`
                        );
                      }}
                      transaction={tx}
                    />
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
