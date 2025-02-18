"use client";

import { Suspense } from "react";
import Header from "@/components/Header";
import TransactionHistory from "@/containers/TransactionHistory";
import Paragraph from "@/components/Paragraph";
import ContentContainer from "@/components/ContentContainer";

export default function TransactionsPage() {
  return (
    <main className="flex flex-col items-center font-noto pb-4">
      <div className="blockchain-bg w-full">
        <div className="flex flex-col items-center gap-10 max-w-[80%] md:max-w-[65%] py-12 m-auto">
          <span className="text-5xl md:text-[7vw] font-noto text-center leading-[56px] md:leading-[8vw] image1">
            Stellarcarbon Ledger
          </span>
          <span className="text-2xl uppercase font-sans font-[700] text-center tracking-[8px] leading-[44px]">
            Complete transaction history
          </span>
        </div>
      </div>
      <ContentContainer>
        <Header>Transaction history</Header>
        <Paragraph>
          Here you can find the complete history of transactions using
          Stellarcarbon.
        </Paragraph>
        <Paragraph>
          In ut eros pretium velit congue fringilla. Fusce id commodo nibh.
          Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Nullam viverra fringilla purus, ac
          pellentesque nulla luctus id. Mauris in nisl sapien. Aliquam felis
          libero, blandit id feugiat et, placerat nec tortor. Aliquam egestas
          nunc et pellentesque auctor.
        </Paragraph>
        <Suspense>
          <TransactionHistory />
        </Suspense>
      </ContentContainer>
    </main>
  );
}
