import { HTMLProps } from "react";

export default function Subheader({ children }: HTMLProps<HTMLHeadingElement>) {
  return <span className="text-2xl px-4 mb-3">{children}</span>;
}
