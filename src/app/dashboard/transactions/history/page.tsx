"use client";

import ConnectWalletCTA from "@/components/ConnectWalletCTA";
import ActivityHistory from "@/components/dashboard/transactions/ActivityHistory";
import { useAppContext } from "@/context/appContext";
import { useRouter } from "next/navigation";

export default function ActivityHistoryPage() {
  const { walletConnection } = useAppContext();
  return (
    <div className="flex-1 flex flex-col justify-start items-center bg-darkest">
      {walletConnection === undefined ? (
        <ConnectWalletCTA />
      ) : (
        <ActivityHistory />
      )}
    </div>
  );
}
