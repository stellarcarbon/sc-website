import { MyTransactionRecord } from "@/app/types";
import { AccountService, SinkTxListResponse } from "@/client";
import TransactionHistoryService from "@/services/TransactionHistoryService";
import { useCallback, useEffect, useState } from "react";

type TransactionHistoryData = {
  myTransactions: MyTransactionRecord[];
  totalSunk: number;
  totalPending: number;
  retirementGraceDays: number;
};

interface TransactionData {
  myTransactions: MyTransactionRecord[];
  totalSunk: number;
  totalPending: number;
  retirementGraceDays: number;
}

interface UseMyTransactionsResult extends TransactionData {
  loading: boolean;

  refetch: () => void;
  pollForNewTransaction: (
    maxRetries?: number,
    delayMs?: number
  ) => Promise<MyTransactionRecord[]>;
}

const defaultData: TransactionHistoryData = {
  myTransactions: [],
  totalSunk: 0,
  totalPending: 0,
  retirementGraceDays: 7,
};

export function useTransactionHistory(
  account?: string
): UseMyTransactionsResult {
  const [data, setData] = useState<TransactionHistoryData>(defaultData);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    if (!account) return;
    setLoading(true);

    const sinkTxsResponse: SinkTxListResponse =
      await AccountService.getSinkTxsForRecipient({
        recipientAddress: account,
      });

    const serializedTransactions =
      TransactionHistoryService.serializeTxsResponse(sinkTxsResponse);

    setData({
      myTransactions: serializedTransactions,
      totalSunk: Number(sinkTxsResponse.total_carbon_sunk),
      totalPending: Number(sinkTxsResponse.total_carbon_pending),
      retirementGraceDays: sinkTxsResponse.retirement_grace_days,
    });

    setLoading(false);
  }, [account]);

  async function pollForNewTransaction(
    maxRetries: number = 5,
    delay: number = 1000 // delay in milliseconds
  ): Promise<MyTransactionRecord[]> {
    if (!account) throw new Error("No account for polling");

    let retries = 0;
    const oldTransactions = data.myTransactions;

    while (retries < maxRetries) {
      const transactionRecords =
        await TransactionHistoryService.fetchAccountHistory(account);

      if (hasNewItem(transactionRecords)) {
        return transactionRecords;
      }

      // Wait for the specified delay before retrying.
      await new Promise((resolve) => setTimeout(resolve, delay));
      retries++;
    }

    throw new Error("Max retries reached without detecting a new transaction");

    function hasNewItem(records: MyTransactionRecord[]): boolean {
      if (oldTransactions.length > 0) {
        const newerTx = records.find((tx) => {
          return (
            Number(tx.pagingToken) > Number(oldTransactions[0].pagingToken)
          );
        });

        if (newerTx === undefined) return false;
      }
      return true;
    }
  }

  useEffect(() => {
    if (!account) {
      setData(defaultData);
    } else {
      fetchData();
    }
  }, [fetchData, account]);

  const refetch = useCallback(() => {
    if (account) fetchData();
  }, [account, fetchData]);

  return {
    myTransactions: data.myTransactions,
    totalSunk: data.totalSunk,
    totalPending: data.totalPending,
    retirementGraceDays: data.retirementGraceDays,
    loading,
    refetch,
    pollForNewTransaction,
  };
}
