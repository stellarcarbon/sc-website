import { MyTransactionRecord, RetirementStatus } from "@/app/types";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import CountDownTimer from "@/components/CountDownTimer";
import { ReactNode, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import TruncatedHash from "./TruncatedHash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowLeftLong,
  faExchange,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "@/utils";

interface TransactionListItemProps {
  transaction: MyTransactionRecord;
  showCountdown?: boolean;
  bgPrimary?: boolean;
}

function ItemHeader({ children }: { children: ReactNode }) {
  return (
    <div className="col-span-2 md:col-span-1 font-semibold flex items-center">
      {children}
    </div>
  );
}

function ItemValue({ children }: { children: ReactNode }) {
  return (
    <div className="col-span-6 md:col-span-5 flex items-center">{children}</div>
  );
}

export default function TransactionListItem({
  transaction,
  showCountdown = false,
  bgPrimary = false,
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
    router.push(`/transactions/detail/?id=${transaction.id}`);
  };

  return (
    <div
      onClick={onClick}
      className="w-full max-w-[850px]
  bg-darker border border-accentSecondary rounded
  cursor-pointer
  p-2
  flex flex-col gap-1"
    >
      <div className="flex items-center justify-between text-sm">
        <span className="">
          <TruncatedHash hash={transaction.id} />
        </span>
        <span>{formattedDate}</span>
      </div>

      <div className="flex items-center justify-between text-base">
        {/* <span className="text-xs">Retirement reason</span> */}
        <div className="flex items-center gap-1">
          <CARBONCurrencyIcon />
          <span>{transaction.sinkAmount?.toFixed(3)}</span>
        </div>

        <span className="">{transaction.memo ?? "N/A"}</span>
      </div>
    </div>
  );

  return (
    <div
      onClick={onClick}
      className={`p-2 w-full max-w-[850px] grid grid-cols-8 md:grid-cols-6  border border-accentSecondary rounded-md cursor-pointer text-sm ${
        bgPrimary ? "bg-primary" : "bg-secondary"
      }`}
    >
      <div className="col-span-8 grid grid-cols-8">
        <h1 className="col-span-8 flex items-center gap-1 text-lg justify-center">
          <CARBONCurrencyIcon />
          <span>{transaction.sinkAmount?.toFixed(3)}</span>
          <FontAwesomeIcon icon={faExchange} />
          <span>{transaction.assetAmount?.toFixed(2)}</span>
          <span>{transaction.asset}</span>
        </h1>

        <div className="col-span-8 grid grid-cols-[repeat(16, minmax(0, 1fr))]">
          <ItemHeader>Hash</ItemHeader>
          <ItemValue>
            <TruncatedHash hash={transaction.id} />
          </ItemValue>

          <ItemHeader>Date</ItemHeader>
          <ItemValue>
            {new Date(transaction.createdAt).toLocaleDateString()}
          </ItemValue>
        </div>

        {/* <ItemHeader>Sunk</ItemHeader>
        <ItemValue>
          <div className="flex items-center gap-1">
            <CARBONCurrencyIcon />
            <span>{transaction.sinkAmount?.toFixed(3)}</span>
          </div>
        </ItemValue>

        <ItemHeader>Price</ItemHeader>
        <ItemValue>
          <div className="flex items-center gap-1">
            <span>{transaction.assetAmount?.toFixed(2)}</span>
            <span>{transaction.asset}</span>
          </div>
        </ItemValue> */}

        <ItemHeader>Memo</ItemHeader>
        <ItemValue>{transaction.memo}</ItemValue>

        <ItemHeader>Status</ItemHeader>
        <ItemValue>{transaction.retirementStatus}</ItemValue>
      </div>

      {transaction.retirementStatus === RetirementStatus.RETIRED && (
        <>
          <ItemHeader>
            {transaction.retirements.length > 1
              ? "Certificate IDs"
              : "Certificate ID"}
          </ItemHeader>
          <ItemValue>
            <div className="flex gap-2">
              {transaction.retirements.map((retirement, idx) => (
                <span key={`${transaction.id}_${idx}}`}>
                  {retirement.certificate_id}
                </span>
              ))}
            </div>
          </ItemValue>
        </>
      )}

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
