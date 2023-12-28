import { ReactNode } from "react";

type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
};

export default function Button({
  onClick,
  disabled = false,
  children,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`rounded-lg border border-white px-5 py-4  ${
        disabled
          ? "bg-transparent text-gray-500"
          : "  bg-white text-black transition-colors hover:border-gray-300 hover:bg-transparent hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      }`}
    >
      {children}
    </button>
  );
}
