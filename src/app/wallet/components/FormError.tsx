import { HTMLProps, ReactNode } from "react";

export default function FormError({
  children,
  className,
}: HTMLProps<HTMLParagraphElement>) {
  return <p className={`text-red-500 ${className}`}>{children}</p>;
}
