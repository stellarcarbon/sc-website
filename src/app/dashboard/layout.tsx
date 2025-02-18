"use client";

import { useEffect } from "react";
import DashboardNavBar from "@/components/dashboard/DashboardNavBar";
import { useAppContext } from "@/context/appContext";
import { useSCRouter } from "@/app/utils";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { walletConnection } = useAppContext();
  const router = useSCRouter();

  // Redirect to connect wallet if not connected.
  useEffect(() => {
    if (walletConnection === undefined) {
      router.push("/wallet");
    }
  }, [walletConnection, router]);

  if (walletConnection === undefined) {
    return null;
  }

  return (
    <div className="md:flex md:justify-center md:bg-dalle md:bg-cover md:bg-fixed ">
      <main className="bg-primary min-h-[calc(100dvh-160px)] md:min-h-0 md:border border-tertiary flex flex-col items-center justify-start md:max-w-[780px] md:rounded md:m-6 md:w-[80vw] lg:w-[70vw]">
        <DashboardNavBar />
        {children}
      </main>
    </div>
  );
}
