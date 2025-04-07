import { PropsWithChildren } from "react";

export default function ModalHeader({ children }: PropsWithChildren) {
  return (
    <div className="text-2xl mb-4 text-center mx-auto">
      <div className="px-4">{children}</div>
      <hr className="mt-2 border-2 border-accentSecondary" />
    </div>
  );
}
