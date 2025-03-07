"use client";

import appConfig from "@/config";

export default function WalletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return appConfig.demo ? (
    <>{children}</>
  ) : (
    <main className="flex-1 flex flex-col justify-center items-center bg-dalle bg-no-repeat bg-fixed bg-cover">
      {children}
    </main>
  );
}
