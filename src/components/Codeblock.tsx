import { ReactNode } from "react";

export default function Codeblock({ children }: { children: ReactNode }) {
  return <pre className="my-4 p-4 bg-primary overflow-x-auto"><code>{children}</code></pre>;
}
