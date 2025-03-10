"use client";

import { RetirementStatus } from "@/app/types";
import ParallaxDivider, {
  ParallaxBackgrounds,
} from "@/components/ParallaxDivider";
import TransactionListItem from "@/components/dashboard/TransactionListItem";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useAppContext } from "@/context/appContext";
import { useEffect, useMemo } from "react";
import RoundingService from "@/services/RoundingService";
import DashboardTitle from "../DashboardTitle";
import PendingRetirementsInfo from "./PendingRetirementsInfo";
import { useRouter } from "next/navigation";

export default function PendingRetirements() {
  const { myTransactions, walletConnection, setHasPendingRounding } =
    useAppContext();
  const router = useRouter();

  const pendingTransactions = useMemo(() => {
    if (myTransactions === null) {
      return [];
    }
    return myTransactions.filter(
      (tx) =>
        tx.retirementStatus === RetirementStatus.PENDING_USER ||
        tx.retirementStatus === RetirementStatus.PENDING_STELLARCARBON
    );
  }, [myTransactions]);

  useEffect(() => {
    // Check pending rounding status upon rendering this page
    if (walletConnection) {
      RoundingService.hasPendingRounding(walletConnection.stellarPubKey).then(
        (isPending) => setHasPendingRounding(isPending)
      );
    }
  }, [setHasPendingRounding, walletConnection]);

  const totalCarbonPending = useMemo(() => {
    return (
      pendingTransactions?.reduce((sum, tx) => sum + tx.sinkAmount, 0) ?? 0
    );
  }, [pendingTransactions]);

  return (
    <>
      <div className="w-full px-4 flex flex-col">
        <div className="mt-12 md:mt-12 flex flex-col items-center">
          <DashboardTitle>Pending retirements balance</DashboardTitle>
          <div className="flex items-center justify-center gap-3 text-[48px] mb-8">
            <span>{totalCarbonPending.toFixed(3)}</span>
            <CARBONCurrencyIcon width={40} height={40} />
          </div>
          <PendingRetirementsInfo totalCarbonPending={totalCarbonPending} />
        </div>
      </div>

      <div className="flex-1 flex flex-col px-4 w-full pt-12 pb-12">
        <div className="flex-1 flex flex-col gap-6">
          {pendingTransactions?.length ?? 0 > 0 ? (
            <>
              <DashboardTitle>Your pending transactions</DashboardTitle>

              {pendingTransactions?.map((transaction, index) => {
                return (
                  <TransactionListItem
                    key={transaction.id}
                    transaction={transaction}
                    onClick={() =>
                      router.push(
                        `/dashboard/transactions/history/?hash=${transaction.id}`
                      )
                    }
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
    </>
  );
}
