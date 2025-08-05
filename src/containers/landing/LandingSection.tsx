import { ReactNode } from "react";

export default function LandingSection({
  first,
  second,
  third,
  className,
}: {
  first: ReactNode;
  second: ReactNode;
  third?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-darkest border-y border-tertiary
    z-[10] w-full py-12 m-auto px-1 md:px-[5%] md:py-20
    ${className}
    `}
    >
      <div
        className={`grid md:grid-cols-2
        tracking-wide leading-7 text-lg gap-4
`}
      >
        <div className="flex items-start justify-center">{first}</div>
        <div className="flex items-center justify-center">{second}</div>
      </div>
      {third && <div className="px-4">{third}</div>}
    </div>
  );
}
