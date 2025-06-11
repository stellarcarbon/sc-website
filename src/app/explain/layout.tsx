"use client";

import Banner from "@/components/Banner";
import ExplainContainer from "@/containers/explain/ExplainContainer";
import ExplainNav from "@/containers/explain/ExplainNav";
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
        <div className="h-[calc(100vh-80px-300px)] flex w-full border-t border-secondary">
          <ExplainNav />
          <div className="bg-darkest flex-1 overflow-y-auto">
            <ExplainContainer>{children}</ExplainContainer>
          </div>
        </div>
      </ExplainContextProvider>
    </main>
  );
}
