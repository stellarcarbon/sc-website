import { HTMLProps } from "react";

export default function Header({ children }: HTMLProps<HTMLHeadingElement>) {
  return (
    <div className="flex flex-col tracking-wide leading-7">
      <h2 className="text-3xl font-noto">{children}</h2>
      <hr className="my-8 w-[100px] border-2 border-accentSecondary" />
    </div>
  );
}
