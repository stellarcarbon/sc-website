"use client";

import Button from "@/components/Button";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSwipeable } from "react-swipeable";

export default function DashboardMyTransactions() {
  const router = useRouter();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: (ed) => {
      router.push("/dashboard/transactions/history");
    },
    onSwipedRight: () => router.push("/dashboard/sink"),
    delta: 100,
  });

  return (
    <div
      {...swipeHandlers}
      className="flex-1 flex flex-col justify-start items-center px-4 mt-6 mb-12"
    >
      {/* <div className="flex flex-col justify-center self-start h-12">
        <span className="text-sm">These are your pending retirements.</span>
      </div> */}

      <div className="flex flex-col gap-2 items-center">
        <h1>Total pending retirements</h1>
        <div className="flex items-center justify-center gap-1 text-3xl">
          <span>{"0.33"}</span>
          <CARBONCurrencyIcon />
        </div>
        <div className="flex h-10">
          <Button>Sink my pending retirements</Button>
        </div>
        <div className="bg-secondary border rounded border-tertiary p-4 text-sm m-2">
          <span>
            These are the fractional retirements for which no certificate has
            been issued to you yet. If you do not sink to complete these pending
            retirements, they will automatically be retired in the community
            pool 90 days after the corresponding transaction took place. Read
            more about pending retirements{" "}
            <Link href="/explain" className="underline">
              here
            </Link>
            .
          </span>
        </div>
      </div>

      <hr className="w-[90%] my-4" />

      <div className="flex flex-col w-full gap-2">
        <div className="bg-secondary p-2">Item 1</div>
        <div className="bg-secondary p-2">Item 2</div>
        <div className="bg-secondary p-2">Item 3</div>
        <div className="bg-secondary p-2">Item 4</div>
        <div className="bg-secondary p-2">Item 5</div>
        <div className="bg-secondary p-2">Item 6</div>
      </div>

      <div className="flex flex-col gap-1"></div>
    </div>
  );
}
