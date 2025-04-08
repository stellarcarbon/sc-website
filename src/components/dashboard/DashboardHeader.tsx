import { PropsWithChildren } from "react";

export default function DashboardHeader({ children }: PropsWithChildren) {
  return (
    <div className="text-xl mb-3">
      <div className="text-start font-semibold">{children}</div>
      <hr className="mt-1 border-b border-accentSecondary  w-[50%]" />
    </div>
  );
}
