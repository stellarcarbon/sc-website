import { ReactNode } from "react";
import LandingSectionHeader from "./LandingSectionHeader";

export default function LandingSection({
  first,
  second,
  third,
  header,
  className,
}: {
  first: ReactNode;
  second: ReactNode;
  third?: ReactNode;
  header?: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-darkest border-y border-tertiary
    z-[10] w-full py-12 pb-14 m-auto px-3 md:px-[5%]
    ${className}
    `}
    >
      <div className="px-4 text-4xl font-bold leading-tight tracking-light mb-2">
        {header}
      </div>
      <div
        className={`grid md:grid-cols-2
        tracking-wide leading-7 text-lg gap-4
`}
      >
        <div className="flex items-start justify-center">{first}</div>
        <div className="flex items-start justify-center">{second}</div>
      </div>
      {third && <div className="px-4 mt-12">{third}</div>}
    </div>
  );
}
