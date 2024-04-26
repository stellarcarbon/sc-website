"use client";

import { usePathname, useRouter } from "next/navigation";
import { HTMLProps, useEffect, useState } from "react";

interface HistoryNavBarItemProps extends HTMLProps<HTMLDivElement> {
  item: HistoryTabs;
}

interface HistoryTabProps {
  label: string;
  route: string;
}

export enum HistoryTabs {
  HISTORY = "history",
  PENDING = "pending",
}

const HistoryTabPropsConfig: Record<HistoryTabs, HistoryTabProps> = {
  [HistoryTabs.HISTORY]: {
    label: "Transaction history",
    route: "/dashboard/history",
  },
  [HistoryTabs.PENDING]: {
    label: "Pending retirements",
    route: "/dashboard/history/pending",
  },
};

export default function HistoryNavBarItem({ item }: HistoryNavBarItemProps) {
  const router = useRouter();
  const pathname = usePathname();

  const p: HistoryTabProps = HistoryTabPropsConfig[item];

  const [isSelected, setIsSelected] = useState<boolean>(p.route === pathname);

  useEffect(() => {
    setIsSelected(p.route === pathname);
  }, [pathname]);

  return (
    <div
      onClick={() => router.push(p.route)}
      className={`relative py-3 text-center text-xs w-[40%]
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
