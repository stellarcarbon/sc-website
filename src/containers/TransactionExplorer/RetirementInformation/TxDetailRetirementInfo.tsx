import { MyTransactionRecord } from "@/app/types";
import RetirementPending from "./RetirementPending";
import RetirementPendingSC from "./RetirementPendingSC";
import RetirementCompleted from "./RetirementCompleted";
import { useMemo } from "react";
import TxDetailCertificates from "./TxDetailCertificates";

export default function TxDetailRetirementInfo({
  transaction,
}: {
  transaction: MyTransactionRecord;
}) {
  const status = useMemo(() => {
    if (transaction.finalized) {
      return "Retired";
    } else {
      if (transaction.retirements.length > 0) {
        return "Partially retired";
      } else {
        return "Pending certificate attribution";
      }
    }
  }, [transaction]);

  return (
    <div className="w-full flex flex-col gap-4 p-2 px-3 md:px-4">
      <div className="grid grid-cols-2">
        <div className="h-10 font-bold items-center inline-flex">Status</div>
        <div className="h-10 text-end items-center inline-flex justify-end">
          {status}
        </div>

        {!transaction.finalized && (
          <>
            <div className="h-10 font-bold inline-flex items-center">
              Time until community retirement
            </div>
            <div className="h-10 text-end inline-flex items-center justify-end">
              89 days 4 hours 42 minutes
            </div>
          </>
        )}

        {transaction.retirements.length > 0 && (
          <>
            <div className="h-10 text-xl mt-4 font-bold inline-flex items-center col-span-2">
              Related certificates
            </div>

            <div className="col-span-2 my-4">
              <TxDetailCertificates transaction={transaction} />
            </div>
          </>
        )}
      </div>
      {/* {transaction.finalized ? (
        <RetirementCompleted transaction={transaction} />
      ) : transaction.sinkAmount % 1 === 0 ? (
        <RetirementPendingSC />
      ) : (
        <RetirementPending transaction={transaction} />
      )} */}
    </div>
  );
}
