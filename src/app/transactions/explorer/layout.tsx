import { ReactNode } from "react";

export default function TransactionExplorerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="lg:flex lg:flex-col lg:items-center
lg:bg-dalle lg:bg-cover lg:bg-fixed
lg:min-h-[calc(100dvh-176px)]"
    >
      <main
        className="bg-secondary

  h-[calc(100dvh-160px)]
  lg:h-auto lg:w-[850px]

  lg:border border-tertiary
  flex flex-col items-center justify-start

  lg:rounded
  lg:m-6
"
      >
        {children}
      </main>
    </div>
  );
}
