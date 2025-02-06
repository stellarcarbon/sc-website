"use client";

import ActivityHistory from "@/components/dashboard/transactions/ActivityHistory";
import { useRouter } from "next/navigation";
import { useSwipeable } from "react-swipeable";

export default function ActivityHistoryPage() {
  const router = useRouter();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      router.push("/dashboard");
    },
    onSwipedRight: () => router.push("/dashboard/transactions"),
    delta: 100,
  });

  return (
    <div {...swipeHandlers}>
      <ActivityHistory />
    </div>
  );
}
