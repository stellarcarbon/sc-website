import { MyTransactionRecord } from "@/app/types";
import TruncatedHash from "@/components/dashboard/TruncatedHash";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import TransactionHistoryService from "@/services/TransactionHistoryService";
import { useSearchParams } from "next/navigation";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import appConfig from "@/config";
import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import TransactionsLoading from "@/components/dashboard/transactions/TransactionsLoading";
import { formatDate } from "@/utils";
import RetirementInformation from "./RetirementInformation/RetirementInformation";

export default function TransactionsExplorerDetail() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transaction, setTransaction] = useState<MyTransactionRecord>();
  const [copiedID, setCopiedID] = useState(false);
  const [copiedFunder, setCopiedFunder] = useState(false);
  const [copiedRecipient, setCopiedRecipient] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");

    if (id === null) return;
    TransactionHistoryService.fetchTransaction(id).then((transactionRecord) => {
      setIsLoading(false);
      setTransaction(transactionRecord);
    });
  }, [searchParams]);

  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setTimeout(() => {
        setCopiedID(false);
        setCopiedFunder(false);
        setCopiedRecipient(false);
      }, 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  const price = useMemo(() => {
    const amount = transaction?.assetAmount;
    if (amount && amount >= 0.1) {
      return amount.toFixed(2);
    } else if (amount) {
      return amount?.toFixed(7);
    }
  }, [transaction]);

  if (isLoading) {
    return (
      <div className="mt-4 flex flex-col items-center w-full">
        <TransactionsLoading />
      </div>
    );
  }

  if (transaction === undefined) return;

  const copyID = () => {
    setCopiedID(true);
    handleCopy(transaction.id);
  };

  const copyFunder = () => {
    setCopiedFunder(true);
    handleCopy(transaction.funder);
  };

  const copyRecipient = () => {
    setCopiedRecipient(true);
    handleCopy(transaction.recipient);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="grid grid-cols-5 w-full p-2">
        <PropertyKey>ID</PropertyKey>
        <PropertyValue>
          {copiedID ? (
            <div className="text-xs">Copied!</div>
          ) : (
            <div className="cursor-pointer" onClick={copyID}>
              <FontAwesomeIcon icon={faCopy} />
            </div>
          )}

          <TruncatedHash hash={transaction.id} />
        </PropertyValue>

        <PropertyKey>Date</PropertyKey>
        <PropertyValue>{formatDate(transaction.createdAt)}</PropertyValue>

        <PropertyKey>Sunk</PropertyKey>
        <PropertyValue>
          <div className="inline-flex gap-1 items-center">
            {transaction.sinkAmount} <CARBONCurrencyIcon />
          </div>
        </PropertyValue>

        <PropertyKey>Reason</PropertyKey>
        <PropertyValue>{transaction.memo ?? "N/A"}</PropertyValue>

        {/* <PropertyKey>Status</PropertyKey>
        <PropertyValue>Pending certificate attribution</PropertyValue> */}
      </div>

      {/* <hr className="w-[95%] my-0 border-tertiary" /> */}
      <div className="bg-primary h-12 flex items-center justify-center w-full font-bold">
        Payment details
      </div>

      <div className="grid grid-cols-5 w-full p-2">
        <PropertyKey>Price</PropertyKey>
        <PropertyValue>
          {price} {transaction.asset}
        </PropertyValue>

        <PropertyKey>Paid by</PropertyKey>
        <PropertyValue>
          {copiedFunder ? (
            <div className="text-xs">Copied!</div>
          ) : (
            <div className="cursor-pointer" onClick={copyFunder}>
              <FontAwesomeIcon icon={faCopy} />
            </div>
          )}
          <TruncatedHash hash={transaction.funder} uppercase />
        </PropertyValue>

        <PropertyKey>Recipient</PropertyKey>
        <PropertyValue>
          {copiedRecipient ? (
            <div className="text-xs">Copied!</div>
          ) : (
            <div className="cursor-pointer" onClick={copyRecipient}>
              <FontAwesomeIcon icon={faCopy} />
            </div>
          )}
          <TruncatedHash hash={transaction.recipient} uppercase />
        </PropertyValue>

        <a
          href={
            appConfig.network === WalletNetwork.PUBLIC
              ? `https://stellar.expert/public/tx/${transaction.id}`
              : `https://stellar.expert/testnet/tx/${transaction.id}`
          }
          target="_blank"
          className="text-accentSecondary underline my-4 col-span-5 text-center"
        >
          View this transaction on Stellar.expert
        </a>

        {/* <hr className="col-span-5 my-3" /> */}
      </div>

      <RetirementInformation transaction={transaction} />
    </div>
  );
}

function PropertyKey({ children }: { children: ReactNode }) {
  return (
    <div className="col-span-1 h-10 items-center inline-flex font-semibold">
      {children}
    </div>
  );
}

function PropertyValue({ children }: { children: ReactNode }) {
  return (
    <div className="col-span-4 h-10 items-center inline-flex justify-end gap-1">
      {children}
    </div>
  );
}
