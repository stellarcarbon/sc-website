"use client";

import TransactionListItem from "@/components/dashboard/TransactionListItem";
import { MyTransactionRecord } from "@/app/types";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TransactionHistoryService from "@/services/TransactionHistoryService";
import Button from "@/components/Button";
import TransactionsLoading from "@/components/dashboard/transactions/TransactionsLoading";
import { useSCRouter } from "@/utils";
import Link from "next/link";

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

  // if (isLoading) return <TransactionsLoading />;

  return (
    <>
      {!error ? (
        <div className="w-full flex-1 flex flex-col items-center lg:w-[700px] overflow-hidden">
          <div className="w-full flex justify-between items-center my-4 px-4 !text-xs">
            <Button onClick={goToPreviousPage}>Previous page</Button>
            <Button onClick={() => router.push("/transactions/explorer")}>
              Go back to start
            </Button>
            <Button onClick={goToNextPage}>Next page</Button>
          </div>
          <div className="w-full flex-1 overflow-auto p-4 flex flex-col items-center gap-1 bg-darker lg:bg-secondary">
            {transactions.length > 1 && !isLoading ? (
              transactions.map((tx, idx) => {
                return (
                  <TransactionListItem
                    key={`tx_${idx}`}
                    transaction={tx}
                    bgPrimary
                  />
                );
              })
            ) : isLoading ? (
              <TransactionsLoading />
            ) : (
              <div className="w-full flex flex-col items-center justify-center gap-6">
                <span>No more records found.</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center text-red-500">{error}</div>
      )}
    </>
  );
}
