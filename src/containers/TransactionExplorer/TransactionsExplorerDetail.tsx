import { MyTransactionRecord } from "@/app/types";
import TruncatedHash from "@/components/dashboard/TruncatedHash";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import TransactionHistoryService from "@/services/TransactionHistoryService";
import { useSearchParams } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";
import TxRetirementStatusDetail from "./TxRetirementStatusDetail";
import appConfig from "@/config";
import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import TransactionsLoading from "@/components/dashboard/transactions/TransactionsLoading";

export default function TransactionsExplorerDetail() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transaction, setTransaction] = useState<MyTransactionRecord>();
  const [copied, setCopied] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");

    if (id === null) return;
    TransactionHistoryService.fetchTransaction(id).then((transactionRecord) => {
      setIsLoading(false);
      setTransaction(transactionRecord);
    });
  }, [searchParams]);

  const handleCopy = useCallback(async () => {
    if (transaction === undefined) return;
    try {
      await navigator.clipboard.writeText(transaction.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [transaction]);

  if (isLoading) {
    return (
      <div className="mt-4">
        <TransactionsLoading />
      </div>
    );
  }

  if (transaction === undefined) return;

  return (
    <div className="w-full flex flex-col items-center p-2">
      <div className="grid grid-cols-4 w-full">
        <PropertyKey>ID</PropertyKey>
        <PropertyValue>
          <div className="inline-flex gap-1 items-center">
            {copied ? (
              <div className="text-xs">Copied!</div>
            ) : (
              <div className="" onClick={handleCopy}>
                <FontAwesomeIcon icon={faCopy} />
              </div>
            )}

            <TruncatedHash hash={transaction.id} />
          </div>
        </PropertyValue>

        <PropertyKey>Date</PropertyKey>
        <PropertyValue>{transaction.createdAt}</PropertyValue>

        <PropertyKey>Sunk</PropertyKey>
        <PropertyValue>
          <div className="inline-flex gap-1 items-center">
            {transaction.sinkAmount} <CARBONCurrencyIcon />
          </div>
        </PropertyValue>

        <PropertyKey>Price</PropertyKey>
        <PropertyValue>
          {transaction.assetAmount} {transaction.asset}
        </PropertyValue>

        <PropertyKey>Memo</PropertyKey>
        <PropertyValue>{transaction.memo}</PropertyValue>

        <PropertyKey>Funder</PropertyKey>
        <PropertyValue>
          <TruncatedHash hash={transaction.funder} uppercase />
        </PropertyValue>

        {transaction.funder !== transaction.recipient && (
          <>
            <PropertyKey>Recipient</PropertyKey>
            <PropertyValue>
              <TruncatedHash hash={transaction.recipient} uppercase />
            </PropertyValue>
          </>
        )}
      </div>

      <a
        href={
          appConfig.network === WalletNetwork.PUBLIC
            ? `https://stellar.expert/explorer/public/tx/${transaction.id}`
            : `https://stellar.expert/explorer/testnet/tx/${transaction.id}`
        }
        target="_blank"
        className="text-accentSecondary underline my-6"
      >
        View this transaction on Stellar.expert
      </a>

      <TxRetirementStatusDetail transaction={transaction} />
    </div>
  );
}

function PropertyKey({ children }: { children: ReactNode }) {
  return (
    <div className="col-span-1 h-8 items-center inline-flex">{children}</div>
  );
}

function PropertyValue({ children }: { children: ReactNode }) {
  return (
    <div className="col-span-3 h-8 items-center inline-flex justify-end">
      {children}
    </div>
  );
}
