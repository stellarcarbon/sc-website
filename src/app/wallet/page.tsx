"use client";

import { useRouter } from "next/navigation";
import ExplainConnect from "./ExplainConnect";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/appContext";
import { Blocks } from "react-loader-spinner";

export default function WalletPage() {
  const router = useRouter();
  const { walletConnection } = useAppContext();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = () => {
    router.push("/wallet/connect");
  };

  useEffect(() => {
    if (walletConnection) {
      router.push("/dashboard");
    } else {
      setIsLoading(false);
    }
  }, [walletConnection, router]);

  return (
    <main className="flex flex-col justify-center blockchain-bg bg-no-repeat bg-fixed bg-cover items-center md:py-6 min-h-[calc(100vh-176px)]">
      {isLoading ? <Blocks /> : <ExplainConnect onClick={navigate} />}
    </main>
  );
}
