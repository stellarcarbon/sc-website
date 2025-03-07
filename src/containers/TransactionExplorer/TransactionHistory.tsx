"use client";

import TransactionListItem from "@/components/dashboard/TransactionListItem";
import { MyTransactionRecord } from "@/app/types";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TransactionHistoryService from "@/services/TransactionHistoryService";
import Button from "@/components/Button";
import TransactionsLoading from "@/components/dashboard/transactions/TransactionsLoading";
import { useSCRouter } from "@/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function TransactionHistory({}) {
  const searchParams = useSearchParams();
  const router = useSCRouter();

  const [transactions, setTransactions] = useState<MyTransactionRecord[]>([]);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const updateSearchParams = useCallback(
    (cursor?: string, order?: "asc" | "desc", limit?: number) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      if (cursor !== undefined) newSearchParams.set("cursor", cursor);

      if (limit !== undefined) newSearchParams.set("limit", limit.toString());

      if (order !== undefined) newSearchParams.set("order", order);

      router.replace(`?${newSearchParams}`, { scroll: false });
    },
    [router, searchParams]
  );

  const fetchTransactions = useCallback(async () => {
    console.log("nu");
    setIsLoading(true);
    let cursor: string | undefined = undefined;
    if (searchParams.get("cursor") !== null) {
      cursor = searchParams.get("cursor")!;
    }

    let limit: number = 5;
    if (searchParams.get("limit") !== null) {
      limit = Number(searchParams.get("limit"));
    }

    let order: "asc" | "desc" = "desc";
    if (searchParams.get("order") !== null) {
      order = searchParams.get("order") as "asc" | "desc";
    }

    try {
      const txs = await TransactionHistoryService.fetchLedger(
        cursor,
        limit,
        order
      );

      setTransactions(txs);
    } catch (e: any) {
      const msg = e.body.detail[0]?.msg;
      setError(msg);
    }
    setIsLoading(false);
  }, [searchParams, setIsLoading]);

  const goToNextPage = useCallback(async () => {
    const cursorNext = transactions[transactions.length - 1].pagingToken;

    updateSearchParams(cursorNext, "desc");
  }, [transactions, updateSearchParams]);

  const goToPreviousPage = useCallback(async () => {
    const cursorPrev = transactions[0].pagingToken;

    updateSearchParams(cursorPrev, "asc");
  }, [transactions, updateSearchParams]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  if (isLoading)
    return (
      <div className="mt-4">
        <TransactionsLoading />
      </div>
    );

  return (
    <div className="flex flex-col items-center gap-2 h-full">
      <div className="w-full flex justify-between items-center gap-1 my-2 px-4 !text-xs">
        <Button onClick={goToPreviousPage}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <Button onClick={() => router.push("/transactions/explorer")}>
          Reset
        </Button>
        <Button onClick={goToNextPage}>
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>
      <div className="w-full overflow-auto p-2 flex flex-col gap-1">
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
