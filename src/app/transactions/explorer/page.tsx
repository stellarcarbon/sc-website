"use client";

import TransactionHistory from "@/containers/TransactionExplorer/TransactionHistory";
import { Suspense } from "react";

export default function TransactionsExplorerPage() {
  return (
    <Suspense>
      <TransactionHistory />
    </Suspense>
  );
}
