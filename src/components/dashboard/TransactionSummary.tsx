import TransactionsLoading from "@/components/dashboard/transactions/TransactionsLoading";
import { useAppContext } from "@/context/appContext";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useViewportWidth } from "@/utils";
import { useMemo } from "react";
import TransactionListItem from "./TransactionListItem";
import SCLink from "../SCLink";
import TruncatedHash from "./TruncatedHash";

export default function TransactionSummary() {
  const { myTransactions, walletConnection, totalSunk, totalPending } =
    useAppContext();
  const isWide = useViewportWidth();

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
    <div className="flex flex-col mb-16 md:mb-24 gap-8 mt-4">
      {walletConnection && (
        <div className="flex flex-col w-full justify-start px-3 md:px-4">
          <div
            className="flex items-center gap-2 p-2
           border rounded border-primary"
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

      <div className="px-3 md:px-4">
        <div className="rounded-2xl  border-tertiary backdrop-blur p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Carbon Sunk */}
            <div
              className={`${
                totalPending <= 0 && "md:col-span-2"
              } flex flex-col items-center text-center gap-3`}
            >
              <div className="text-xl font-medium uppercase tracking-widest text-gray-300">
                Carbon Sunk
              </div>
              <div className="flex items-center text-5xl font-bold text-white gap-3">
                <span>{totalSunk?.toFixed(3) ?? 0}</span>
                <CARBONCurrencyIcon width={44} height={44} />
              </div>
              <div className="text-sm text-gray-400">
                The total impact of this wallet.
              </div>
            </div>

            {/* Pending Claims */}
            {totalPending > 0 && (
              <div className="flex flex-col items-center text-center gap-3">
                <div className="text-sm font-medium uppercase tracking-widest text-gray-300">
                  Pending claims
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-5xl font-bold">
                    {totalPending.toFixed(3) ?? 0}
                  </span>
                  <CARBONCurrencyIcon width={44} height={44} />
                </div>
                <span className="text-sm text-gray-400">
                  You have pending claims.{" "}
                  <SCLink href="/explain/how-it-works/retirement">
                    What does this mean?
                  </SCLink>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {walletConnection && (
        <div className="flex flex-col items-center gap-4 px-3 md:px-12">
          {/* <DashboardHeader>Latest transaction</DashboardHeader> */}

          <div className="text-xl font-medium uppercase tracking-widest text-gray-300">
            Latest transaction
          </div>

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
      )}
    </div>
  );
}
