import { HTMLProps } from "react";

export default function FormError({
  children,
  className,
}: HTMLProps<HTMLParagraphElement>) {
  return (
    <span className={`text-red-500 whitespace-pre-wrap ${className}`}>
      {children}
    </span>
  );
}
