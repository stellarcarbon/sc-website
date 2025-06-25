"use client";

import ConnectWalletCTA from "@/components/ConnectWalletCTA";
import SinkingForm from "@/containers/sink/SinkingForm";
import { useAppContext } from "@/context/appContext";

export default function SinkFormPage() {
  const { walletConnection } = useAppContext();

  return (
    <>
      {walletConnection === undefined ? (
        <ConnectWalletCTA />
      ) : (
        <div className="mt-6"></div>
      )}
      <SinkingForm />
    </>
  );
}
