import { MyTransactionRecord } from "@/app/types";
import { useMemo } from "react";
import TxDetailCertificates from "./TxDetailCertificates";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import TxDetailCountdown from "./TxDetailCountDown";

export default function TxDetailRetirementInfo({
  transaction,
}: {
  transaction: MyTransactionRecord;
}) {
  const status = useMemo(() => {
    if (transaction.finalized) {
      return "Fully retired";
    } else {
      if (transaction.retirements.length > 0) {
        return "Partially retired";
      } else {
        return "Not retired yet";
      }
    }
  }, [transaction]);

  const filledAmount = useMemo(() => {
    return transaction.retirements.reduce((total, item) => {
      const amt = parseFloat(item.amount_filled);
      return total + (isNaN(amt) ? 0 : amt);
    }, 0);
  }, [transaction]);

  return (
    <div className="w-full flex flex-col gap-4 p-2 px-3 md:px-4">
      <div className="grid grid-cols-2 gap-4 mb-8">
        {status === "Fully retired" && (
          <>
            <div className="h-10 font-bold items-center inline-flex">
              Status
            </div>
            <div className="h-10 text-end items-center inline-flex justify-end gap-1">
              {status}
            </div>
          </>
        )}

        {status === "Partially retired" && (
          <>
            <div className="h-10 font-bold items-center inline-flex">
              Status
            </div>
            <div className="h-10 text-end items-center inline-flex justify-end gap-1">
              {status}
            </div>
            <div className="h-10 font-bold items-center inline-flex">
              Amount filled
            </div>
            <div className="h-10 text-end items-center inline-flex justify-end gap-1">
              <span>{filledAmount}</span>
              <CARBONCurrencyIcon width={14} height={14} />
            </div>
            <div className="h-10 font-bold items-center inline-flex">
              Amount pending
            </div>
            <div className="h-10 text-end items-center inline-flex justify-end gap-1">
              <span>{(transaction.sinkAmount - filledAmount).toFixed(3)}</span>
              <CARBONCurrencyIcon width={14} height={14} />
            </div>
            <div className="h-10 font-bold inline-flex items-center">
              Time until community retirement
            </div>
            <div className="h-10 text-end inline-flex items-center justify-end">
              <TxDetailCountdown transaction={transaction} />
            </div>
          </>
        )}

        {status === "Not retired yet" && (
          <>
            <div className="h-10 font-bold inline-flex items-center">
              Sink status
            </div>
            <div className="h-10 text-end inline-flex items-center justify-end">
              {status}
            </div>
            <div className="h-10 font-bold inline-flex items-center">
              Time until community retirement
            </div>
            <div className="h-10 text-end inline-flex items-center justify-end">
              <TxDetailCountdown transaction={transaction} />
            </div>
          </>
        )}

        {transaction.retirements.length > 0 && (
          <>
            <div className="h-10 text-xl font-bold inline-flex items-center col-span-2">
              Related certificates
            </div>

            <div className="col-span-2">
              <TxDetailCertificates transaction={transaction} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
