"use client";

import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";

import { usePathname, useRouter } from "next/navigation";
import { HTMLProps, ReactNode, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt, faUser } from "@fortawesome/free-solid-svg-icons";

interface NavBarItemProps extends HTMLProps<HTMLDivElement> {
  item: DashboardTabs;
}

interface DashboardTabProps {
  label: string;
  icon?: ReactNode;
  route: string;
}

export enum DashboardTabs {
  OVERVIEW = "overview",
  SINK = "sink",
  // PENDING = "pending",
  HISTORY = "history",
}

const DashboardTabPropsConfig: Record<DashboardTabs, DashboardTabProps> = {
  [DashboardTabs.OVERVIEW]: {
    label: "Dashboard",
    icon: <FontAwesomeIcon icon={faUser} fontSize={"17px"} />,
    route: "/dashboard",
  },
  [DashboardTabs.SINK]: {
    label: "Sink CARBON",
    icon: <CARBONCurrencyIcon width={17} height={17} />,
    route: "/dashboard/sink",
  },
  // [DashboardTabs.PENDING]: {
  //   label: "Pending retirements",
  //   // icon: <RoadTravelIcon />,
  //   route: "pending",
  // },
  [DashboardTabs.HISTORY]: {
    label: "My Transactions",
    icon: <FontAwesomeIcon icon={faReceipt} fontSize={"17px"} />,
    route: "/dashboard/history",
  },
};

export default function NavBarItem({ item }: NavBarItemProps) {
  const pathname = usePathname();
  const router = useRouter();

  const p: DashboardTabProps = DashboardTabPropsConfig[item];

  const checkIsSelected = () => {
    if (
      pathname.includes("/dashboard/history") &&
      p.route === "/dashboard/history"
    ) {
      setIsSelected(true);
    } else {
      setIsSelected(pathname === p.route);
    }
  };

  const [isSelected, setIsSelected] = useState<boolean>(pathname === p.route);

  useEffect(() => {
    checkIsSelected();
  }, [pathname]);

  const navigate = () => {
    router.push(p.route);
  };

  console.log(p.label, isSelected);

  return (
    <div
      onClick={navigate}
      className={`${
        isSelected ? "text-accentSecondary bg-secondary" : ""
      } relative p-2 bg-red w-28 h-full flex flex-col justify-end items-center gap-1`}
    >
      {p.icon}
      <span className="text-[12px] text-center">{p.label}</span>
      {
        // <div
        //   className={`${
        //     isSelected ? "animate-navbarstart" : "animate-navbarend"
        //   } absolute opacity-0 bottom-0 w-full h-1 bg-accentSecondary`}
        // ></div>
      }
    </div>
  );
}
