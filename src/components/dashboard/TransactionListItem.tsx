import { MyTransactionRecord, RetirementStatus } from "@/app/types";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import CountDownTimer from "@/components/CountDownTimer";
import { PropsWithChildren, useMemo } from "react";
import { useRouter } from "next/navigation";
import TruncatedHash from "./TruncatedHash";
import { formatDate } from "@/utils";

interface TransactionListItemProps {
  transaction: MyTransactionRecord;
  showCountdown?: boolean;
  disabled?: boolean;
}

export default function TransactionListItem({
  transaction,
  showCountdown = false,
  disabled = false,
}: TransactionListItemProps) {
  const router = useRouter();

  const initialDuration = useMemo(() => {
    const txDatePlus90 = transaction.createdAt.addDays(90); // TODO: Make this the actual 90 days
    const now = new Date();

    const outcome = +txDatePlus90 - +now;

    return outcome / 1000;
  }, [transaction]);

  let formattedDate = formatDate(transaction.createdAt);

  const onClick = () => {
    if (!disabled) router.push(`/transactions/detail/?id=${transaction.id}`);
  };

  return (
    <div
      onClick={onClick}
      className={`w-full max-w-[95vw]
  bg-darkest border border-accentSecondary rounded
  ${disabled ? "" : "cursor-pointer"}
  p-2
  flex flex-col gap-1`}
    >
      <div className="flex items-center justify-between text-xs">
        <div>
          {/* <ItemKey>Transaction ID</ItemKey> */}
          <TruncatedHash hash={transaction.id} />
        </div>
        <div className="text-end">
          {/* <ItemKey>Created at</ItemKey> */}
          <div>{formattedDate}</div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 mt-1 text-lg">
        <div>
          <ItemKey>Sink amount</ItemKey>
          <div className="flex items-center gap-1">
            <CARBONCurrencyIcon />
            <span>{transaction.sinkAmount?.toFixed(3)}</span>
          </div>
        </div>

        <div className="flex flex-col items-end truncate">
          <ItemKey>Memo</ItemKey>
          {transaction.memo ? (
            <div className="text-white">{transaction.memo}</div>
          ) : (
            <div className="text-tertiary">No reason specified</div>
          )}
        </div>
      </div>
      {showCountdown &&
        transaction.retirementStatus !== RetirementStatus.RETIRED &&
        transaction.sinkAmount % 1 != 0 && (
          <div className="col-span-8 md:col-span-6">
            <hr className="my-2" />
            <CountDownTimer initialDuration={initialDuration} />
          </div>
        )}
    </div>
  );
}

function ItemKey({ children }: PropsWithChildren) {
  return (
    <div className="text-[12px] leading-none text-tertiary">{children}</div>
  );
}
