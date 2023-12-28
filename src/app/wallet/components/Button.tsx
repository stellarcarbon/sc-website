import { ReactNode } from "react";

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
};

export default function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg border border-white bg-white px-5 py-4 transition-colors hover:border-gray-300 hover:bg-transparent hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      {children}
    </button>
  );
}
