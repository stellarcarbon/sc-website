import SuccessIcon from "@/components/icons/SuccessIcon";
import SinkingStep from "./Step";
import ModalHeader from "@/components/ModalHeader";
import SinkingStepButtons from "./Buttons";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { MyTransactionRecord } from "@/app/types";
import TransactionHistoryService from "@/services/TransactionHistoryService";
import { useAppContext } from "@/context/appContext";

export default function CompletedSinking() {
  const { walletConnection, myTransactions, setMyTransactions } =
    useAppContext();

  const router = useRouter();

  const onFinish = useCallback(() => {
    pollForNewTransaction(
      myTransactions ?? [],
      walletConnection?.stellarPubKey!
    ).then((transactionRecords): void => {
      setMyTransactions(transactionRecords);
    });

    router.push("/dashboard");
  }, [myTransactions, walletConnection, router, setMyTransactions]);

  return (
    <SinkingStep title="Transaction succesful">
      <div className="mt-6 text-center">
        <div className="text-lg font-semibold">
          Your transaction was succesfully committed to the Stellar blockchain.
        </div>

        <div className="mt-4">Review the transaction on your dashboard!</div>
      </div>

      <div className="flex-1 flex items-center justify-center my-16">
        <SuccessIcon />
      </div>

      <SinkingStepButtons>
        <Button onClick={onFinish} className="mx-auto">
          Go back
        </Button>
      </SinkingStepButtons>
    </SinkingStep>
  );
}

async function pollForNewTransaction(
  oldTransactions: MyTransactionRecord[],
  walletPubKey: string,
  maxRetries: number = 5,
  delay: number = 1000 // delay in milliseconds
): Promise<MyTransactionRecord[]> {
  let retries = 0;

  while (retries < maxRetries) {
    const transactionRecords =
      await TransactionHistoryService.fetchAccountHistory(walletPubKey);

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
        return Number(tx.pagingToken) > Number(oldTransactions[0].pagingToken);
      });

      if (newerTx === undefined) return false;
    }
    return true;
  }
}
