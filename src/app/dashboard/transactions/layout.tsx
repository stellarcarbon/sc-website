"use client";

import TransactionsNavBarItem, {
  TransactionsTabs,
} from "../TransactionsNavBarItem";

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center justify-start">
      <div className="h-12 w-full flex justify-around items-center bg-secondary border-b border-b-tertiary">
        <TransactionsNavBarItem item={TransactionsTabs.PENDING} />
        <TransactionsNavBarItem item={TransactionsTabs.HISTORY} />
      </div>
      <div className="flex flex-col w-full bg-primary min-h-[calc(100vh-176px-64px-40px)]">
        {children}
      </div>
    </main>
  );
}
