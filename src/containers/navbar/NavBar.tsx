"use client";

import Link from "next/link";
import TopBarLink from "../../components/TopBarLink";
import { useAppContext } from "@/context/appContext";
import HamburgerButton from "../../components/HamburgerButton";
import StellarCarbonIcon from "../../components/icons/StellarCarbonIcon";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CTAButton from "../../components/CTAButton";
import WalletConnectionInfoSmall from "@/components/WalletConnectionInfoSmall";
import NavBarWallet from "./NavBarWallet";

export default function NavBar() {
  const { openDrawer, walletConnection } = useAppContext();
  const pathname = usePathname();
  const [scrollPosition, setScrollPosition] = useState<number>();
  const [initial, setInitial] = useState<boolean>(true);

  useEffect(() => {
    function updateScrollPosition() {
      const pos = window.scrollY;
      setScrollPosition(pos);
      setInitial(false);
    }

    window.addEventListener("scroll", updateScrollPosition);

    return () => {
      window.removeEventListener("scroll", updateScrollPosition);
    };
  }, []);

  return (
    <header
      className={`flex w-full justify-between items-center h-14 md:h-20 z-[100] fixed
      border-b shadow-[0px_15px_12px_-20px_rgba(0,0,0,0.5)]
    bg-primary border-secondary ${
      pathname === "/"
        ? scrollPosition === 0 || scrollPosition === undefined
          ? initial
            ? "hidden"
            : "animate-hidetopbar"
          : "animate-showtopbar"
        : ""
    }`}
    >
      <Link href="/">
        <StellarCarbonIcon className="pl-[4vw] text-accent" />
      </Link>

      <div className="mr-6 gap-4 items-center hidden md:flex">
        <TopBarLink href="/">Home</TopBarLink>
        <TopBarLink href="/explain">Explain</TopBarLink>
        <TopBarLink href="/projects">Projects</TopBarLink>
        <TopBarLink href="/transactions">Transactions</TopBarLink>
        <TopBarLink href="/about">About us</TopBarLink>
        <div className="w-4"></div>
        {walletConnection ? <NavBarWallet /> : <CTAButton />}
      </div>
      <HamburgerButton
        className="p-[4vw] md:hidden text-accent"
        onClick={openDrawer}
      />
    </header>
  );
}
