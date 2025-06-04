"use client";

import { MyTransactionRecord } from "@/app/types";
import TransactionHistoryService from "@/services/TransactionHistoryService";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type TransactionExplorerContext = {
  transactions: MyTransactionRecord[];
  setTransactions: Dispatch<SetStateAction<MyTransactionRecord[]>>;

  goToNextPage: () => Promise<void>;
  goToPreviousPage: () => Promise<void>;

  error: string | undefined;
  isLoading: boolean;

  cursor: string | undefined;
  limit: number;
  setLimit: (limit: number) => void;
};

const TransactionExplorerContext =
  createContext<TransactionExplorerContext | null>(null);

export const useTransactionExplorerContext = () => {
  const context = useContext(TransactionExplorerContext);
  if (context === null) {
    throw Error("No TransactionExplorerContext available");
  }
  return context;
};

export const TransactionExplorerContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [transactions, setTransactions] = useState<MyTransactionRecord[]>([]);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

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

  const cursor = useMemo(() => {
    return searchParams.get("cursor") ?? undefined;
  }, [searchParams]);

  const limit = useMemo(() => {
    return Number(searchParams.get("limit") ?? 5);
  }, [searchParams]);

  const order = useMemo(() => {
    return (searchParams.get("order") as "asc" | "desc") ?? "desc";
  }, [searchParams]);

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);

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
  }, [setIsLoading, cursor, limit, order]);

  const goToNextPage = useCallback(async () => {
    const cursorNext = transactions[transactions.length - 1].pagingToken;

    updateSearchParams(cursorNext, "desc");
  }, [transactions, updateSearchParams]);

  const goToPreviousPage = useCallback(async () => {
    const cursorPrev = transactions[0].pagingToken;

    updateSearchParams(cursorPrev, "asc");
  }, [transactions, updateSearchParams]);

  const setLimit = useCallback(
    (newLimit: number) => {
      updateSearchParams(cursor, order, newLimit);
    },
    [updateSearchParams, cursor, order]
  );

  useEffect(() => {
    if (!pathname.includes("detail")) fetchTransactions();
  }, [fetchTransactions, pathname]);

  const providerValue = useMemo(() => {
    return {
      transactions,
      setTransactions,
      goToNextPage,
      goToPreviousPage,
      error,
      isLoading,
      cursor,
      limit,
      setLimit,
    };
  }, [
    transactions,
    goToNextPage,
    goToPreviousPage,
    error,
    isLoading,
    cursor,
    limit,
    setLimit,
  ]);

  return (
    <TransactionExplorerContext.Provider value={providerValue}>
      {children}
    </TransactionExplorerContext.Provider>
  );
};
