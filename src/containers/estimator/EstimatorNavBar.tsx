"use client";

import DashboardNavBarItem, {
  DashboardTabs,
} from "@/components/dashboard/DashboardNavBarItem";

export enum EstimatorTab {
  FLIGHT = "air travel",
  HOUSEHOLD = "household",
  ROAD = "road travel",
}

export default function EstimatorNavBar() {
  return (
    <div className="flex justify-between w-full h-16 bg-darker px-0 md:rounded-t">
      <DashboardNavBarItem item={DashboardTabs.FLIGHT} first={true} />
      <DashboardNavBarItem item={DashboardTabs.HOUSEHOLD} />
      <DashboardNavBarItem item={DashboardTabs.ROAD} last={true} />
    </div>
  );
}
