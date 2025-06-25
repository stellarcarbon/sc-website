import { PropsWithChildren } from "react";

export default function ModalHeader({ children }: PropsWithChildren) {
  return (
    <div className="bg-secondary h-14 text-2xl flex items-center justify-center w-full px-3 md:px-4">
      {children}
    </div>
  );
}
