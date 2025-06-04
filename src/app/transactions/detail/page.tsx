"use client";

import TransactionsExplorerDetail from "@/containers/TransactionExplorer/TransactionsExplorerDetail";
import { Suspense } from "react";

export default function TransactionsExplorerDetailPage() {
  return (
    <Suspense>
      <TransactionsExplorerDetail />
    </Suspense>
  );
}
