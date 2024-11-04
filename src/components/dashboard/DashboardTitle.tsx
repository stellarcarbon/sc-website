import { useAppContext } from "@/context/appContext";
import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";
import { ReactNode } from "react";

export default function DashboardTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="my-8 md:my-12 self-center text-xl md:text-2xl font-semibold">
      {children}
    </h1>
  );
}
