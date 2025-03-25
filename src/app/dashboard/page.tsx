"use client";

import { useSCRouter } from "@/utils";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import appConfig from "@/config";
import ConnectWalletCTA from "@/components/ConnectWalletCTA";
import { useAppContext } from "@/context/appContext";

const Overview = dynamic(
  () => import("../../components/dashboard/overview/Overview"),
  {
    ssr: false,
  }
);

export default function Dashboard() {
  const { walletConnection } = useAppContext();

  const router = useSCRouter();

  useEffect(() => {
    // Demo only supports the sink form
    if (appConfig.demo) {
      router.push("/dashboard/sink");
    }
  }, [router]);

  return (
    <>
      {walletConnection === undefined && <ConnectWalletCTA />}
      <Overview />
    </>
  );
}
