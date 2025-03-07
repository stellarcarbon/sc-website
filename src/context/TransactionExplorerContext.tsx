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

  const fetchTransactions = useCallback(async () => {
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
    if (!pathname.includes("detail")) fetchTransactions();
  }, [fetchTransactions]);

  const providerValue = useMemo(() => {
    return {
      transactions,
      setTransactions,
      goToNextPage,
      goToPreviousPage,
      error,
      isLoading,
    };
  }, [transactions, goToNextPage, goToPreviousPage, error, isLoading]);

  return (
    <TransactionExplorerContext.Provider value={providerValue}>
      {children}
    </TransactionExplorerContext.Provider>
  );
};
