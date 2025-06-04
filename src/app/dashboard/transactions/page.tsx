"use client";

import { useSCRouter } from "@/utils";
import PendingRetirements from "@/components/dashboard/transactions/PendingRetirements";
import ConnectWalletCTA from "@/components/ConnectWalletCTA";
import { useAppContext } from "@/context/appContext";

export default function DashboardMyTransactions() {
  const { walletConnection } = useAppContext();

  return (
    <div className="flex-1 flex flex-col justify-start items-center">
      {walletConnection === undefined && <ConnectWalletCTA />}
      <PendingRetirements />
    </div>
  );
}
