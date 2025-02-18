import { HTMLProps } from "react";

export default function Paragraph({
  children,
}: HTMLProps<HTMLParagraphElement>) {
  return <p className="mt-1 tracking-wide leading-7">{children}</p>;
}
