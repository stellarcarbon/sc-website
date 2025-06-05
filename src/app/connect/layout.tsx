"use client";

import appConfig from "@/config";

export default function ConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return appConfig.demo ? (
    <>{children}</>
  ) : (
    <main className="flex-1 flex flex-col justify-start items-center bg-forestling bg-no-repeat bg-fixed bg-cover">
      {children}
    </main>
  );
}
