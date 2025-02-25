"use client";

import { useAppContext } from "@/context/appContext";
import CloseIcon from "./icons/CloseIcon";
import DrawerLink from "./DrawerLink";
import { usePathname } from "next/navigation";
import CTAButton from "./CTAButton";
import StellarCarbonIcon from "./icons/StellarCarbonIcon";
import Link from "next/link";
import { useSCRouter } from "@/utils";
import WalletConnectionInfoSmall from "./WalletConnectionInfoSmall";
import Button from "./Button";
import CARBONCurrencyIcon from "./icons/CARBONCurrencyIcon";
import WalletConnectionInfo from "./WalletConnectionInfo";
import { useCallback, useEffect } from "react";
import StellarPubKey from "./dashboard/StellarPubKey";
import NavBarWallet from "@/containers/navbar/NavBarWallet";
import DrawerWallet from "./DrawerWallet";

export default function Drawer() {
  const { closeDrawer, walletConnection, disconnectWallet, isDrawerOpen } =
    useAppContext();
  const pathname = usePathname();
  const router = useSCRouter();

  return (
    <div className="flex flex-col min-w-screen min-h-screen bg-primary border-secondary">
      <div className="flex justify-between items-center pl-[4vw] pr-[12px] h-16 md:h-20 border-b shadow-[0px_15px_12px_-20px_rgba(0,0,0,0.5)] border-secondary">
        <Link href="/">
          <StellarCarbonIcon className="text-accent" />
        </Link>
        <button className={`text-accent`} onClick={closeDrawer}>
          <CloseIcon />
        </button>
      </div>

      <div className="flex flex-col mt-4 mb-2">
        <DrawerLink href="/">Home</DrawerLink>
        <DrawerLink href="/explain">What is Stellarcarbon?</DrawerLink>
        <DrawerLink href="/projects">Current projects</DrawerLink>
        <DrawerLink href="/transactions">Transactions</DrawerLink>
        <DrawerLink href="/software">Software ecosystem</DrawerLink>
        <DrawerLink href="/about">About us</DrawerLink>
      </div>

      <hr className="w-full my-4 mb-8 border-secondary" />

      {walletConnection && <DrawerWallet />}

      {!walletConnection && (
        <CTAButton
          className="self-center"
          onClick={() => {
            if (pathname === "/dashboard") {
              // In case already on that path, have to close the Drawer from here.
              closeDrawer();
            } else {
              router.push("/dashboard");
            }
          }}
        />
      )}
    </div>
  );
}
