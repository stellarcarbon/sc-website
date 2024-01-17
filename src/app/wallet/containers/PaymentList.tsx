"use client";

import Button from "@/app/components/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context/appContext";
import { MyTransactionRecord } from "../TransactionHistoryService";

export default function PaymentList() {
  const { myTransactions } = useAppContext();

  const [transactionRecords, setTransactionRecords] = useState<
    MyTransactionRecord[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <div className="text-accent m-2 flex flex-col gap-2">
      <h1 className="flex flex-col text-lg font-bold text-center">
        <span>Transaction history</span>
        <span className="text-xs break-words w-[80%] self-center">{`For account (dev-mode): GC53JCXZHW3SVNRE4CT6XFP46WX4ACFQU32P4PR3CU43OB7AKKMFXZ6Y`}</span>
      </h1>
      {!isLoading ? (
        myTransactions.length === 0 ? (
          <div className="flex flex-col items-center m-4 gap-2">
            <span className=" text-sm text-center">
              {`Looks like you don't have any transactions yet. After sinking
              carbon you can view your history here.`}
            </span>
          </div>
        ) : (
          myTransactions.map((transaction) => {
            return (
              <div
                onClick={() => {
                  router.push(`/wallet/transaction/${transaction.id}`);
                }}
                className="flex flex-col text-sm text-accent bg-tertiary rounded-md border border-accentSecondary p-2 "
                key={`payment_${transaction.id}`}
              >
                <div className="flex justify-between">
                  <span>Hash</span>
                  <span className="text-xs truncate max-w-[60%]">
                    {transaction.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Date</span>
                  <span>{new Date(transaction.createdAt).toDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount sinked</span>

                  <span>{transaction.sinkAmount?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price</span>

                  <div className="flex gap-1">
                    <span>{transaction.assetAmount?.toFixed(2)}</span>
                    <span>{transaction.asset}</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span>Memo</span>

                  <span className="text-xs truncate max-w-[60%]">
                    {transaction.memo}
                  </span>
                </div>
              </div>
            );
          })
        )
      ) : (
        <div className="text-center py-4">Loading blockchain data...</div>
      )}
    </div>
  );
}
