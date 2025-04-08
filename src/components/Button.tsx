import { HTMLProps } from "react";

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
}

export default function Button({
  onClick,
  disabled = false,
  children,
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`flex justify-center items-center gap-2 rounded-md shadow-md py-2 px-4 bg-accent
      ${
        disabled
          ? " text-gray-500 opacity-30"
          : " text-black transition-colors active:bg-primary active:text-white hover:border-gray-300 hover:bg-accentSecondary hover:text-white hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
