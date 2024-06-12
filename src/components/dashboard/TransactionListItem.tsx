import { MyTransactionRecord } from "@/app/types";
import Link from "next/link";
import CARBONCurrencyIcon from "../icons/CARBONCurrencyIcon";

interface TransactionListItemProps {
  transaction: MyTransactionRecord;
  onClick: () => void;
}

export default function TransactionListItem({
  transaction,
  onClick,
}: TransactionListItemProps) {
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
    </div>
  );
}
