import { HTMLProps } from "react";

export default function Paragraph({
  children,
}: HTMLProps<HTMLParagraphElement>) {
  return <div className="tracking-wide px-4 pb-6 leading-7">{children}</div>;
}
