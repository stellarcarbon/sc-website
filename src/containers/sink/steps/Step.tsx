import { PropsWithChildren } from "react";

export default function SinkingStep({ children }: PropsWithChildren) {
  return (
    <div className="mt-8 h-full flex flex-col justify-start items-center min-h-[400px] md:min-h-[480px]">
      {children}
    </div>
  );
}
