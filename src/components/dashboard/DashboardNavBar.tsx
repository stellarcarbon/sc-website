"use client";

import DashboardNavBarItem, { DashboardTabs } from "./DashboardNavBarItem";

export default function DashboardNavBar() {
  return (
    <div className="flex justify-between w-full h-16 bg-darker px-0 md:rounded-t">
      <DashboardNavBarItem item={DashboardTabs.OVERVIEW} first={true} />
      <DashboardNavBarItem item={DashboardTabs.SINK} />
      <DashboardNavBarItem item={DashboardTabs.HISTORY} last={true} />
    </div>
  );
}
