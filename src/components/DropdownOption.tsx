import { HTMLAttributes, PropsWithChildren } from "react";

export default function DropdownOption({
  children,
  onClick,
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      onClick={onClick}
      className="p-2 px-2 hover:bg-secondary rounded cursor-pointer"
    >
      {children}
    </div>
  );
}
