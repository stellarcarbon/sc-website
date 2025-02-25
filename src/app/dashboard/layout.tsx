"use client";

import { useEffect } from "react";
import DashboardNavBar from "@/components/dashboard/DashboardNavBar";
import { useAppContext } from "@/context/appContext";
import { useSCRouter } from "@/utils";
import appConfig from "@/config";

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
    <>
      {appConfig.demo ? (
        <>{children}</>
      ) : (
        <div className="lg:flex lg:justify-center lg:bg-dalle lg:bg-cover lg:bg-fixed ">
          <main className="bg-primary min-h-[calc(100dvh-160px)] lg:min-h-0 lg:border border-tertiary flex flex-col items-center justify-start lg:max-w-[850px] lg:rounded lg:m-6 lg:w-[70vw]">
            <DashboardNavBar />
            {children}
          </main>
        </div>
      )}
    </>
  );
}
