import { ReactNode } from "react";

export default function DashboardTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="self-center text-2xl md:text-2xl font-semibold">
      {children}
    </h1>
  );
}
