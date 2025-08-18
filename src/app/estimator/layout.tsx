import EstimatorNavBar from "@/containers/estimator/EstimatorNavBar";
import { ReactNode } from "react";

export default function EstimatorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="lg:flex flex-col items-center bg-forestling bg-cover bg-fixed flex-1">
      <main
        className="bg-darkest lg:border border-tertiary lg:rounded
          min-h-[calc(100dvh-64px)] md:min-h-[60vh]
          flex flex-col items-center justify-start
          lg:max-w-[790px] lg:w-[70vw]
          lg:m-6 pb-8"
      >
        <EstimatorNavBar />
        {children}
      </main>
    </div>
  );
}
