import { MyTransactionRecord } from "@/app/types";
import TransactionHistoryService from "@/services/TransactionHistoryService";
import { getSinkTxsForRecipient } from "@stellarcarbon/sc-sdk";
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
  ) => Promise<void>;
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
  const [txData, setTxData] = useState<TransactionHistoryData>(defaultData);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTxData = useCallback(async (): Promise<TransactionHistoryData> => {
    if (!account) return defaultData;
    setLoading(true);

    const response = await getSinkTxsForRecipient({
      path: { recipient_address: account },
    });

    if (response.data === undefined) {
      setLoading(false);
      return defaultData;
    }

    const serializedTransactions =
      TransactionHistoryService.serializeTxsResponse(response.data);

    setLoading(false);

    return {
      myTransactions: serializedTransactions,
      totalSunk: Number(response.data.total_carbon_sunk),
      totalPending: Number(response.data.total_carbon_pending),
      retirementGraceDays: response.data.retirement_grace_days,
    };
  }, [account]);

  async function pollForNewTransaction(
    maxRetries: number = 5,
    delay: number = 800 // delay in milliseconds
  ): Promise<void> {
    if (!account) throw new Error("No account for polling");

    let retries = 0;
    const oldTransactions = txData.myTransactions;

    while (retries < maxRetries) {
      const transactionRecords = await fetchTxData();

      if (hasNewItem(transactionRecords.myTransactions)) {
        setTxData(transactionRecords);
        return;
      }

      // Wait for the specified delay before retrying.
      await new Promise((resolve) => setTimeout(resolve, delay));
      retries++;
    }

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
      setTxData(defaultData);
    } else {
      fetchTxData().then((txData) => {
        setTxData(txData);
      });
    }
  }, [fetchTxData, account]);

  const refetch = useCallback(() => {
    if (account) fetchTxData();
  }, [account, fetchTxData]);

  return {
    myTransactions: txData.myTransactions,
    totalSunk: txData.totalSunk,
    totalPending: txData.totalPending,
    retirementGraceDays: txData.retirementGraceDays,
    loading,
    refetch,
    pollForNewTransaction,
  };
}
