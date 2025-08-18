"use client";

import Banner from "@/components/Banner";
import TransactionExplorerHeader from "@/containers/TransactionExplorer/TransactionExplorerHeader";
import { TransactionExplorerContextProvider } from "@/context/TransactionExplorerContext";

import { ReactNode, Suspense } from "react";

export default function TransactionExplorerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense>
      <TransactionExplorerContextProvider>
        <div className="relative flex-1 flex flex-col">
          {/* <div className="absolute z-0 bg-forest bg-cover block w-full h-full"></div> */}
          <main className="z-10 flex flex-col items-center md:gap-8 font-noto bg-darkest/[.85] flex-1">
            <Banner
              title="Transaction Explorer"
              subtitle="Browse the ledger"
              background="m-bg"
            />
            <div className="max-w-[700px] w-full flex-1 flex flex-col">
              {children}
            </div>
          </main>
        </div>
      </TransactionExplorerContextProvider>
    </Suspense>
  );
}
