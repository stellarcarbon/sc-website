"use client";

import Link from "next/link";
import TopBarLink from "./TopBarLink";
import { useAppContext } from "@/context/appContext";
import HamburgerButton from "./HamburgerButton";
import StellarCarbonIcon from "./icons/StellarCarbonIcon";

export default function TopBar() {
  const { openDrawer } = useAppContext();

  return (
    <header
      className={`flex w-full justify-between items-center h-20 z-10 relative
      border-b shadow-[0px_15px_12px_-20px_rgba(0,0,0,0.5)]
    bg-primary border-secondary`}
    >
      <Link href="/">
        <StellarCarbonIcon className="ml-[2vw] text-accent" />
      </Link>

      <div className="mr-8 gap-4 items-center hidden md:flex">
        <TopBarLink href="/">Home</TopBarLink>
        <TopBarLink href="/explain">Explain</TopBarLink>
        <TopBarLink href="/projects">Projects</TopBarLink>
        <TopBarLink href="/transactions">Transactions</TopBarLink>
        <TopBarLink href="/about">About us</TopBarLink>
        <TopBarLink href="/dashboard">Dashboard</TopBarLink>
      </div>
      <HamburgerButton
        className="p-[22px] md:hidden text-accent"
        onClick={openDrawer}
      />
    </header>
  );
}
