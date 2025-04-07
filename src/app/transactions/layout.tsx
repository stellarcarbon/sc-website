"use client";

import TransactionExplorerHeader from "@/containers/TransactionExplorer/TransactionExplorerHeader";
import { TransactionExplorerContextProvider } from "@/context/TransactionExplorerContext";

import { ReactNode } from "react";

export default function TransactionExplorerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <TransactionExplorerContextProvider>
      <div
        className="lg:flex lg:flex-col lg:items-center
lg:bg-dalle lg:bg-cover lg:bg-fixed
lg:min-h-[calc(100dvh-80px)]"
      >
        <main
          className="bg-primary

 lg:w-[600px]

  lg:border border-tertiary
  flex flex-col items-center justify-start

  lg:rounded
  lg:m-6
"
        >
          <TransactionExplorerHeader />
          <div className="w-full">{children}</div>
        </main>
      </div>
    </TransactionExplorerContextProvider>
  );
}
