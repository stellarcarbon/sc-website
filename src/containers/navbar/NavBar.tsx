"use client";

import Link from "next/link";
import TopBarLink from "../../components/TopBarLink";
import { useAppContext } from "@/context/appContext";
import HamburgerButton from "../../components/HamburgerButton";
import StellarCarbonIcon from "../../components/icons/StellarCarbonIcon";
import CTAButton from "../../components/CTAButton";
import NavBarWallet from "./NavBarWallet";
import CloseIcon from "@/components/icons/CloseIcon";
import Drawer from "@/components/Drawer";

export default function NavBar() {
  const { openDrawer, closeDrawer, walletConnection, isDrawerOpen } =
    useAppContext();

  return (
    <div className="z-[100] fixed w-full">
      <header
        className={`flex justify-start items-center
        h-16 lg:h-20
        border-b border-secondary
      bg-primary shadow-[0px_15px_12px_-20px_rgba(0,0,0,0.5)]`}
      >
        <Link className="mx-4" href="/">
          <StellarCarbonIcon className=" text-accent" />
        </Link>

        {/* hidden on mobile */}
        <div className="ml-10 gap-10 items-center hidden lg:flex">
          <TopBarLink href="/">Home</TopBarLink>
          <TopBarLink href="/explain">Explain</TopBarLink>
          <TopBarLink href="/projects">Projects</TopBarLink>
          <TopBarLink href="/transactions">Transactions</TopBarLink>
          <TopBarLink href="/software">Software</TopBarLink>
          <TopBarLink href="/about">About us</TopBarLink>
          <div className="w-4"></div>
          {/* {walletConnection ? <NavBarWallet /> : <CTAButton />} */}
        </div>

        <div className="flex-1 flex items-center justify-end md:pr-6">
          {/* hidden on larger screens */}
          {!isDrawerOpen && (walletConnection ? <NavBarWallet /> : <></>)}
          <div className="md:hidden">
            {isDrawerOpen ? (
              <button
                className={`text-accent h-16 w-16 flex items-center justify-center`}
                onClick={closeDrawer}
              >
                <CloseIcon />
              </button>
            ) : (
              <HamburgerButton className="" onClick={openDrawer} />
            )}
          </div>
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
