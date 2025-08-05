"use client";

import Banner from "@/components/Banner";
import ExplainContainer from "@/containers/explain/ExplainContainer";
import ExplainMobile from "@/containers/explain/ExplainMobile";
import ExplainNav from "@/containers/explain/ExplainNav";
import ExplainBreadcrumb from "@/containers/explain/ExplainBreadcrumb";
import { ExplainContextProvider } from "@/context/ExplainContext";

export default function ExplainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center font-noto bg-darkest flex-1">
      <Banner
        title="Stellarcarbon"
        subtitle="Explained"
        background="whale-bg"
      />

      <ExplainContextProvider>
        <div className="hidden md:flex h-[calc(100vh-80px-200px)] w-full">
          <ExplainNav />

          <div className="bg-darkest flex-1 overflow-y-auto overflow-x-clip">
            <ExplainContainer>{children}</ExplainContainer>
          </div>
        </div>
        <div className="md:hidden w-full flex-1">
          <ExplainMobile>{children}</ExplainMobile>
        </div>
      </ExplainContextProvider>
    </main>
  );
}
