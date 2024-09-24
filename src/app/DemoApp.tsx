"use client";

import DemoLanding from "@/containers/demo/DemoLanding";
import DemoWalletConnectionInfo from "@/containers/demo/DemoWalletConnectionInfo";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function DemoApp({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <DemoLanding />;
  } else {
  }

  return (
    <>
      <div className="fixed top-0 left-0 flex items-start justify-center z-[200] w-screen h-[100dvh] bg-dalle bg-no-repeat bg-cover"></div>
      <div className="flex items-start justify-center min-h-[100dvh]">
        <div className="md:my-16 relative bg-primary w-[100%] md:w-[60%] max-w-[800px] min-h-[80%] shadow-xl md:rounded-md border border-tertiary z-[2000] text-white flex flex-col items-center">
          <DemoWalletConnectionInfo />
          {children}
        </div>
      </div>
    </>
  );
}
