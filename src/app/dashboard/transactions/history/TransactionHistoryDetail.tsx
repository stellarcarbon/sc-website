"use client";

import TransactionHistoryService from "@/app/services/TransactionHistoryService";
import { DEV_ACCOUNT } from "@/app/types";
import Button from "@/components/Button";
import { useAppContext } from "@/context/appContext";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import TransactionsLoading from "./TransactionsLoading";
import { useSwipeable } from "react-swipeable";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";

interface TransactionHistoryDetailProps {
  hash: string;
}

export default function TransactionHistoryDetail({
  hash,
}: TransactionHistoryDetailProps) {
  const router = useRouter();
  const { myTransactions, setMyTransactions } = useAppContext();

  useEffect(() => {
    // Load the transactions for this page on mount if not loaded yet.
    if (myTransactions === null) {
      const transactionHistoryService = new TransactionHistoryService();
      transactionHistoryService
        // .fetchAccountHistory(walletConnection?.stellarPubKey!)1
        .fetchAccountHistory(DEV_ACCOUNT)
        .then((transactionRecords): void => {
          setMyTransactions(transactionRecords);
        });
    }
  }, [myTransactions, setMyTransactions]);

  const tx = useMemo(() => {
    console.log(myTransactions);
    return myTransactions?.find((tx) => tx.id === hash);
  }, [myTransactions, hash]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      router.push("/dashboard");
    },
    onSwipedRight: () => router.push("/dashboard/transactions"),
    delta: 100,
  });

  if (myTransactions === null) {
    return (
      <div {...swipeHandlers} className="flex-1 flex flex-col justify-center">
        <TransactionsLoading />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 border border-tertiary bg-secondary rounded m-4">
      <div className="h-12 px-4 flex items-center border-b-tertiary">
        <Button
          onClick={() => router.push("/dashboard/transactions/history/")}
          className="flex gap-1 items-center bg-accent text-primary rounded border !h-6 !py-[2px] !px-[6px] w-fit"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          {/* <span>Back to list</span> */}
        </Button>
        <h1 className="flex-1 text-center text-xl font-bold">
          Transaction Details
        </h1>
      </div>

      {tx === undefined ? (
        <div className="flex flex-col text-center justify-center flex-1 p-4 gap-4">
          <span>Could not find transaction with hash:</span>
          <span className="text-xs break-words w-full">{hash}</span>
        </div>
      ) : (
        <>
          {/* <span className="break-words text-xs self-center text-center max-w-[80vw] my-2 border-b">
            {tx.id}
          </span> */}
          <div className="flex flex-col px-4 gap-0">
            <div className="flex justify-between items-center gap-6">
              <span className="text-md font-bold flex-1">Hash</span>
              <span className="text-xs break-words min-w-1 text-right">
                {tx.id}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-md font-bold flex-1">Date</span>
              <span className="text-sm">
                {new Date(tx.createdAt).toDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-md font-bold flex-1">Sunk</span>
              <div className="flex gap-1 items-center text-sm">
                <CARBONCurrencyIcon />
                <span>{tx.sinkAmount}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-md font-bold flex-1">Price</span>
              <div className="flex gap-1 text-sm">
                <span>{tx.assetAmount.toFixed(2)}</span>
                <span>{tx.asset}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-md font-bold flex-1">Memo</span>
              <span className="text-sm break-words">{tx.memo}</span>
            </div>
            <a
              href={`https://stellar.expert/explorer/public/tx/${tx.id}`}
              target="_blank"
              className="text-accentSecondary underline mt-3"
            >
              View this transaction on Stellar.expert
            </a>
            <div className="flex flex-col mt-6">
              <span className="text-xl">Retirements in this transaction</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
