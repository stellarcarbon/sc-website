import { ReactNode } from "react";
import RoundingSuccess from "./steps/Success";
import Modal from "@/components/Modal";
import { RoundDownSteps, useRoundingContext } from "@/context/RoundingContext";
import FetchChallenge from "./steps/Fetch";
import AwaitRounding from "./steps/Await";
import RequestRounding from "./steps/Request";
import ErrorRounding from "./steps/Error";
import SignRounding from "./steps/Sign";

export const RoundFlowDetails: Record<RoundDownSteps, ReactNode> = {
  [RoundDownSteps.fetchingChallenge]: <FetchChallenge />,
  [RoundDownSteps.awaitingAuthentication]: <AwaitRounding />,

  [RoundDownSteps.success]: <RoundingSuccess />,

  [RoundDownSteps.requestCertificate]: <RequestRounding />,
  [RoundDownSteps.signingChallenge]: <SignRounding />,
  [RoundDownSteps.error]: <ErrorRounding />,
};

export default function RoundingFlow() {
  const { step } = useRoundingContext();

  return (
    <Modal>
      {RoundFlowDetails[step]}
      {/* <div>{<SignRounding />}</div> */}
    </Modal>
  );
}
