"use client";

import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import ContentContainer from "@/components/ContentContainer";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TransactionsPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/transactions/explorer");
  }, []);

  return (
    <main className="flex flex-col items-center font-noto pb-4">
      <div className="blockchain-bg w-full">
        <div className="flex flex-col items-center gap-10 max-w-[80%] md:max-w-[65%] py-12 m-auto">
          {/* <span className="text-5xl md:text-[7vw] font-noto text-center leading-[56px] md:leading-[8vw] image1">
            Stellarcarbon Ledger
          </span> */}
          <span className="text-3xl uppercase font-sans font-[700] text-center tracking-[8px] leading-[44px]">
            Stellarcarbon transaction history
          </span>
        </div>
      </div>
      <ContentContainer>
        <Header>Transaction history</Header>
        <Paragraph>
          The complete history of all transactions ever made using Stellarcarbon
          is visible on the blockchain.
        </Paragraph>
        <Paragraph>Use our transactions explorer to look around!</Paragraph>
        <Button
          className="max-w-[300px] self-center"
          onClick={() => router.push("/transactions/explorer")}
        >
          Explore transactions
        </Button>
      </ContentContainer>
    </main>
  );
}
