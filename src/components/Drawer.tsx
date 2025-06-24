"use client";

import { useAppContext } from "@/context/appContext";
import DrawerLink from "./DrawerLink";
import CTAButton from "./CTAButton";
import DrawerWallet from "./DrawerWallet";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Drawer() {
  const { isDrawerClosing, walletConnection } = useAppContext();

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scrolling
    return () => {
      document.body.style.overflow = ""; // Re-enable scrolling when unmounting
    };
  }, []);

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isDrawerClosing ? "-100%" : 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="absolute top-0 left-0 z-[50]"
    >
      <div className="flex flex-col w-screen min-h-[calc(100dvh-64px)] bg-darker border-secondary relative overflow-y-auto">
        <div className="flex flex-col my-4">
          <DrawerLink href="/">Home</DrawerLink>
          <DrawerLink href="/explain">What is Stellarcarbon?</DrawerLink>
          <DrawerLink href="/projects">Current projects</DrawerLink>
          <DrawerLink href="/transactions">Transactions</DrawerLink>
          <DrawerLink href="/software">Software integration</DrawerLink>
          {/* <DrawerLink href="/about">About us</DrawerLink> */}
        </div>

        {walletConnection && <DrawerWallet />}

        {!walletConnection && (
          <div className="flex-1 bg-darker flex flex-col items-center pt-8">
            <CTAButton white />
          </div>
        )}
      </div>
    </motion.div>
  );
}
