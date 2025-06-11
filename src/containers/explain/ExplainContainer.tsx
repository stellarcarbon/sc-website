import { HTMLProps } from "react";

export default function ExplainContainer({
  children,
}: HTMLProps<HTMLDivElement>) {
  return (
    <div className="flex flex-col pb-12 p-4 w-full max-w-[1400px]">
      {children}
    </div>
  );
}
