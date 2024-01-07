"use client";

import { useAppContext } from "@/app/context/appContext";
import SelectWallet from "../containers/SelectWallet";
import ContactInfo from "../containers/ContactInfo";
import { useRouter } from "next/navigation";

export default function Connect() {
  const { supportedWallets, walletConnection } = useAppContext();

  const router = useRouter();

  if (walletConnection?.isAnonymous || walletConnection?.personalDetails) {
    // router.push("/wallet");
  }

  return (
    <main className="flex flex-col items-center justify-start md:py-6 min-h-[calc(100vh-80px)] md:min-h-0">
      {supportedWallets.length === 0 && <div>Loading...</div>}
      {supportedWallets.length > 0 && !walletConnection && <SelectWallet />}
      {walletConnection && <ContactInfo />}
    </main>
  );
}
