import { PropsWithChildren } from "react";

export default function SinkingStep({ children }: PropsWithChildren) {
  return (
    <div className="mt-6 h-full flex flex-col justify-start">{children}</div>
  );
}
