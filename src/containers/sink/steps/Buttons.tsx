import { PropsWithChildren } from "react";

export default function SinkingStepButtons({ children }: PropsWithChildren) {
  return (
    <div className="h-16 md:my-3 flex items-center justify-between gap-6 w-full">
      {children}
    </div>
  );
}
