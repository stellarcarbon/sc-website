"use client";

import TransactionListItem from "@/components/dashboard/TransactionListItem";
import Button from "@/components/Button";
import TransactionsLoading from "@/components/dashboard/transactions/TransactionsLoading";
import { useSCRouter } from "@/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useTransactionExplorerContext } from "@/context/TransactionExplorerContext";
import IconButton from "@/components/IconButton";

export default function TransactionHistory({}) {
  const router = useSCRouter();

  const { transactions, error, isLoading, goToNextPage, goToPreviousPage } =
    useTransactionExplorerContext();

  if (isLoading)
    return (
      <div className="mt-4">
        <TransactionsLoading />
      </div>
    );

  return (
    <div className="flex flex-col items-center h-full">
      <div className="w-full flex justify-between items-center gap-1 my-4 px-4 !text-xs">
        <IconButton onClick={goToPreviousPage} className="!text-sm">
          <FontAwesomeIcon icon={faArrowLeft} />
        </IconButton>
        <IconButton
          onClick={() => router.push("/transactions/explorer")}
          className="!w-16 !text-sm"
        >
          Reset
        </IconButton>
        <IconButton onClick={goToNextPage} className="!text-sm">
          <FontAwesomeIcon icon={faArrowRight} />
        </IconButton>
      </div>
      <div className="w-full overflow-auto px-2 flex flex-col gap-1">
        {!error ? (
          transactions.length > 1 ? (
            transactions.map((tx, idx) => {
              return (
                <TransactionListItem
                  key={`tx_${idx}`}
                  transaction={tx}
                  bgPrimary
                  onClick={() => {
                    router.push(`/transactions/explorer/detail/?id=${tx.id}`);
                  }}
                />
              );
            })
          ) : (
            <div className="w-full flex flex-col items-center justify-center gap-6">
              <span>No more records found.</span>
            </div>
          )
        ) : (
          <div className="flex justify-center text-red-500">{error}</div>
        )}
      </div>
    </div>
  );
}
