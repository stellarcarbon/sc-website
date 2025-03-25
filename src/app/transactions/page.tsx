"use client";

import TransactionExplorer from "@/containers/TransactionExplorer/TransactionExplorer";
import { Suspense } from "react";

export default function TransactionsExplorerPage() {
  return (
    <Suspense>
      <TransactionExplorer />
    </Suspense>
  );
}
