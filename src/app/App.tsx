"use client";

import "../styles/globals.css";

import Drawer from "@/components/Drawer";
import Footer from "@/components/Footer";
import NavBar from "@/containers/navbar/NavBar";
import { useAppContext } from "@/context/appContext";
import DemoApp from "../containers/demo/DemoApp";
import StellarCarbonIcon from "@/components/icons/StellarCarbonIcon";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";

export default function App({ children }: { children: React.ReactNode }) {
  const { isDrawerOpen, appConfig } = useAppContext();

  if (appConfig.demo) {
    return <DemoApp>{children}</DemoApp>;
  }

  if (isDrawerOpen) {
    return <Drawer />;
  }

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      <NavBar />
      <div className="flex-1 mt-[64px] md:mt-[80px] flex flex-col text-textColor w-full">
        {children}
      </div>
      <Footer />
    </div>
  );
}
