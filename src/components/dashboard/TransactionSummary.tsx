import TransactionsLoading from "@/components/dashboard/transactions/TransactionsLoading";
import { useAppContext } from "@/context/appContext";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import Link from "next/link";
import { useViewportWidth } from "@/utils";
import { useMemo } from "react";
import { RetirementStatus } from "@/app/types";
import TransactionListItem from "./TransactionListItem";
import { useRouter } from "next/navigation";

export default function TransactionSummary() {
  const { myTransactions } = useAppContext();
  const isWide = useViewportWidth();
  const router = useRouter();

  const iconSize = useMemo(() => {
    return isWide ? 22 : 18;
  }, [isWide]);

  const latestTransaction = useMemo(() => {
    if (myTransactions !== null) {
      return myTransactions[0];
    }
  }, [myTransactions]);

  const totalSinked = useMemo(() => {
    if (myTransactions !== null) {
      return myTransactions.reduce((acc, tx) => acc + tx.sinkAmount, 0);
    }
  }, [myTransactions]);

  const totalPending = useMemo(() => {
    if (myTransactions !== null) {
      return myTransactions
        .filter(
          (tx) =>
            tx.retirementStatus === RetirementStatus.PENDING_USER ||
            tx.retirementStatus === RetirementStatus.PENDING_STELLARCARBON
        )
        .reduce((acc, tx) => acc + tx.sinkAmount, 0);
    }
  }, [myTransactions]);

  return (
    <div className="mx-4 md:mx-8 mt-6 flex flex-col gap-8">
      {myTransactions === null ? (
        <div className="flex-1 flex flex-col justify-center min-h-[250px] md:min-h-[400px]">
          <TransactionsLoading />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-1 text-sm">
            <div className="text-xl md:text-2xl font-bold flex gap-4 justify-between items-center border-b border-tertiary mb-2">
              <span className="text-lg md:text-xl">Latest transaction</span>
            </div>
            {latestTransaction ? (
              <TransactionListItem
                transaction={latestTransaction}
                onClick={() => {
                  router.push(
                    `/dashboard/transactions/history/?id=${latestTransaction.id}`
                  );
                }}
              />
            ) : (
              <div>You have not made any transactions yet.</div>
            )}
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <div className="text-xl md:text-2xl font-bold flex gap-4 justify-between items-center border-b border-b-tertiary">
              <span className="text-lg md:text-xl">Total sinked</span>
              <div className="flex gap-1 items-center text-accent">
                <span className="font-normal">{totalSinked?.toFixed(3)}</span>
                <CARBONCurrencyIcon width={iconSize} height={iconSize} />
              </div>
            </div>

            <span className="text-xs md:text-sm mt-2">
              This is the total amount of CARBON tokens that have been sinked
              using this wallet.
            </span>
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <div className="text-xl md:text-2xl font-bold flex gap-4 justify-between items-center border-b border-b-tertiary">
              <span className="text-lg md:text-xl">
                Pending certificate claims
              </span>
              <div className="flex gap-1 items-center text-accent">
                <span className="font-normal">{totalPending?.toFixed(3)}</span>
                <CARBONCurrencyIcon width={iconSize} height={iconSize} />
              </div>
            </div>

            <span className="text-xs md:text-sm mt-2">
              The amount of fractional carbon certificates that are still
              pending a certificate claim.{" "}
              <Link className="underline text-accentSecondary" href="">
                What does this mean?
              </Link>
            </span>
          </div>
        </>
      )}
    </div>
  );
}
