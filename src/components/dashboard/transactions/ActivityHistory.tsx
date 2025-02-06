import { useAppContext } from "@/context/appContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import TransactionDetail from "@/components/dashboard/transactions/TransactionDetail";
import TransactionsLoading from "@/components/dashboard/transactions/TransactionsLoading";
import { useSCRouter } from "@/app/utils";
import TransactionListItem from "@/components/dashboard/TransactionListItem";
import { useEffect, useMemo, useState } from "react";
import TransactionHistoryService from "@/services/TransactionHistoryService";
import { RetirementStatus } from "@/app/types";

export default function ActivityHistory() {
  const { myTransactions, setMyTransactions, walletConnection } =
    useAppContext();
  const router = useSCRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Reload personal transactions on page visit
    TransactionHistoryService.fetchAccountHistory(
      walletConnection?.stellarPubKey!
    ).then((transactionRecords): void => {
      setMyTransactions(transactionRecords);
      setIsLoading(false);
    });
  }, [setMyTransactions, walletConnection]);

  const retiredTransactions = useMemo(() => {
    return (
      myTransactions?.filter(
        (tx) => tx.retirementStatus === RetirementStatus.RETIRED
      ) ?? []
    );
  }, [myTransactions]);

  if (searchParams.get("hash") !== null) {
    return <TransactionDetail hash={searchParams.get("hash")!} />;
  }

  if (isLoading || myTransactions === null) {
    return (
      <div className="flex-1 flex flex-col justify-center">
        <TransactionsLoading />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center flex-1">
        <div className="my-12 mx-4 md:mx-8 flex flex-col items-center">
          {/* <DashboardTitle>Retired transactions</DashboardTitle> */}

          <span className="text-sm text-center md:w-[60%] bg-darker p-4 border rounded border-tertiary">
            Here you can find the transactions that have been retired into one
            or more certificates. Click on them to find out more details about
            the transaction and its corresponding certificate(s).
          </span>
        </div>

        {/* <Divider className="my-8 md:my-12" /> */}

        {retiredTransactions.length === 0 ? (
          <div className="mx-4 text-center flex-1 flex flex-col justify-start gap-6 md:gap-16 text-sm">
            <span className="text-lg">No retired transactions found.</span>

            <div className="flex flex-col gap-2 md:gap-6">
              <span>
                Maybe your transaction is{" "}
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
          </div>
        ) : (
          <div className="p-2 flex flex-col gap-2 w-full mb-6">
            {retiredTransactions.map((transaction, index) => (
              <TransactionListItem
                key={`txlistitem_${index}`}
                transaction={transaction}
                onClick={() => {
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
