import { ReactNode } from "react";

export default function LandingSection({
  first,
  second,
}: {
  first: ReactNode;
  second: ReactNode;
}) {
  return (
    <div
      className={`grid md:grid-cols-2
        z-[10]
        tracking-wide leading-7 text-lg
        bg-darkest border-y border-tertiary
        py-12 m-auto px-3 md:px-[5%]`}
    >
      {first}
      {second}
    </div>
  );
}
