"use client";

import { Suspense } from "react";
import Header from "@/components/Header";
import AllTransactions from "./AllTransactions";

export default function TransactionsPage() {
  return (
    <main className="flex flex-col font-noto blockchain-bg bg-no-repeat bg-fixed bg-cover min-h-[calc(100vh-176px)] mt-[80px]">
      <div className="w-full">
        <div className="flex flex-col items-center gap-10 max-w-[80%] md:max-w-[65%] py-12 m-auto">
          <span className="text-5xl md:text-[4vw] font-noto text-center leading-[56px] md:leading-[8vw] image1">
            Stellarcarbon Ledger
          </span>
        </div>
      </div>

      <div className="mb-32 p-4 md:p-16 py-16 flex flex-col md:max-w-[1080px] md:mx-auto bg-secondary rounded-md">
        <Header>Transaction history</Header>
        <div className="tracking-wide leading-7">
          <p>
            Here you can find the complete history of transactions using
            Stellarcarbon.
          </p>
          <p>
            In ut eros pretium velit congue fringilla. Fusce id commodo nibh.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. Nullam viverra fringilla purus, ac
            pellentesque nulla luctus id. Mauris in nisl sapien. Aliquam felis
            libero, blandit id feugiat et, placerat nec tortor. Aliquam egestas
            nunc et pellentesque auctor.
          </p>
        </div>
      </div>
      <Suspense>
        <AllTransactions />
      </Suspense>
    </main>
  );
}
