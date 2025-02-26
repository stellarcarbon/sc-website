import { MyTransactionRecord } from "@/app/types";
import TransactionHistoryService from "@/services/TransactionHistoryService";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TransactionsExplorerDetail() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transaction, setTransaction] = useState<MyTransactionRecord>();

  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");

    if (id === null) return;
    TransactionHistoryService.fetchTransaction(id).then((transactionRecord) => {
      setIsLoading(false);
      setTransaction(transactionRecord);
    });
  }, [searchParams]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {transaction?.id} - {transaction?.assetAmount} {transaction?.asset}
    </div>
  );
}
