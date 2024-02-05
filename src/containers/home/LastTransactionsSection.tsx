"use client";

import { FrontpageTransactionRecord } from "@/app/types";
import TransactionHistoryService from "@/app/wallet/TransactionHistoryService";
import Header from "@/components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LastTransactionsSection() {
  const txHistoryService = new TransactionHistoryService();
  const [lastTransactions, setLastTransactions] =
    useState<FrontpageTransactionRecord[]>();

  useEffect(() => {
    txHistoryService.fetchRecentTransactions().then((txRecords): void => {
      setLastTransactions(txRecords);
    });
  }, []);

  return (
    <div className="bg-tertiary py-12 w-full">
      <div className="flex flex-col gap-8 md:gap-0 md:flex-row h-full">
        <div className="md:flex-1 m-auto md:pl-[10%] max-w-[80%] md:max-w-[50%]">
          <Header>Recent transactions</Header>
          <div className="tracking-wide leading-7">
            <p>Check out the most recent transactions on Stellarcarbon.</p>
            <Link href="/transactions" className="underline text-sm">
              View the full list here
            </Link>
          </div>
        </div>

        <div className="md:flex-1 min-h-[400px] flex flex-col justify-center">
          {lastTransactions ? (
            lastTransactions.map((tx, idx) => {
              return (
                <div
                  key={`tx_${idx}`}
                  className="flex flex-col text-sm bg-primary rounded-md border border-accentSecondary p-2 mx-2 md:mx-0 w-[90%] self-center md:self-start md:max-w-[40vw]"
                >
                  <div className="flex justify-start items-center">
                    <span className="w-24 md:w-32">Account</span>
                    <span className=" truncate max-w-[60%]">{tx.pubkey}</span>
                  </div>
                  <div className="flex justify-start items-center">
                    <span className="w-24 md:w-32">Date</span>
                    <span className="">
                      {new Date(tx.createdAt).toDateString()}
                    </span>
                  </div>
                  <div className="flex justify-start items-center">
                    <span className="w-24 md:w-32">Sinked</span>

                    <span className="">{tx.sinkAmount?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-start items-center">
                    <span className="w-24 md:w-32">Memo</span>

                    <span className=" truncate max-w-[60%]">{tx.memo}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-xl self-center font-bold">
              Loading transaction history...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
