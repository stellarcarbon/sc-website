import { PropsWithChildren } from "react";

export default function DashboardHeader({ children }: PropsWithChildren) {
  return (
    <div className="text-xl mb-2">
      <div>{children}</div>
      <hr className="mt-1 border border-accentSecondary w-[110px]" />
    </div>
  );
}
