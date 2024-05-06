"use client";

import { usePathname, useRouter } from "next/navigation";
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
    label: "Pending retirements",
    route: "/dashboard/transactions/",
  },
  [TransactionsTabs.HISTORY]: {
    label: "Transaction history",
    route: "/dashboard/transactions/history/",
  },
};

export default function HistoryNavBarItem({
  item,
}: TransactionsNavBarItemProps) {
  const router = useRouter();
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
      className={`relative h-12 flex flex-col justify-center py-3 text-center text-sm w-[40%]
        ${isSelected ? "text-accentSecondary" : ""}
      `}
    >
      {p.label}
      {
        <div
          className={`${
            isSelected ? "animate-navbarstart" : "animate-navbarend"
          } absolute opacity-0 bottom-0 w-full h-1 bg-accentSecondary`}
        ></div>
      }
    </div>
  );
}
