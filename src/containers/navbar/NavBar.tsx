"use client";

import Link from "next/link";
import TopBarLink from "../../components/TopBarLink";
import { useAppContext } from "@/context/appContext";
import HamburgerButton from "../../components/HamburgerButton";
import StellarCarbonIcon from "../../components/icons/StellarCarbonIcon";
import NavBarWallet from "./NavBarWallet";
import Drawer from "@/components/Drawer";
import WalletConnectionInfoSmall from "@/components/WalletConnectionInfoSmall";

export default function NavBar() {
  const { isDrawerOpen, isMobileDevice } = useAppContext();

  return (
    <div className="z-[100] fixed w-full">
      <header
        className={`flex justify-between items-center
          
        h-16 lg:h-20
        border-b border-secondary
      bg-primary shadow-[0px_15px_12px_-20px_rgba(0,0,0,0.5)]`}
      >
        <Link className="ml-3" href="/">
          <StellarCarbonIcon className=" text-accent" />
        </Link>

        <div className="ml-10 gap-10 items-center hidden lg:flex">
          <TopBarLink href="/">Home</TopBarLink>
          <TopBarLink href="/explain">Explain</TopBarLink>
          <TopBarLink href="/projects">Projects</TopBarLink>
          <TopBarLink href="/transactions">Transactions</TopBarLink>
          <TopBarLink href="/software">Software</TopBarLink>
          <TopBarLink href="/about">About us</TopBarLink>
          <div className="w-4"></div>
        </div>

        <div className="hidden md:block mr-8">
          <NavBarWallet />
        </div>

        <div className="md:hidden">
          <HamburgerButton />
        </div>
      </header>

      {isDrawerOpen && (
        <div className="relative h-[calc(100dvh-64px)] overflow-auto">
          <Drawer />
        </div>
      )}
    </div>
  );
}
