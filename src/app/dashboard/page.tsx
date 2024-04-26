"use client";

import { useAppContext } from "../../context/appContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Dashboard() {
  const { walletConnection } = useAppContext();
  const router = useRouter();

  // useEffect(() => {
  //   console.log("wc:", walletConnection);
  //   if (walletConnection) {
  //     router.push("/dashboard/overview");
  //   } else if (walletConnection === undefined) {
  //     router.push("/wallet/connect");
  //   }
  // }, [walletConnection]);

  return <div className="text-xl color-white">Dashboard Page.tsx</div>;
}
