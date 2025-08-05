import { HTMLProps } from "react";

export default function IconButton({
  onClick,
  disabled = false,
  children,
  className = "",
}: HTMLProps<HTMLButtonElement>) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex justify-center items-center
        bg-accent rounded-md shadow-md 
        h-8 w-8 text-base
        border border-accent
        ${
          disabled
            ? "text-gray-500 opacity-30"
            : `text-black transition-colors
            active:bg-primary active:text-white
            hover:bg-primary hover:text-white`
        }
        ${className}`}
    >
      {children}
    </button>
  );
}
