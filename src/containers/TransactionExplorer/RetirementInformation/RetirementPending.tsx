import { MyTransactionRecord, RetirementStatus } from "@/app/types";
import CountDownTimer from "@/components/CountDownTimer";
import Link from "next/link";
import { useMemo } from "react";

export default function RetirementPending({
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
    } else {
      return 0;
    }
  }, [transaction]);

  return (
    <div className="flex flex-col gap-4 text-sm p-2">
      {/* <h1 className="text-lg font-bold">{RetirementStatus.PENDING_USER}</h1> */}
      <div className="grid grid-cols-5 text-base h-10">
        <div className="font-bold items-center inline-flex">Status</div>
        <div className="col-span-4 text-end items-center inline-flex justify-end">
          {RetirementStatus.PENDING_USER}
        </div>
      </div>

      {/* <div>
        This fractional retirement is pending certificate attribution. Users can
        optionally create a personal certificate by rounding their transactions
        up or down.
      </div> */}
      {/* <div>
        Fractional transactions automatically retire after a period of 90 days.
      </div> */}

      <CountDownTimer initialDuration={initialDuration} />
      <div className="text-center my-2">
        All transactions are eventually coupled to a retirement. Find out more
        about the retirement process{" "}
        <Link href="/explain" className="underline text-accentSecondary">
          here
        </Link>
        .
      </div>
    </div>
  );
}
