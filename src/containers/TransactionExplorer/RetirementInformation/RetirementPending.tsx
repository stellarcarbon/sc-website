import { MyTransactionRecord } from "@/app/types";
import CountDownTimer from "@/components/CountDownTimer";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import SCLink from "@/components/SCLink";
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
    <div>
      <div>
        <div className="mb-4">
          All transactions are eventually coupled to a{" "}
          <SCLink href="/explain/how-it-works/retirement">retirement</SCLink>.
          This transaction will be retired into a certificate when:
        </div>
        <ul className="list-disc ml-4 space-y-2">
          <li>The community retirement timer has passed</li>
          <li className="flex items-center uppercase text-xs tracking-wide">
            or
          </li>
          <li>
            When the recipient of the transaction rounds down their pending
            balance to receive a personal certificate.
          </li>
        </ul>
      </div>

      <CountDownTimer initialDuration={initialDuration} />
    </div>
  );
}
