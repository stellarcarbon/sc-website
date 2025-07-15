import { HTMLProps } from "react";

export default function Paragraph({
  children,
  ...props
}: HTMLProps<HTMLParagraphElement>) {
  return (
    <div
      className={`tracking-wide px-4 pb-6 leading-6 text-base md:text-lg ${props.className}`}
    >
      {children}
    </div>
  );
}
