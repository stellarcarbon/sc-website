"use client";

import PersonalDetailsDisplay from "@/components/wallet/PersonalDetailsDisplay";
import { useAppContext } from "../../context/appContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useMemo } from "react";
import Button from "@/components/Button";
import EditIcon from "@/components/icons/EditIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useSwipeable, SwipeDirections } from "react-swipeable";
import Link from "next/link";
import { useSCRouter, useViewportWidth } from "../utils";
import dynamic from "next/dynamic";

const Overview = dynamic(() => import("../../components/dashboard/Overview"), {
  ssr: false,
});

export default function Dashboard() {
  const { walletConnection } = useAppContext();
  const router = useSCRouter();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => router.push("/dashboard/sink"),
    onSwipedRight: () => router.push("/dashboard/transactions/history"),
    delta: 100,
  });

  useEffect(() => {
    if (walletConnection === undefined) {
      router.push("/wallet");
    }
  }, [walletConnection, router]);

  return (
    <div
      {...swipeHandlers}
      className="flex flex-col gap-8 w-full flex-1 justify-start"
    >
      <Overview />
    </div>
  );
}
