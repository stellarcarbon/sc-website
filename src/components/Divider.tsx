import { HTMLProps } from "react";

interface DividerProps extends HTMLProps<HTMLHRElement> {}

export default function Divider({ className = "" }: DividerProps) {
  return (
    <hr className={`${className} w-[90%] md:w-[80%] mx-auto border-tertiary`} />
  );
}
