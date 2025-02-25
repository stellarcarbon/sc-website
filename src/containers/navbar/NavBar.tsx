"use client";

import Link from "next/link";
import TopBarLink from "../../components/TopBarLink";
import { useAppContext } from "@/context/appContext";
import HamburgerButton from "../../components/HamburgerButton";
import StellarCarbonIcon from "../../components/icons/StellarCarbonIcon";
import CTAButton from "../../components/CTAButton";
import NavBarWallet from "./NavBarWallet";
import CloseIcon from "@/components/icons/CloseIcon";

export default function NavBar() {
  const { openDrawer, closeDrawer, walletConnection, isDrawerOpen } =
    useAppContext();

  return (
    <header
      className={`flex justify-between items-center
        w-full h-16 lg:h-20
        z-[100] fixed
        border-b border-secondary
      bg-primary shadow-[0px_15px_12px_-20px_rgba(0,0,0,0.5)]`}
    >
      <Link href="/">
        <StellarCarbonIcon className="pl-[4vw] text-accent" />
      </Link>

      {/* hidden on mobile */}
      <div className="mr-6 gap-4 items-center hidden lg:flex">
        <TopBarLink href="/">Home</TopBarLink>
        <TopBarLink href="/explain">Explain</TopBarLink>
        <TopBarLink href="/projects">Projects</TopBarLink>
        <TopBarLink href="/transactions">Transactions</TopBarLink>
        <TopBarLink href="/software">Software</TopBarLink>
        <TopBarLink href="/about">About us</TopBarLink>
        <div className="w-4"></div>
        {walletConnection ? <NavBarWallet /> : <CTAButton />}
      </div>

      {/* hidden on larger screens */}
      {isDrawerOpen ? (
        <button className={`text-accent p-[3vw]`} onClick={closeDrawer}>
          <CloseIcon />
        </button>
      ) : (
        <HamburgerButton
          className="p-[4vw] lg:hidden text-accent"
          onClick={openDrawer}
        />
      )}
    </header>
  );
}
