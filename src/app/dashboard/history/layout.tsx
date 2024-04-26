"use client";

import HistoryNavBarItem, { HistoryTabs } from "../historynavbaritem";

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center justify-start">
      <div className="h-10 w-full flex justify-around items-stretch bg-secondary border-b-accentSecondary">
        <HistoryNavBarItem item={HistoryTabs.HISTORY} />
        <HistoryNavBarItem item={HistoryTabs.PENDING} />
      </div>
      <div className="w-full bg-primary min-h-[calc(100vh-176px-64px-40px)]">
        {children}
      </div>
    </main>
  );
}
