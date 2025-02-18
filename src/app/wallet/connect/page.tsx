"use client";

import { ConnectWalletContextProvider } from "@/context/ConnectWalletContext";
import ConnectWalletForm from "@/containers/connect_wallet/ConnectWalletForm";

export default function Connect() {
  return (
    <ConnectWalletContextProvider>
      <ConnectWalletForm />
    </ConnectWalletContextProvider>
  );
}
