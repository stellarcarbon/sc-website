"use client";

import { useSCRouter } from "@/utils";
import PendingRetirements from "@/components/dashboard/transactions/PendingRetirements";

export default function DashboardMyTransactions() {
  const router = useSCRouter();

  return (
    <div className="flex-1 flex flex-col justify-start items-center">
      <PendingRetirements />
    </div>
  );
}
