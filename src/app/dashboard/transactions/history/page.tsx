"use client";

import TransactionHistoryService from "@/app/services/TransactionHistoryService";
import { DEV_ACCOUNT } from "@/app/types";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useAppContext } from "@/context/appContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Blocks } from "react-loader-spinner";
import { useSwipeable } from "react-swipeable";

export default function PendingRetirements() {
  const { myTransactions, setMyTransactions } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    // Load the transactions for this dash on mount if not loaded yet.
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

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      router.push("/dashboard");
    },
    onSwipedRight: () => router.push("/dashboard/transactions"),
    delta: 100,
  });

  if (myTransactions === null) {
    return (
      <div
        {...swipeHandlers}
        className="mx-2 text-center flex-1 flex flex-col justify-center items-center"
      >
        <Blocks
          height="80"
          width="80"
          color="#ff0000"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          visible={true}
        />
        <span>Fetching your transaction history...</span>
      </div>
    );
  } else if (myTransactions.length === 0) {
    return (
      <div
        {...swipeHandlers}
        className="mx-2 text-center flex-1 flex flex-col justify-center"
      >
        <span>
          Looks like this Stellar account does not have any transactions yet.
          <br />
          <br />
          After{" "}
          <Link
            className="underline text-accentSecondary"
            href="/dashboard/sink"
          >
            sinking CARBON
          </Link>{" "}
          you can view your transaction(s) here.
        </span>
      </div>
    );
  } else {
    return (
      <div
        {...swipeHandlers}
        className="px-2 flex flex-col items-center gap-2 pt-4 pb-8"
      >
        {myTransactions.map((transaction) => {
          return (
            <a
              href={`https://stellar.expert/explorer/public/tx/${transaction.id}`}
              target="_blank"
              // onClick={() => {
              //   router.push(`/wallet/transaction/${transaction.id}`);
              // }}
              className="flex flex-col text-sm bg-secondary rounded-md  border-accentSecondary p-2 mx-2 w-full "
              key={`payment_${transaction.id}`}
            >
              <div className="flex justify-start items-center">
                <span className="w-20 md:w-32">Hash</span>
                <span className=" truncate max-w-[60%]">{transaction.id}</span>
              </div>
              <div className="flex justify-start items-center">
                <span className="w-20 md:w-32">Date</span>
                <span className="">
                  {new Date(transaction.createdAt).toDateString()}
                </span>
              </div>
              <div className="flex justify-start items-center">
                <span className="w-20 md:w-32">Sunk</span>

                <div className="flex items-center gap-1">
                  <CARBONCurrencyIcon />
                  <span>{transaction.sinkAmount?.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-start items-center">
                <span className="w-20 md:w-32">Price</span>

                <div className="flex gap-1 ">
                  <span>{transaction.assetAmount?.toFixed(2)}</span>
                  <span>{transaction.asset}</span>
                </div>
              </div>

              <div className="flex justify-start items-center">
                <span className="w-20 md:w-32">Memo</span>

                <span className=" truncate max-w-[60%]">
                  {transaction.memo}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    );
  }
}
