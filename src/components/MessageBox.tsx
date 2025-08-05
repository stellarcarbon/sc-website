import { PropsWithChildren } from "react";

export default function MessageBox({ children }: PropsWithChildren) {
  return (
    <div className="bg-secondary p-4 rounded border border-accentSecondary">
      {children}
    </div>
  );
}
