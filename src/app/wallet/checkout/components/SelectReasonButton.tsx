import { HTMLProps } from "react";

interface SelectReasonButtonProps extends HTMLProps<HTMLButtonElement> {
  isSelected: boolean;
}

export default function SelectReasonButton({
  onClick,
  disabled = false,
  children,
  isSelected,
  className,
}: SelectReasonButtonProps) {
  return (
    <button
      type="button"
      className={`shadow-md p-2 border w-16 h-16 ${
        isSelected ? " border-black bg-blue-100" : "bg-white"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
