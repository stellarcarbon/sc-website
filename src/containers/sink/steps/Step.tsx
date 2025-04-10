import ModalHeader from "@/components/ModalHeader";
import SectionHeader from "@/components/SectionHeader";
import { PropsWithChildren, ReactNode } from "react";

export default function SinkingStep({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="h-full flex flex-col justify-start gap-4">
      <ModalHeader>{title}</ModalHeader>
      <div className="p-4 flex flex-col">{children}</div>
    </div>
  );
}
