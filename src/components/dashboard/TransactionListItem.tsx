import { MyTransactionRecord, RetirementStatus } from "@/app/types";
import Link from "next/link";
import CARBONCurrencyIcon from "../icons/CARBONCurrencyIcon";
import CountDownTimer from "../CountDownTimer";
import { useMemo } from "react";

interface TransactionListItemProps {
  transaction: MyTransactionRecord;
  onClick: () => void;
}

declare global {
  interface Date {
    addDays(days: number): Date;
  }
}

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export default function TransactionListItem({
  transaction,
  onClick,
}: TransactionListItemProps) {
  const initialDuration = useMemo(() => {
    const txDate = new Date(transaction.createdAt);
    const txDatePlus90 = txDate.addDays(90); // TODO: Make this the actual 90 days
    const now = new Date();

    const outcome = +txDatePlus90 - +now;

    return outcome / 1000;
  }, [transaction]);

  return (
    <div className="p-2 w-full grid grid-cols-4 md:grid-cols-6 bg-secondary border-accentSecondary rounded-md cursor-pointer text-sm">
      <div className="">Hash</div>
      <div className="col-span-3 md:col-span-5 truncate">{transaction.id}</div>

      <div>Date</div>
      <div className="col-span-3 md:col-span-5">
        {new Date(transaction.createdAt).toDateString()}
      </div>

      <div>Sunk</div>
      <div className="col-span-3 md:col-span-5 flex gap-1">
        <CARBONCurrencyIcon />
        <span>{transaction.sinkAmount?.toFixed(2)}</span>
      </div>

      <div>Price</div>
      <div className="col-span-3 md:col-span-5 flex gap-1">
        <span>{transaction.assetAmount?.toFixed(2)}</span>
        <span>{transaction.asset}</span>
      </div>

      <div>Memo</div>
      <div className="col-span-3 md:col-span-5">{transaction.memo}</div>

      <div>Status</div>
      <div className="col-span-3 md:col-span-5">
        {transaction.retirementStatus}
      </div>

      {/* TODO: check dit */}
      {transaction.retirementStatus !== RetirementStatus.RETIRED &&
        transaction.sinkAmount % 1 != 0 && (
          <div className="col-span-4 md:col-span-6">
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
