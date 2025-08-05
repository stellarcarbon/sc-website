import TransactionsLoading from "@/components/dashboard/transactions/TransactionsLoading";
import { useAppContext } from "@/context/appContext";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useViewportWidth } from "@/utils";
import { useMemo } from "react";
import TransactionListItem from "./TransactionListItem";
import DashboardHeader from "./DashboardHeader";
import SCLink from "../SCLink";
import SectionHeader from "../SectionHeader";

export default function TransactionSummary() {
  const { myTransactions, walletConnection, totalPending, totalSunk } =
    useAppContext();
  const isWide = useViewportWidth();

  const iconSize = useMemo(() => {
    return isWide ? 20 : 20;
  }, [isWide]);

  const latestTransaction = useMemo(() => {
    if (myTransactions !== null) {
      return myTransactions[0];
    }
  }, [myTransactions]);

  if (myTransactions === null && walletConnection) {
    return (
      <div className="flex-1 flex flex-col justify-center min-h-[250px] md:min-h-[400px]">
        <TransactionsLoading />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-10 px-3 md:px-6 my-6">
        <div>
          <DashboardHeader>Latest transaction</DashboardHeader>

          {latestTransaction ? (
            <TransactionListItem transaction={latestTransaction} />
          ) : (
            <div className="text-start">
              You have not made any transactions yet.
            </div>
          )}
        </div>
      </div>
      <SectionHeader>Sinking stats</SectionHeader>
      <div className="px-3 md:px-6 my-6 flex flex-col gap-10">
        <div>
          <DashboardHeader>CARBON sunk</DashboardHeader>

          <div className="flex flex-col">
            <div className="text-2xl flex gap-4 justify-center items-center">
              <div className="flex gap-1 items-center mt-1 mb-4">
                <span className="font-bold">{totalSunk?.toFixed(3) ?? 0}</span>
                <CARBONCurrencyIcon width={iconSize} height={iconSize} />
              </div>
            </div>

            <span className="text-start">
              The total amount of CARBON tokens sunk with this wallet.
            </span>
          </div>
        </div>

        <div>
          <DashboardHeader>Pending claims</DashboardHeader>

          <div className="flex flex-col">
            <div className="text-2xl flex gap-4 justify-center items-center">
              <div className="flex gap-1 items-center mt-1 mb-4">
                <span className="font-bold">
                  {totalPending?.toFixed(3) ?? 0}
                </span>
                <CARBONCurrencyIcon width={iconSize} height={iconSize} />
              </div>
            </div>

            <span className="text-start">
              The amount of fractional carbon certificates that are still
              pending a certificate claim.{" "}
              <SCLink href="/explain/how-it-works/retirement">
                What does this mean?
              </SCLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
