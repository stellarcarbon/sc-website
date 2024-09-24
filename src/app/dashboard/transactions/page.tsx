"use client";

import { useSCRouter } from "@/utils";
import { useSwipeable } from "react-swipeable";
import PendingRetirements from "@/components/dashboard/transactions/PendingRetirements";

export default function DashboardMyTransactions() {
  const router = useSCRouter();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: (ed) => {
      router.push("/dashboard/transactions/history");
    },
    onSwipedRight: () => router.push("/dashboard/sink"),
    delta: 100,
  });

  return (
    <div
      {...swipeHandlers}
      className="flex-1 flex flex-col justify-start items-center"
    >
      <PendingRetirements />
    </div>
  );
}
