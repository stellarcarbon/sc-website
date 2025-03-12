import { MyTransactionRecord, RetirementStatus } from "@/app/types";
import { RetirementDetail } from "@/client";
import CountDownTimer from "@/components/CountDownTimer";
import RetiredTransaction from "@/components/dashboard/transactions/RetiredTransaction";
import RetirementDetailCard from "@/components/dashboard/transactions/RetirementDetailCard";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Blocks } from "react-loader-spinner";

export default function TxRetirementStatusDetail({
  transaction,
}: {
  transaction: MyTransactionRecord;
}) {
  const initialDuration = useMemo(() => {
    if (transaction !== undefined) {
      const txDate = new Date(transaction.createdAt);
      const txDatePlus90 = txDate.addDays(90); // TODO: Make this the actual 90 days
      const now = new Date();

      const outcome = +txDatePlus90 - +now;

      return outcome / 1000;
    }
  }, [transaction]);

  let statusMessage;
  if (transaction.retirementStatus === RetirementStatus.PENDING_USER) {
    statusMessage = (
      <div className="flex flex-col gap-4">
        <div>
          This fractional retirement is pending certificate attribution.
          {/* Users can optionally create a personal certificate by rounding their
          transactions up or down. */}
        </div>
        <div>
          Fractional transactions automatically retire after a period of 90
          days.
        </div>
      </div>
    );
  } else if (
    transaction.retirementStatus === RetirementStatus.PENDING_STELLARCARBON
  ) {
    statusMessage =
      "This transaction is waiting for the Stellarcarbon team to finalize the retirement.";
  } else if (transaction.retirementStatus === RetirementStatus.RETIRED) {
    statusMessage = <RetiredTransaction transaction={transaction} />;
  }

  return (
    <div
      className="bg-primary border border-accentSecondary rounded
    p-2 lg:px-8 w-full lg:w-auto
    flex flex-col items-center"
    >
      <h1 className="text-xl font-semibold py-2">Retirement status</h1>

      <div className="text-sm text-center my-2">{statusMessage}</div>

      {transaction?.retirementStatus === RetirementStatus.PENDING_USER &&
        initialDuration !== undefined && (
          <div className="my-4">
            <CountDownTimer initialDuration={initialDuration} />
          </div>
        )}
    </div>
  );
}
