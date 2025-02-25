"use client";

import "../styles/globals.css";

import Drawer from "@/components/Drawer";
import Footer from "@/components/Footer";
import NavBar from "@/containers/navbar/NavBar";
import { useAppContext } from "@/context/appContext";
import DemoApp from "../containers/demo/DemoApp";
import { SinkingContextProvider } from "@/context/SinkingContext";

export default function App({ children }: { children: React.ReactNode }) {
  const { isDrawerOpen, appConfig } = useAppContext();

  if (appConfig.demo) {
    return (
      <DemoApp>
        <SinkingContextProvider>{children}</SinkingContextProvider>
      </DemoApp>
    );
  }

  if (isDrawerOpen) {
    return <Drawer />;
  }

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      <NavBar />
      <SinkingContextProvider>
        <div className="flex-1 mt-[64px] lg:mt-[80px] flex flex-col text-textColor w-full">
          {children}
        </div>
      </SinkingContextProvider>
      <Footer />
    </div>
  );
}
