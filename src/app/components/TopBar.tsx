"use client";

import Link from "next/link";
import TopBarLink from "./TopBarLink";
import { usePathname } from "next/navigation";
import { useAppContext } from "../context/appContext";

export default function TopBar() {
  const pathname = usePathname();

  const { walletConnection } = useAppContext();

  return (
    <header
      className={`flex w-full justify-between items-center  h-20 z-10 relative border-b shadow-[0_15px_10px_-15px_rgba(0,0,0,0.5)]
        ${
          pathname.includes("/wallet")
            ? "!bg-primary border-secondary"
            : "bg-white border-gray-50"
        }
    `}
    >
      <img className="h-10 ml-[5vw]" src="/stellarcarbon-heading.png" />
      <div className="mr-[5vw] flex gap-4">
        <TopBarLink href="/">Home</TopBarLink>
        <TopBarLink
          href={`${walletConnection ? "/wallet" : "/wallet/connect"}`}
        >
          Wallet
        </TopBarLink>
      </div>
    </header>
  );
}
