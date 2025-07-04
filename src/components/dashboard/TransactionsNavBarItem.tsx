"use client";

import { useSCRouter } from "@/utils";
import { usePathname } from "next/navigation";
import { HTMLProps, useEffect, useMemo, useState } from "react";

interface TransactionsNavBarItemProps extends HTMLProps<HTMLDivElement> {
  item: TransactionsTabs;
}

interface TransactionsTabProps {
  label: string;
  route: string;
}

export enum TransactionsTabs {
  PENDING = "pending",
  HISTORY = "history",
}

const HistoryTabPropsConfig: Record<TransactionsTabs, TransactionsTabProps> = {
  [TransactionsTabs.PENDING]: {
    label: "Pending retirement",
    route: "/dashboard/transactions/",
  },
  [TransactionsTabs.HISTORY]: {
    label: "Retired transactions",
    route: "/dashboard/transactions/history/",
  },
};

export default function TransactionsNavBarItem({
  item,
}: TransactionsNavBarItemProps) {
  const router = useSCRouter();
  const pathname = usePathname();

  const p: TransactionsTabProps = useMemo(
    () => HistoryTabPropsConfig[item],
    [item]
  );

  const [isSelected, setIsSelected] = useState<boolean>(p.route === pathname);

  useEffect(() => {
    setIsSelected(p.route === pathname);
  }, [pathname, p]);

  return (
    <div
      onClick={() => router.push(p.route)}
      className={`relative cursor-pointer h-12 flex flex-col justify-center items-center py-3 text-center text-sm w-[50%] select-none
        ${isSelected ? "text-accent" : "text-accent"}
      `}
    >
      {p.label}
      {
        <div
          className={`${
            isSelected
              ? "animate-dashboardnavbarstart"
              : "animate-dashboardnavbarend"
          } absolute opacity-0 bottom-0 w-[80%] h-1 bg-accent`}
        ></div>
      }
    </div>
  );
}
