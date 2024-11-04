import { HTMLProps } from "react";

export default function FormError({
  children,
  className,
}: HTMLProps<HTMLParagraphElement>) {
  return (
    <p className={`text-red-500 py-2 whitespace-pre-wrap ${className}`}>
      {children}
    </p>
  );
}
