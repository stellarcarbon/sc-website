import { PropsWithChildren } from "react";

export default function DashboardHeader({ children }: PropsWithChildren) {
  return (
    <>
      <div className="mb-0">
        <div className="text-xl  font-semibold tracking-wider">{children}</div>
        <div className="mt-1 h-0.5 w-1/2 bg-accentSecondary rounded-full" />
        {/* <div className="mt-1 h-0.5 w-1/2 bg-accent rounded-full" /> */}
      </div>
    </>
  );
}
