"use client";

import "../globals.css";

import NavBar from "@/containers/navbar/NavBar";
import DemoApp from "../containers/demo/DemoApp";
import { SinkingContextProvider } from "@/context/SinkingContext";
import appConfig from "@/config";

export default function App({ children }: { children: React.ReactNode }) {
  if (appConfig.demo) {
    return (
      <DemoApp>
        <SinkingContextProvider>{children}</SinkingContextProvider>
      </DemoApp>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-primary flex flex-col">
      <NavBar />
      <SinkingContextProvider>
        <div
          id="app_container"
          className="flex-1 mt-[64px] lg:mt-[80px] flex flex-col text-textColor w-full"
        >
          {children}
        </div>
      </SinkingContextProvider>
    </div>
  );
}
