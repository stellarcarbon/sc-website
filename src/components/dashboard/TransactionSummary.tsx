import TransactionsLoading from "@/components/dashboard/transactions/TransactionsLoading";
import { useAppContext } from "@/context/appContext";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useViewportWidth } from "@/utils";
import { useMemo } from "react";
import TransactionListItem from "./TransactionListItem";
import DashboardHeader from "./DashboardHeader";
import SCLink from "../SCLink";
import TruncatedHash from "./TruncatedHash";

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
    <div className="flex flex-col mb-4">
      {walletConnection && (
        <div className="flex flex-col w-full justify-start px-3 md:px-6 my-6">
          <div
            className="flex items-center gap-2 p-2
          bg-primary border rounded border-accentSecondary"
          >
            <div className="flex items-center gap-2">
              <img className="h-4 w-4" src={walletConnection.walletType.icon} />

              <div>{walletConnection.walletType.name}</div>
            </div>

            <div className="text-xs italic text-white break-all flex-1 text-end">
              <TruncatedHash hash={walletConnection?.stellarPubKey} uppercase />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center my-8 mb-12">
        <div className="flex items-center text-5xl gap-1">
          <span>{totalSunk?.toFixed(3) ?? 0}</span>
          <CARBONCurrencyIcon width={36} height={36} />
        </div>
        <div className="mt-1">
          The total carbon-sinking impact of this wallet
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-2 px-3 md:px-4 mb-8">
          <DashboardHeader>Latest transaction</DashboardHeader>

          {latestTransaction ? (
            <TransactionListItem transaction={latestTransaction} />
          ) : (
            <div className="text-start text-tertiary italic">
              {walletConnection
                ? "You have not made any transactions yet."
                : "No wallet connected."}
            </div>
          )}
        </div>

        {walletConnection && (
          <div className="px-3 md:px-4 my-6 flex flex-col gap-10">
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
        )}
      </div>
    </div>
  );
}
