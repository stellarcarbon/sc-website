"use client";

import { useRouter } from "next/navigation";
import { useSwipeable } from "react-swipeable";

export default function DashboardMyTransactions() {
  const router = useRouter();

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
      className="flex-1 flex flex-col justify-start items-center px-4"
    >
      <div className="flex flex-col justify-center self-start h-12">
        <span className="text-sm">These are your pending retirements.</span>
      </div>

      <div className="flex flex-col gap-1"></div>
    </div>
  );
}
