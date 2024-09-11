"use client";

import ExplainConnect from "@/containers/ExplainConnect";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/appContext";
import { Blocks } from "react-loader-spinner";
import { useSCRouter } from "@/app/utils";
import Modal from "@/components/Modal";
import ConnectLanding from "@/containers/ConnectLanding";

export default function WalletPage() {
  const router = useSCRouter();
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

  // return <Modal>Hallo</Modal>;

  return <ConnectLanding />;
}
