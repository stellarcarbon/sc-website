import Modal from "@/components/Modal";
import ConfirmSinking from "./steps/Confirm";
import {
  SinkingFinalizationSteps,
  useSinkingContext,
} from "@/context/SinkingContext";
import { ReactNode } from "react";
import SignSinking from "./steps/Sign";
import AwaitSinking from "./steps/Await";
import CompletedSinking from "./steps/Completed";
import ErrorSinking from "./steps/Error";

export const SinkStatusDetails: Record<
  SinkingFinalizationSteps,
  { message: string; component: ReactNode }
> = {
  [SinkingFinalizationSteps.CREATING]: {
    message: "Creating your transaction using Stellarcarbon API...",
    component: <AwaitSinking />,
  },
  [SinkingFinalizationSteps.CONFIRM]: {
    message:
      "Your transaction is ready and approved by Stellarcarbon. Please confirm the transaction by signing it with your wallet.",
    component: <ConfirmSinking />,
  },
  [SinkingFinalizationSteps.SIGN_TRANSACTION]: {
    message: "Sign the transaction using your wallet in the pop-up.",
    component: <SignSinking />,
  },
  [SinkingFinalizationSteps.AWAIT_BLOCKCHAIN]: {
    message: "Transaction signed.\n Submitting to the Stellar blockchain....",
    component: <AwaitSinking />,
  },
  [SinkingFinalizationSteps.COMPLETED]: {
    message: "Success! Check out the link below to view your transaction.",
    component: <CompletedSinking />,
  },
  [SinkingFinalizationSteps.ERROR]: {
    message: "An error occurred.",
    component: <ErrorSinking />,
  },
};

export default function SinkingFinalization() {
  const { step, setStep, submissionError } = useSinkingContext();

  console.log(submissionError);

  return (
    <Modal>
      {SinkStatusDetails[step].component}
      <button
        onClick={() => {
          const steps = Object.values(SinkingFinalizationSteps);
          const idx = steps.indexOf(step);
          if (idx < steps.length - 1) {
            setStep(steps[idx + 1] as SinkingFinalizationSteps);
          } else {
            setStep(SinkingFinalizationSteps.CREATING);
          }
        }}
      >
        my button
      </button>
    </Modal>
  );
}
