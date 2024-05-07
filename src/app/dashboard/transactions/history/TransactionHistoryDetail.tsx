"use client";

import Button from "@/components/Button";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

interface TransactionHistoryDetailProps {
  hash: string;
}

export default function TransactionHistoryDetail({
  hash,
}: TransactionHistoryDetailProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div className="h-12 px-4 flex items-center border-b border-b-tertiary">
        <Button
          onClick={() => router.push("/dashboard/transactions/history/")}
          className="flex gap-1 items-center bg-accent text-primary rounded border !h-6 !py-[2px] !px-3 w-fit"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          {/* <span>Back to list</span> */}
        </Button>
        <h1 className="flex-1 text-center text-xl">Transaction Details</h1>
      </div>
      <div className="flex flex-col text-center">
        <span>Transaction details of</span>
        <span>{hash}</span>
      </div>
    </div>
  );
}
