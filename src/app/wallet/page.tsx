"use client";

import { useEffect } from "react";
import { useAppContext } from "@/context/appContext";
import { useSCRouter } from "@/app/utils";
import ConnectLanding from "@/containers/connect_wallet/ConnectLanding";

export default function WalletPage() {
  const router = useSCRouter();
  const { walletConnection } = useAppContext();

  useEffect(() => {
    if (walletConnection) {
      router.push("/dashboard");
    }
  }, [walletConnection, router]);

  return <ConnectLanding />;
}
