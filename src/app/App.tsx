"use client";

import "../styles/globals.css";

import Drawer from "@/components/Drawer";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import { useAppContext } from "@/context/appContext";
import DemoApp from "./DemoApp";

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
      <TopBar />
      <div className="grow text-textColor w-full">{children}</div>
      <Footer />
    </div>
  );
}
