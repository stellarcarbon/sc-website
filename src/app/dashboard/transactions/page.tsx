"use client";

import { useRouter } from "next/navigation";
import { useSwipeable } from "react-swipeable";

export default function DashboardMyTransactions() {
  const router = useRouter();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: (ed) => {
      console.log(ed);
      router.push("/dashboard/transactions/history");
    },
    onSwipedRight: () => router.push("/dashboard/sink"),
    delta: 100,
  });

  return (
    <div {...swipeHandlers} className="w-full min-h-full flex-1">
      <h1>PENDING</h1>
    </div>
  );
}
