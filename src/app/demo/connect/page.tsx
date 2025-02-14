"use client";

import { ConnectWalletContextProvider } from "@/containers/connect_wallet/ConnectWalletContext";
import ConnectWalletForm from "@/containers/connect_wallet/ConnectWalletForm";

export default function DemoConnectPage() {
  return (
    <ConnectWalletContextProvider>
      <ConnectWalletForm />
    </ConnectWalletContextProvider>
  );
}
