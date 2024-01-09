"use client";
import { useAppContext } from "../context/appContext";
import Button from "@/app/components/Button";
import SelectWallet from "./containers/SelectWallet";
import PubKeyDisplay from "./components/PubKeyDisplay";
import DisconnectWalletButton from "./components/DisconnectWalletButton";
import PersonalDetailsDisplay from "./components/PersonalDetailsDisplay";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { time } from "console";
import Dashboard from "./containers/Dashboard";

export default function WalletPage() {
  const { walletConnection, supportedWallets, closeDrawer } = useAppContext();

  const router = useRouter();
  const pathname = usePathname();

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Scroll to top on mount
    window.scroll({ top: 0 });
  }, []);

  useEffect(() => {
    if (walletConnection && timeoutIdRef.current) {
      console.log("clear timeout!", timeoutIdRef.current);
      clearTimeout(timeoutIdRef.current);
    }
  }, [walletConnection]);

  return (
    <main className="flex flex-col bg-primary items-center justify-start md:py-6 min-h-[calc(100vh-176px)]">
      {/* <h1 className="text-2xl">Wallet Page</h1> */}
      {walletConnection ? (
        <Dashboard />
      ) : supportedWallets.length > 0 ? (
        <SelectWallet />
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
