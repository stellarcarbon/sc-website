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
import ParallaxDivider, {
  ParallaxBackgrounds,
} from "@/components/ParallaxDivider";

export default function ActivityHistory() {
  const { myTransactions, setMyTransactions, walletConnection } =
    useAppContext();
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
  } else {
    return (
      <div {...swipeHandlers} className="flex flex-col items-center flex-1">
        <div className="flex flex-col justify-center self-start px-6 my-8">
          <span className="text-sm text-center">
            Here you can find the transactions that have been retired into one
            or more certificates. Click on them to find out more details about
            the transaction and its corresponding certificate(s).
          </span>
        </div>

        <ParallaxDivider image={ParallaxBackgrounds.FOREST} smallest />

        {myTransactions.length === 0 ? (
          <div className="mx-4 my-12 text-center flex-1 flex flex-col justify-center gap-6 md:gap-16 text-sm">
            <span className="text-lg">No retired transactions found.</span>

            <div className="flex flex-col gap-2 md:gap-6">
              <span>
                Maybe you already made a transaction that is{" "}
                <Link
                  href="/dashboard/transactions"
                  className="underline text-accentSecondary"
                >
                  pending retirement
                </Link>
              </span>
              <span className="text-xs">or...</span>
              <span>
                Create a{" "}
                <Link
                  href="/dashboard/sink"
                  className="underline text-accentSecondary"
                >
                  new sinking transaction
                </Link>{" "}
                to contribute to the Stellarcarbon initiative.
              </span>
            </div>

            {/* <span>
              Looks like this Stellar account does not have any retired
              transactions yet.
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
            </span> */}
          </div>
        ) : (
          <div className="p-2 flex flex-col gap-2 w-full">
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
        )}
      </div>
    );
  }
}
