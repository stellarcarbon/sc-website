"use client";

import Link from "next/link";
import TopBarLink from "./TopBarLink";
import { usePathname } from "next/navigation";
import { useAppContext } from "../context/appContext";
import HamburgerButton from "./HamburgerButton";

export default function TopBar() {
  const { walletConnection, openDrawer } = useAppContext();
  const pathname = usePathname();

  return (
    <header
      className={`flex w-full justify-between items-center h-20 z-10 relative border-b shadow-[0px_15px_12px_-20px_rgba(0,0,0,0.5)]
        ${
          pathname.includes("/wallet")
            ? "!bg-primary border-secondary text-white"
            : "bg-white border-gray-50"
        }
    `}
    >
      <img className="h-10 ml-[5vw]" src="/stellarcarbon-heading.png" />

      <div className="mr-8 gap-4 items-center hidden md:flex">
        <TopBarLink href="/">Home</TopBarLink>
        <TopBarLink href="/explain">Explain</TopBarLink>
        <TopBarLink href="/projects">Projects</TopBarLink>
        <TopBarLink href="/about">About us</TopBarLink>
        <TopBarLink href="/wallet">Wallet</TopBarLink>
      </div>
      <HamburgerButton className="mr-[5vw] md:hidden" onClick={openDrawer} />
    </header>
  );
}
