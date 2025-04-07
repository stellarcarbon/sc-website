import { PropsWithChildren } from "react";

export default function DashboardHeader({ children }: PropsWithChildren) {
  return (
    <div className="text-xl mb-3">
      <div>{children}</div>
      <hr className="mt-2 border-2 border-accentSecondary w-[100px]" />
    </div>
  );
}
