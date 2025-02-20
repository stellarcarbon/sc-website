import { PropsWithChildren } from "react";

export default function SinkingStep({ children }: PropsWithChildren) {
  return (
    <div className="h-[90%] p-4 gap-8 md:gap-12 flex flex-col justify-center items-center">
      {children}
    </div>
  );
}
