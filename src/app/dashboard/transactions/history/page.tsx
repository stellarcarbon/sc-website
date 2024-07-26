"use client";

import { useAppContext } from "@/context/appContext";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSwipeable } from "react-swipeable";
import TransactionHistoryDetail from "./TransactionHistoryDetail";
import TransactionsLoading from "./TransactionsLoading";
import { useSCRouter } from "@/app/utils";
import TransactionListItem from "@/components/dashboard/TransactionListItem";
import { useEffect, useState } from "react";
import { CarbonService, SinkService } from "@/client";
import TransactionHistoryService from "@/app/services/TransactionHistoryService";
import { DEV_ACCOUNT } from "@/app/types";

export default function ActivityHistory() {
  const { myTransactions, setMyTransactions } = useAppContext();
  const router = useSCRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      router.push("/dashboard");
    },
    onSwipedRight: () => router.push("/dashboard/transactions"),
    delta: 100,
  });

  useEffect(() => {
    // Reload personal transactions on page visit

    TransactionHistoryService.fetchAccountHistory(
      // walletConnection?.stellarPubKey!
      DEV_ACCOUNT
    ).then((transactionRecords): void => {
      setMyTransactions(transactionRecords);
      setIsLoading(false);
    });
  }, [setMyTransactions]);

  if (searchParams.get("hash") !== null) {
    return <TransactionHistoryDetail hash={searchParams.get("hash")!} />;
  }

  if (isLoading || myTransactions === null) {
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
          {myTransactions.map((transaction, index) => (
            <TransactionListItem
              key={`txlistitem_${index}`}
              transaction={transaction}
              onClick={() => {
                console.log("click");
                router.push(
                  `/dashboard/transactions/history/?hash=${transaction.id}`
                );
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}
