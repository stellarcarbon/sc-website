"use client";

import ActivityHistory from "@/components/dashboard/transactions/ActivityHistory";
import { useRouter } from "next/navigation";

export default function ActivityHistoryPage() {
  return (
    <div className="flex-1 flex flex-col">
      <ActivityHistory />
    </div>
  );
}
