import ModalHeader from "@/components/ModalHeader";
import { ReactNode } from "react";

export default function RoundingStep({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="h-full ">
      <ModalHeader>{title}</ModalHeader>
      <div className="p-4 my-4 flex flex-col items-center gap-4 text-lg font-semibold">
        {children}
      </div>
    </div>
  );
}
