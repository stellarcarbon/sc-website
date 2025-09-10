"use client";

import TransactionListItem from "@/components/dashboard/TransactionListItem";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useAppContext } from "@/context/appContext";
import { useEffect, useMemo } from "react";
import RoundingService from "@/services/RoundingService";
import DashboardTitle from "../DashboardTitle";
import PendingRetirementsInfo from "./PendingRetirementsInfo";
import DashboardHeader from "../DashboardHeader";
import SCLink from "@/components/SCLink";
import SectionHeader from "@/components/SectionHeader";

export default function PendingRetirements() {
  const {
    myTransactions,
    walletConnection,
    setHasPendingRounding,
    totalPending,
    retirementGraceDays,
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
    <div className="bg-darkest w-full flex-1 flex flex-col gap-8">
      <div className="px-4 flex flex-col">
        <div className="mt-12 md:mt-12 flex flex-col items-center">
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

      <div className="flex flex-col w-full">
        {pendingTransactions?.length > 0 && (
          <SectionHeader>Your pending transactions</SectionHeader>
        )}
        <div className="p-4 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div>
              Any pending transactions will automatically <SCLink 
                href="/explain/how-it-works/retirement">
                retire
              </SCLink> into the community pool
              after <div className="font-bold inline">
                {retirementGraceDays}
              </div> days, which means you can no longer obtain a personal 
              certificate. If you want to request a personal certificate you 
              have to do so before this period ends.
            </div>

            <div>
              The link between your transaction and its retirement is always
              preserved, also for community certificates.
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center gap-1 mb-12 md:px-4">
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
  );
}
