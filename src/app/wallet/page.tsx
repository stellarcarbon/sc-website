"use client";
import { useAppContext } from "../context/appContext";
import Button from "@/app/components/Button";
import SelectWallet from "./containers/SelectWallet";
import PubKeyDisplay from "./components/PubKeyDisplay";
import DisconnectWalletButton from "./components/DisconnectWalletButton";
import PersonalDetailsDisplay from "./components/PersonalDetailsDisplay";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { time } from "console";
import Dashboard from "./containers/Dashboard";

export default function WalletPage() {
  const { walletConnection, supportedWallets } = useAppContext();

  const router = useRouter();

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Redirect to /connect if no wallet connection is found in localStorage within 3000ms
    if (!walletConnection && typeof window !== "undefined") {
      timeoutIdRef.current = setTimeout(() => {
        window.location.replace("/wallet/connect");
      }, 3000);
    }
    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, []);

  useEffect(() => {
    if (walletConnection && timeoutIdRef.current) {
      console.log("clear timeout!", timeoutIdRef.current);
      clearTimeout(timeoutIdRef.current);
    }
  }, [walletConnection]);

  return (
    <main className="flex flex-col bg-primary items-center justify-start md:py-6 min-h-[calc(100vh-80px)]">
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
