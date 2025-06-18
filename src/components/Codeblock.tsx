import { ReactNode } from "react";

export default function Codeblock({ children }: { children: ReactNode }) {
  return <div className="p-4 font-mono bg-primary">{children}</div>;
}
