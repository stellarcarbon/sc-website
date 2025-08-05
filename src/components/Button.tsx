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
      className={`flex justify-center items-center gap-2
        bg-white rounded-md shadow-md
        py-2 px-3
        border border-accent
      ${
        disabled
          ? " !text-gray-500 opacity-30"
          : `text-black transition-colors
          active:bg-primary active:text-white
          hover:bg-darker hover:text-white`
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
