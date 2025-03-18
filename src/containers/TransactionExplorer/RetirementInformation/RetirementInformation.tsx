import { MyTransactionRecord, RetirementStatus } from "@/app/types";
import Link from "next/link";
import RetirementPending from "./RetirementPending";
import RetirementPendingSC from "./RetirementPendingSC";
import RetirementCompleted from "./RetirementCompleted";

export default function RetirementInformation({
  transaction,
}: {
  transaction: MyTransactionRecord;
}) {
  return (
    <div className="w-full mb-6">
      <h2 className="font-bold bg-primary h-12 flex items-center justify-center">
        Retirement information
      </h2>

      {/* <div className="grid grid-cols-5 my-4">
        <div className="">Status</div>
        <div className="col-span-4 text-end font-bold">
          {transaction.retirementStatus}
        </div>
      </div> */}

      {transaction.retirementStatus === RetirementStatus.PENDING_USER && (
        <RetirementPending transaction={transaction} />
      )}

      {transaction.retirementStatus ===
        RetirementStatus.PENDING_STELLARCARBON && <RetirementPendingSC />}

      {transaction.retirementStatus === RetirementStatus.RETIRED && (
        <RetirementCompleted transaction={transaction} />
      )}
    </div>
  );
}
