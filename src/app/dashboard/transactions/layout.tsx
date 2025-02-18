"use client";

import TransactionsNavBarItem, {
  TransactionsTabs,
} from "@/components/dashboard/TransactionsNavBarItem";

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center justify-start w-full flex-1">
      <div className="h-12 w-full flex justify-around items-center bg-primary border-b border-b-secondary">
        <TransactionsNavBarItem item={TransactionsTabs.PENDING} />
        <TransactionsNavBarItem item={TransactionsTabs.HISTORY} />
      </div>

      <div className="flex flex-col w-full bg-primary md:rounded-b-md min-h-[calc(100dvh-160px-64px-48px)]">
        {children}
      </div>
    </main>
  );
}
