"use client";

import { useSwipeable } from "react-swipeable";
import { useSCRouter } from "@/app/utils";
import dynamic from "next/dynamic";

const Overview = dynamic(
  () => import("../../components/dashboard/overview/Overview"),
  {
    ssr: false,
  }
);

export default function Dashboard() {
  const router = useSCRouter();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => router.push("/dashboard/sink"),
    onSwipedRight: () => router.push("/dashboard/transactions/history"),
    delta: 100,
  });

  return (
    <div
      {...swipeHandlers}
      className="flex flex-col w-full flex-1 gap-10 justify-start"
    >
      <Overview />
    </div>
  );
}
