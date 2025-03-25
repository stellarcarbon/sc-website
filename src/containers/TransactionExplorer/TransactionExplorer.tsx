"use client";

import TransactionListItem from "@/components/dashboard/TransactionListItem";
import TransactionsLoading from "@/components/dashboard/transactions/TransactionsLoading";
import { useSCRouter } from "@/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useTransactionExplorerContext } from "@/context/TransactionExplorerContext";
import IconButton from "@/components/IconButton";

export default function TransactionExplorer({}) {
  const router = useSCRouter();

  const {
    transactions,
    error,
    isLoading,
    goToNextPage,
    goToPreviousPage,
    cursor,
    limit,
    setLimit,
  } = useTransactionExplorerContext();

  const onSelectLimit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    setLimit(selectedValue);
  };

  if (isLoading)
    return (
      <div className="mt-4 flex flex-col items-center">
        <TransactionsLoading />
      </div>
    );

  return (
    <div className="flex flex-col items-center h-full">
      <div className="w-full flex justify-between items-center gap-1 my-4 px-4 !text-xs">
        <div className="flex items-center gap-4">
          <IconButton
            onClick={goToPreviousPage}
            className="!text-sm"
            disabled={cursor === null || transactions.length === 0}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </IconButton>
          <IconButton
            onClick={goToNextPage}
            className="!text-sm"
            disabled={transactions.length === 0}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </IconButton>
          <IconButton
            onClick={() => router.push(`/transactions?limit=${limit}`)}
            className="!w-16 !text-sm"
          >
            Reset
          </IconButton>
        </div>

        <div className="flex items-center gap-2 rounded p-1 px-2">
          <div className="text-sm">Show rows</div>
          <select
            onChange={onSelectLimit}
            className="bg-accent text-black border border-tertiary rounded p-1 h-8 text-base"
            value={limit}
          >
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
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
