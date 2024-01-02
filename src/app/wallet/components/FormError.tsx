import { ReactNode } from "react";

export default function FormError({ children }: { children: ReactNode }) {
  return <p className="text-red-500">{children}</p>;
}
