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

  return (
    <>
      {appConfig.demo ? (
        <>{children}</>
      ) : (
        <div className="lg:flex lg:flex-col lg:items-center lg:bg-forestling lg:bg-cover lg:bg-fixed flex-1">
          <main
            className="bg-primary lg:border border-tertiary lg:rounded
          min-h-[calc(100dvh-64px)] md:min-h-[60vh]
          flex flex-col items-center justify-start
          lg:max-w-[740px] lg:w-[70vw]
          overflow-hidden
          lg:m-6"
          >
            <DashboardNavBar />
            {children}
          </main>
        </div>
      )}
    </>
  );
}
