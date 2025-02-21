"use client";

import { useSwipeable } from "react-swipeable";
import { useSCRouter } from "@/app/utils";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useAppContext } from "@/context/appContext";

const Overview = dynamic(
  () => import("../../components/dashboard/overview/Overview"),
  {
    ssr: false,
  }
);

export default function Dashboard() {
  const { appConfig } = useAppContext();
  const router = useSCRouter();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => router.push("/dashboard/sink"),
    onSwipedRight: () => router.push("/dashboard/transactions/history"),
    delta: 100,
  });

  useEffect(() => {
    // Demo only supports the sink form
    if (appConfig.demo) {
      router.push("/dashboard/sink");
    }
  }, [appConfig, router]);

  return (
    <div
      {...swipeHandlers}
      className="flex flex-col w-full flex-1 gap-10 justify-start"
    >
      <Overview />
    </div>
  );
}
