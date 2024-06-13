"use client";

import { useSCRouter } from "@/app/utils";
import { useSwipeable } from "react-swipeable";
import PendingRetirements from "./PendingRetirements";

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
      className="flex-1 flex flex-col justify-start items-center px-4 mt-6 mb-12"
    >
      <PendingRetirements />
    </div>
  );
}
