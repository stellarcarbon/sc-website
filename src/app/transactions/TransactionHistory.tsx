"use client";

import TransactionListItem from "@/components/dashboard/TransactionListItem";
import { MyTransactionRecord } from "../types";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TransactionHistoryService from "../services/TransactionHistoryService";
import Button from "@/components/Button";
import { ApiError } from "@/client";
import TransactionsLoading from "../dashboard/transactions/history/TransactionsLoading";
import { useSCRouter } from "../utils";

interface TransactionHistoryProps {}

export default function TransactionHistory({}) {
  const searchParams = useSearchParams();
  const router = useSCRouter();

  const [transactions, setTransactions] = useState<MyTransactionRecord[]>([]);
  const [error, setError] = useState<string>();

  const updateSearchParams = useCallback(
    (cursor?: string, order?: "asc" | "desc", limit?: number) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      if (cursor !== undefined) newSearchParams.set("cursor", cursor);

      if (limit !== undefined) newSearchParams.set("limit", limit.toString());

      if (order !== undefined) newSearchParams.set("order", order);

      router.replace(`?${newSearchParams}`, { scroll: false });
      console.log("!!");
    },
    [router, searchParams]
  );

  const fetchTransactions = useCallback(async () => {
    console.log(searchParams.get("cursor"));

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

    // const order = (searchParams.get("order") ?? "desc") as "asc" | "desc";

    // console.log("fetching with limit: ", limit);

    try {
      const txs = await TransactionHistoryService.fetchLedger(
        cursor,
        limit,
        order
      );

      setTransactions(txs);
      console.log(txs);
    } catch (e: any) {
      const msg = e.body.detail[0]?.msg;
      setError(msg);
    }
  }, [searchParams]);

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

  return (
    <>
      {!error ? (
        <div className="flex flex-col items-center">
          <div className="w-full py-8 flex flex-col gap-1">
            {transactions.length > 1 ? (
              transactions.map((tx, idx) => {
                return (
                  <TransactionListItem
                    key={`tx_${idx}`}
                    onClick={() => {}}
                    transaction={tx}
                    bgPrimary
                  />
                );
              })
            ) : (
              <TransactionsLoading />
            )}
          </div>
          <div className="w-full px-4 md:px-12 flex justify-between">
            <Button onClick={goToPreviousPage} className="!text-sm">
              Previous page
            </Button>
            <Button onClick={goToNextPage} className="!text-sm">
              Next page
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center text-red-500">{error}</div>
      )}
    </>
  );
}
