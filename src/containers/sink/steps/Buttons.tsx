import { PropsWithChildren } from "react";

export default function SinkingStepButtons({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center justify-between gap-6 w-full">
      {children}
    </div>
  );
}
