import { HTMLProps } from "react";
import HamburgerIcon from "../icons/HamburgerIcon";

interface HamburgerButtonProps extends HTMLProps<HTMLButtonElement> {}

export default function HamburgerButton({
  onClick,
  className,
}: HamburgerButtonProps) {
  return (
    <button onClick={onClick} className={`${className}`}>
      <HamburgerIcon />
    </button>
  );
}
