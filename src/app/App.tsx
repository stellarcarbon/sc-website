"use client";

import "../styles/globals.css";

import Drawer from "@/components/Drawer";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import { useAppContext } from "@/context/appContext";

export default function App({ children }: { children: React.ReactNode }) {
  const { isDrawerOpen } = useAppContext();

  if (isDrawerOpen) {
    return <Drawer />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <div className="grow bg-gray-50">{children}</div>
      <Footer />
    </div>
  );
}
