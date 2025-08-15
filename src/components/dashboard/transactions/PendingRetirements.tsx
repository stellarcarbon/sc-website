"use client";

import TransactionListItem from "@/components/dashboard/TransactionListItem";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useAppContext } from "@/context/appContext";
import { useEffect, useMemo } from "react";
import RoundingService from "@/services/RoundingService";
import DashboardTitle from "../DashboardTitle";
import PendingRetirementsInfo from "./PendingRetirementsInfo";
import DashboardHeader from "../DashboardHeader";

export default function PendingRetirements() {
  const {
    myTransactions,
    walletConnection,
    setHasPendingRounding,
    totalPending,
  } = useAppContext();

  const pendingTransactions = useMemo(() => {
    if (myTransactions === null) {
      return [];
    }
    return myTransactions.filter((tx) => !tx.finalized);
  }, [myTransactions]);

  useEffect(() => {
    // Check pending rounding status upon rendering this page
    if (walletConnection) {
      RoundingService.hasPendingRounding(walletConnection.stellarPubKey).then(
        (isPending) => setHasPendingRounding(isPending)
      );
    }
  }, [setHasPendingRounding, walletConnection]);

  return (
    <div className="bg-darkest w-full">
      <div className="px-4 flex flex-col">
        <div className="mt-12 md:mt-12 flex flex-col items-center">
          {/* <DashboardTitle>Pending retirements balance</DashboardTitle> */}
          <div className="text-lg font-medium uppercase tracking-widest text-gray-300">
            Pending retirements balance
          </div>
          <div className="flex items-center justify-center gap-3 text-[48px] mb-8 font-bold">
            <span>{totalPending.toFixed(3)}</span>
            <CARBONCurrencyIcon width={44} height={44} />
          </div>
          <PendingRetirementsInfo />
        </div>
      </div>

      <div className="flex-1 flex flex-col px-4 w-full pt-12 pb-12">
        {pendingTransactions?.length > 0 && (
          <DashboardHeader>Your pending transactions</DashboardHeader>
        )}
        <div className="flex-1 flex flex-col gap-1">
          {pendingTransactions?.length ?? 0 > 0 ? (
            <>
              {pendingTransactions?.map((transaction, index) => {
                return (
                  <TransactionListItem
                    key={transaction.id}
                    transaction={transaction}
                    showCountdown
                  />
                );
              })}
            </>
          ) : (
            <div className="flex-1 flex flex-col justify-center text-center text-sm">
              No pending transactions found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
