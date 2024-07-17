import TransactionsLoading from "@/app/dashboard/transactions/history/TransactionsLoading";
import { useAppContext } from "@/context/appContext";
import CARBONCurrencyIcon from "../icons/CARBONCurrencyIcon";
import Link from "next/link";
import { useViewportWidth } from "@/app/utils";
import { useMemo } from "react";

export default function TransactionSummary() {
  const { myTransactions } = useAppContext();
  const isWide = useViewportWidth();

  const iconSize = useMemo(() => {
    return isWide ? 22 : 18;
  }, [isWide]);

  return (
    <div className="mx-4 md:mx-8 flex flex-col gap-8  border-tertiary ">
      {myTransactions === null ? (
        <div className="flex-1 flex flex-col justify-center min-h-[250px] md:min-h-[400px]">
          <TransactionsLoading />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-1 text-sm">
            <div className="text-xl md:text-2xl font-bold flex gap-4 justify-between items-center border-b border-tertiary">
              <span className="text-lg md:text-2xl">Latest transaction</span>
              <div className="flex gap-1 items-center text-accent">
                <span className="font-normal">2</span>
                <CARBONCurrencyIcon width={iconSize} height={iconSize} />
              </div>
            </div>

            <span className="text-xs md:text-sm mt-2">
              Created on 01-01-2001 with memo: {`"ENVIRONMENT"`}
            </span>
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <div className="text-xl md:text-2xl font-bold flex gap-4 justify-between items-center border-b border-b-tertiary">
              <span className="text-lg md:text-2xl">Total sinked</span>
              <div className="flex gap-1 items-center text-accent">
                <span className="font-normal">25</span>
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
              <span className="text-lg md:text-2xl">
                Pending certificate claims
              </span>
              <div className="flex gap-1 items-center text-accent">
                <span className="font-normal">1.55</span>
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
