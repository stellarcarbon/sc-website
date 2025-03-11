import { HTMLProps } from "react";

export default function ContentContainer({
  children,
}: HTMLProps<HTMLDivElement>) {
  return (
    <div className="flex flex-col p-0 py-12 w-full md:max-w-[1080px] md:m-auto">
      {children}
    </div>
  );
}
