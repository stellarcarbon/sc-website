"use client";

import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";

import { usePathname } from "next/navigation";
import { HTMLProps, ReactNode, useEffect, useMemo, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPlane,
  faReceipt,
  faTruck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useSCRouter } from "@/utils";

interface DashboardNavBarItemProps extends HTMLProps<HTMLDivElement> {
  item: DashboardTabs;
  first?: boolean;
  last?: boolean;
}

interface DashboardTabProps {
  label: string;
  icon?: ReactNode;
  route: string;
}

export enum DashboardTabs {
  OVERVIEW = "overview",
  SINK = "sink",
  HISTORY = "history",
  FLIGHT = "air travel",
  HOUSEHOLD = "household",
  ROAD = "road travel",
}

const DashboardTabPropsConfig: Record<DashboardTabs, DashboardTabProps> = {
  [DashboardTabs.OVERVIEW]: {
    label: "My Stellarcarbon",
    icon: <FontAwesomeIcon icon={faUser} fontSize={"17px"} />,
    route: "/dashboard/",
  },
  [DashboardTabs.SINK]: {
    label: "Sink CARBON",
    icon: <CARBONCurrencyIcon width={18} height={18} />,
    route: "/dashboard/sink/",
  },
  [DashboardTabs.HISTORY]: {
    label: "Activity",
    icon: <FontAwesomeIcon icon={faReceipt} fontSize={"17px"} />,
    route: "/dashboard/transactions/",
  },
  [DashboardTabs.FLIGHT]: {
    label: "Air travel",
    icon: <FontAwesomeIcon icon={faPlane} fontSize={"17px"} />,
    route: "/estimator/flight/",
  },
  [DashboardTabs.HOUSEHOLD]: {
    label: "Household",
    icon: <FontAwesomeIcon icon={faHouse} fontSize={"17px"} />,
    route: "/estimator/household/",
  },
  [DashboardTabs.ROAD]: {
    label: "Road travel",
    icon: <FontAwesomeIcon icon={faTruck} fontSize={"17px"} />,
    route: "/estimator/road/",
  },
};

export default function DashboardNavBarItem({
  item,
  first,
  last,
}: DashboardNavBarItemProps) {
  const pathname = usePathname();
  const router = useSCRouter();

  const p: DashboardTabProps = useMemo(
    () => DashboardTabPropsConfig[item],
    [item]
  );

  const [isSelected, setIsSelected] = useState<boolean>(
    pathname === p.route ||
      pathname === p.route.substring(0, p.route.length - 1) // Alternative condition for trailing slash routing
  );

  useEffect(() => {
    const checkIsSelected = () => {
      if (
        pathname.includes("/dashboard/transactions/") &&
        p.route === "/dashboard/transactions/"
      ) {
        setIsSelected(true);
      } else if (pathname === "/dashboard" && p.route === "/dashboard/") {
        setIsSelected(true);
      } else {
        setIsSelected(pathname === p.route);
      }
    };

    checkIsSelected();
  }, [pathname, p]);

  const navigate = () => {
    router.push(p.route);
  };

  return (
    <div
      onClick={navigate}
      className={`relative cursor-pointer p-2 bg-red w-[33%] h-full flex flex-col justify-end items-center gap-[4px] select-none
      ${isSelected ? "text-accent bg-darkest" : "text-accentSecondary"} ${
        first ? "md:rounded-tl" : ""
      } ${last ? "md:rounded-tr" : ""}`}
    >
      {p.icon}
      <span className="text-[12px] md:text-[14px] text-center">{p.label}</span>
    </div>
  );
}
