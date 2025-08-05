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

  return (
    <TransactionExplorerContextProvider>
      <div
        className="lg:flex lg:flex-col lg:items-center
lg:bg-dalle lg:bg-cover lg:bg-fixed lg:min-h-[calc(100dvh-80px)]
flex-1 md:flex-none bg-darkest
"
      >
        <main
          className="bg-darkest

 lg:w-[600px]

    

  lg:border border-tertiary
  flex flex-col items-center justify-start

  lg:rounded
  overflow-hidden
  lg:m-6 lg:min-h-[70vh]
"
        >
          <TransactionExplorerHeader />

          <div className="w-full">{children}</div>
        </main>
      </div>
    </TransactionExplorerContextProvider>
  );
}
