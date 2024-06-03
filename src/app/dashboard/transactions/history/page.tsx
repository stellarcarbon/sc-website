"use client";

import TransactionHistoryService from "@/app/services/TransactionHistoryService";
import { DEV_ACCOUNT } from "@/app/types";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useAppContext } from "@/context/appContext";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Blocks } from "react-loader-spinner";
import { useSwipeable } from "react-swipeable";
import TransactionHistoryDetail from "./TransactionHistoryDetail";
import TransactionsLoading from "./TransactionsLoading";

export default function PendingRetirements() {
  const { myTransactions, setMyTransactions } = useAppContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Load the transactions for this page on mount if not loaded yet.
    if (myTransactions === null) {
      const transactionHistoryService = new TransactionHistoryService();
      transactionHistoryService
        // .fetchAccountHistory(walletConnection?.stellarPubKey!)1
        .fetchAccountHistory(DEV_ACCOUNT)
        .then((transactionRecords): void => {
          setMyTransactions(transactionRecords);
        });
    }
  }, [myTransactions, setMyTransactions]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      router.push("/dashboard");
    },
    onSwipedRight: () => router.push("/dashboard/transactions"),
    delta: 100,
  });

  if (searchParams.get("hash") !== null) {
    return <TransactionHistoryDetail hash={searchParams.get("hash")!} />;
  }

  if (myTransactions === null) {
    return (
      <div {...swipeHandlers} className="flex-1 flex flex-col justify-center">
        <TransactionsLoading />
      </div>
    );
  } else if (myTransactions.length === 0) {
    return (
      <div
        {...swipeHandlers}
        className="mx-2 text-center flex-1 flex flex-col justify-center"
      >
        <span>
          Looks like this Stellar account does not have any transactions yet.
          <br />
          <br />
          After{" "}
          <Link
            className="underline text-accentSecondary"
            href="/dashboard/sink"
          >
            sinking CARBON
          </Link>{" "}
          you can view your transaction(s) here.
        </span>
      </div>
    );
  } else {
    return (
      <div {...swipeHandlers} className="px-2 flex flex-col items-center pb-8">
        <div className="flex flex-col justify-center h-12 self-start px-2">
          <span className="text-sm">This is your transaction history.</span>
        </div>

        <div className="flex flex-col gap-1 w-full">
          {myTransactions.map((transaction) => {
            return (
              <Link
                // href={`https://stellar.expert/explorer/public/tx/${transaction.id}`}
                href={`/dashboard/transactions/history/?hash=${transaction.id}`}
                // target="_blank"
                // onClick={() => {
                //   router.push(`/wallet/transaction/${transaction.id}`);
                // }}
                className="flex flex-col text-sm bg-secondary rounded-md  border-accentSecondary p-2 w-full "
                key={`payment_${transaction.id}`}
              >
                <div className="flex justify-start items-center">
                  <span className="w-20 md:w-32">Hash</span>
                  <span className=" truncate max-w-[60%]">
                    {transaction.id}
                  </span>
                </div>
                <div className="flex justify-start items-center">
                  <span className="w-20 md:w-32">Date</span>
                  <span className="">
                    {new Date(transaction.createdAt).toDateString()}
                  </span>
                </div>
                <div className="flex justify-start items-center">
                  <span className="w-20 md:w-32">Sunk</span>

                  <div className="flex items-center gap-1">
                    <CARBONCurrencyIcon />
                    <span>{transaction.sinkAmount?.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-start items-center">
                  <span className="w-20 md:w-32">Price</span>

                  <div className="flex gap-1 ">
                    <span>{transaction.assetAmount?.toFixed(2)}</span>
                    <span>{transaction.asset}</span>
                  </div>
                </div>

                <div className="flex justify-start items-center">
                  <span className="w-20 md:w-32">Memo</span>

                  <span className=" truncate max-w-[60%]">
                    {transaction.memo}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}
