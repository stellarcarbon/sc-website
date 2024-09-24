"use client";

import Button from "@/components/Button";
import WalletConnectionInfo from "@/components/dashboard/WalletConnectionInfo";
import DemoEmissionCalculator from "@/containers/demo/DemoEmissionCalculator";
import DemoWalletConnectionInfo from "@/containers/demo/DemoWalletConnectionInfo";
import { useRouter } from "next/navigation";

export default function DemoPage() {
  return <DemoEmissionCalculator />;
}
