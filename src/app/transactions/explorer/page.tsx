"use client";

import TransactionHistory from "@/containers/TransactionHistory";
import { Suspense } from "react";

export default function TransactionsExplorerPage() {
  return (
    <div className="w-full flex-1 flex flex-col items-center pt-4 lg:p-4 overflow-hidden">
      <h1 className="font-semibold text-2xl">Transactions explorer</h1>
      {/* <div className="flex-1 flex flex-col overflow-hidden">
            <div className="bg-darker w-full flex-1 overflow-auto">
              <div className="h-[1400px]">container</div>
            </div>
          </div> */}
      <Suspense>
        <TransactionHistory />
      </Suspense>
    </div>
  );
}
