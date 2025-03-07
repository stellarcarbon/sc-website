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
        ${
          disabled
            ? "text-gray-500 opacity-30"
            : `text-black transition-colors
            active:bg-primary active:text-white
            hover:border-gray-300 hover:bg-accentSecondary hover:text-white hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`
        }
        ${className}`}
    >
      {children}
    </button>
  );
}
