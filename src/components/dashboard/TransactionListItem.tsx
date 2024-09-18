import { MyTransactionRecord, RetirementStatus } from "@/app/types";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import CountDownTimer from "@/components/CountDownTimer";
import { ReactNode, useMemo } from "react";

interface TransactionListItemProps {
  transaction: MyTransactionRecord;
  onClick: () => void;
  showCountdown?: boolean;
  bgPrimary?: boolean;
}

function ItemHeader({ children }: { children: ReactNode }) {
  return (
    <div className="col-span-2 md:col-span-1 font-semibold">{children}</div>
  );
}

function ItemValue({ children }: { children: ReactNode }) {
  return <div className="col-span-6 md:col-span-5 truncate">{children}</div>;
}

export default function TransactionListItem({
  transaction,
  onClick,
  showCountdown = false,
  bgPrimary = false,
}: TransactionListItemProps) {
  const initialDuration = useMemo(() => {
    const txDate = new Date(transaction.createdAt);
    const txDatePlus90 = txDate.addDays(90); // TODO: Make this the actual 90 days
    const now = new Date();

    const outcome = +txDatePlus90 - +now;

    return outcome / 1000;
  }, [transaction]);

  return (
    <div
      onClick={onClick}
      className={`p-2 w-full grid grid-cols-8 md:grid-cols-6 ${
        bgPrimary ? "bg-primary" : "bg-secondary"
      } border border-accentSecondary rounded-md cursor-pointer text-sm`}
    >
      <ItemHeader>Hash</ItemHeader>
      <ItemValue>{transaction.id}</ItemValue>

      <ItemHeader>Date</ItemHeader>
      <ItemValue>{new Date(transaction.createdAt).toDateString()}</ItemValue>

      <ItemHeader>Sunk</ItemHeader>
      <ItemValue>
        <div className="flex items-center gap-1">
          <CARBONCurrencyIcon />
          <span>{transaction.sinkAmount?.toFixed(2)}</span>
        </div>
      </ItemValue>

      <ItemHeader>Price</ItemHeader>
      <ItemValue>
        <div className="flex items-center gap-1">
          <span>{transaction.assetAmount?.toFixed(2)}</span>
          <span>{transaction.asset}</span>
        </div>
      </ItemValue>

      <ItemHeader>Memo</ItemHeader>
      <ItemValue>{transaction.memo}</ItemValue>

      <ItemHeader>Status</ItemHeader>
      <ItemValue>{transaction.retirementStatus}</ItemValue>

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

  return (
    <div
      onClick={onClick}
      className="flex flex-col text-sm bg-secondary rounded-md  border-accentSecondary p-2 w-full cursor-pointer"
    >
      <div className="flex justify-start items-center">
        <span className="w-20 md:w-32">Hash</span>
        <span className=" truncate max-w-[60%]">{transaction.id}</span>
      </div>
      <div className="flex justify-start items-center">
        <span className="w-20 md:w-32">Date</span>
        <span className="">
          {new Date(transaction.createdAt).toDateString()}
        </span>
      </div>
      <div className="flex justify-start items-center">
        <span className="w-20 md:w-32">Sunk</span>
        <div className="flex items-center gap-1">
          <CARBONCurrencyIcon />
          <span>{transaction.sinkAmount?.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex justify-start items-center">
        <span className="w-20 md:w-32">Price</span>
        <div className="flex gap-1 ">
          <span>{transaction.assetAmount?.toFixed(2)}</span>
          <span>{transaction.asset}</span>
        </div>
      </div>
      <div className="flex justify-start items-center">
        <span className="w-20 md:w-32">Memo</span>
        <span className=" truncate max-w-[60%]">{transaction.memo}</span>
      </div>

      <div className="flex justify-start items-center">
        <span className="w-20 md:w-32">Status</span>
        <span className="truncate max-w-[60%]">
          {transaction.retirementStatus}
        </span>
      </div>

      {/* TODO: check dit */}
      {transaction.retirementStatus !== RetirementStatus.RETIRED &&
        transaction.sinkAmount % 1 != 0 && (
          <>
            <hr className="my-2" />
            <CountDownTimer initialDuration={initialDuration} />
          </>
        )}
    </div>
  );
}
