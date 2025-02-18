import { ReactNode } from "react";

export default function KeyValueEntry({
  mkey,
  children,
}: {
  mkey: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="font-bold flex gap-4 justify-between items-center border-b border-b-tertiary">
        <span className="text-base md:text-lg">{mkey}</span>
        <span className="font-normal text-sm">{children}</span>
      </div>
    </div>
  );
}
