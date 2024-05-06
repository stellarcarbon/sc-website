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
    <div
      {...swipeHandlers}
      className="flex-1 flex flex-col justify-center items-center"
    >
      <h1>PENDING</h1>
    </div>
  );
}
