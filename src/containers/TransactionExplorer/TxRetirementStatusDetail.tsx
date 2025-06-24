import { MyTransactionRecord, RetirementStatus } from "@/app/types";
import CountDownTimer from "@/components/CountDownTimer";
import RetiredTransaction from "@/components/dashboard/transactions/RetiredTransaction";
import { useMemo } from "react";

export default function TxRetirementStatusDetail({
  transaction,
}: {
  transaction: MyTransactionRecord;
}) {
  const initialDuration = useMemo(() => {
    if (transaction !== undefined) {
      const txDatePlus90 = transaction.createdAt.addDays(90); // TODO: Make this the actual 90 days
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
    p-4 lg:px-8 w-full lg:w-auto
    flex flex-col items-center"
    >
      {/* <div className="flex justify-between items-center w-full text-xl font-semibold p-2">
        <div className="">Retirement status:</div>
        <span>{transaction.retirementStatus}</span>
      </div> */}

      <div className="text-sm text-center">{statusMessage}</div>

      {transaction?.retirementStatus === RetirementStatus.PENDING_USER &&
        initialDuration !== undefined && (
          <div className="my-4">
            <CountDownTimer initialDuration={initialDuration} />
          </div>
        )}
    </div>
  );
}
