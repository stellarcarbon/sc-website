"use client";

import NavBarItem, { DashboardTabs } from "./navbaritem";

export default function NavBar() {
  return (
    <div className="flex justify-between w-full h-16 bg-primary px-0 md:rounded-t">
      <NavBarItem item={DashboardTabs.OVERVIEW} first={true} />
      <NavBarItem item={DashboardTabs.SINK} />
      <NavBarItem item={DashboardTabs.HISTORY} last={true} />
      {/* <NavBarItem item={DashboardTabs.PENDING} /> */}
    </div>
  );
}
