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
        <div className="md:flex-1 min-h-[400px] flex flex-col items-center justify-center">
          {lastTransactions ? (
            lastTransactions.map((tx, idx) => {
              return (
                <div
                  key={`tx_${idx}`}
                  className="flex flex-col text-sm bg-primary rounded-md border border-accentSecondary p-2 mx-2 md:mx-0 w-[90%] max-w-[690px] self-center"
                >
                  <div className="flex justify-start items-center">
                    <span className="w-24 md:w-32">Transaction</span>
                    <span className=" truncate max-w-[60%] md:max-w-[100%]">
                      {tx.hash}
                    </span>
                  </div>
                  <div className="flex justify-start items-center">
                    <span className="w-24 md:w-32">Date</span>
                    <span className="">
                      {new Date(tx.createdAt).toDateString()}
                    </span>
                  </div>
                  <div className="flex justify-start items-center">
                    <span className="w-24 md:w-32">Sunk</span>

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
