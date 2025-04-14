import { HTMLProps } from "react";

export default function ContentContainer({
  children,
}: HTMLProps<HTMLDivElement>) {
  return (
    <div className="flex flex-col pb-12 pt-4 w-full md:max-w-[1080px] md:m-auto">
      {children}
    </div>
  );
}
