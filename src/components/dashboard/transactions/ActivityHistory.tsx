import { useAppContext } from "@/context/appContext";
import TransactionsLoading from "@/components/dashboard/transactions/TransactionsLoading";
import TransactionListItem from "@/components/dashboard/TransactionListItem";
import { useMemo, useState } from "react";
import { RetirementStatus } from "@/app/types";
import SCLink from "@/components/SCLink";

export default function ActivityHistory() {
  const { myTransactions } = useAppContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const retiredTransactions = useMemo(() => {
    return (
      myTransactions?.filter(
        (tx) => tx.retirementStatus === RetirementStatus.RETIRED
      ) ?? []
    );
  }, [myTransactions]);

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

          <span className="text-sm text-center md:w-[80%] bg-primary p-4 border rounded border-tertiary">
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
                <SCLink href="/dashboard/transactions">
                  pending retirement
                </SCLink>
              </span>
              <span className="text-xs">or...</span>
              <span className="mb-8">
                Create a{" "}
                <SCLink href="/dashboard/sink">new sinking transaction</SCLink>{" "}
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
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
