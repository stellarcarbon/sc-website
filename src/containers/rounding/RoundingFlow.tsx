import { ReactNode, useEffect } from "react";
import RoundingSuccess from "./steps/Success";
import Modal from "@/components/Modal";
import { RoundDownSteps, useRoundingContext } from "@/context/RoundingContext";
import RequestRounding from "./steps/Request";
import ErrorRounding from "./steps/Error";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/appContext";

const RoundFlowDetails: Record<RoundDownSteps, ReactNode> = {
  [RoundDownSteps.success]: <RoundingSuccess />,
  [RoundDownSteps.requestCertificate]: <RequestRounding />,
  [RoundDownSteps.error]: <ErrorRounding />,
};

export default function RoundingFlow() {
  const { jwt } = useAppContext();
  const { step } = useRoundingContext();

  const router = useRouter();

  useEffect(() => {
    if (!jwt) {
      router.push("/sep10?target=rounding");
    }
  }, [jwt, router]);

  if (!jwt) {
    return;
  }

  return <Modal>{RoundFlowDetails[step]}</Modal>;
}
