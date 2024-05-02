"use client";

import NavBarItem, { DashboardTabs } from "./navbaritem";

export default function NavBar() {
  return (
    <div className="flex justify-between w-full h-16 bg-primary px-0">
      <NavBarItem item={DashboardTabs.OVERVIEW} />
      <NavBarItem item={DashboardTabs.SINK} />
      <NavBarItem item={DashboardTabs.HISTORY} />
      {/* <NavBarItem item={DashboardTabs.PENDING} /> */}
    </div>
  );
}
