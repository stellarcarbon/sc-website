import { HTMLProps, ReactNode } from "react";

interface ButtonProps extends HTMLProps<HTMLButtonElement> {}

export default function Button({
  onClick,
  disabled = false,
  children,
  className = "",
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded-lg border border-gray shadow-md px-5 py-4 
      ${
        disabled
          ? "bg-gray-100 text-gray-300"
          : "bg-white text-black transition-colors hover:border-gray-300 hover:bg-blue-50 hover:text-black hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      } ${className}`}
    >
      {children}
    </button>
  );
}
