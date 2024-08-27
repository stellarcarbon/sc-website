import { HTMLProps } from "react";

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
      className={`flex justify-center items-center rounded-md shadow-md py-2 px-5 bg-accent
      ${
        disabled
          ? " text-gray-500 opacity-30"
          : " text-black transition-colors active:bg-primary active:text-white hover:border-gray-300 hover:bg-accentSecondary hover:text-white hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      } ${className}`}
    >
      {children}
    </button>
  );
}
