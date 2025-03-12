import { HTMLProps } from "react";

export default function Header({ children }: HTMLProps<HTMLHeadingElement>) {
  return (
    <div className="flex flex-col tracking-wide leading-7 px-4 mt-8">
      <h2 className="text-3xl font-noto flex items-center">{children}</h2>
      <hr className="my-4 mb-6 w-[100px] border-2 border-accentSecondary" />
    </div>
  );
}
