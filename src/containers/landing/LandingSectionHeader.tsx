import { PropsWithChildren } from "react";

export default function LandingSectionHeader({ children }: PropsWithChildren) {
  return (
    <div className="text-3xl mb-4 px-4">
      <div>{children}</div>
      <hr className="mt-4 w-[100px] border-2 border-accentSecondary" />
    </div>
  );
}
