"use client";

import { useAppContext } from "@/context/appContext";

export default function WalletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { appConfig } = useAppContext();

  return appConfig.demo ? (
    <div className="w-full flex-1">{children}</div>
  ) : (
    <main className="flex-1 flex flex-col justify-center items-center bg-dalle bg-no-repeat bg-fixed bg-cover">
      {children}
    </main>
  );
}
