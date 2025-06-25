import { PropsWithChildren } from "react";

export default function SectionHeader({ children }: PropsWithChildren) {
  return (
    <div className="bg-secondary font-bold h-14 text-xl flex items-center justify-between w-full px-3 md:px-4">
      {children}
    </div>
  );
}
