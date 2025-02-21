import Modal from "@/components/Modal";
import ConfirmSinking from "./steps/Confirm";
import { CheckoutSteps, useSinkingContext } from "@/context/SinkingContext";
import { ReactNode, useCallback, useMemo } from "react";
import SignSinking from "./steps/Sign";
import AwaitSinking from "./steps/Await";
import CompletedSinking from "./steps/Completed";
import ErrorSinking from "./steps/Error";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export const SinkStatusDetails: Record<CheckoutSteps, ReactNode> = {
  [CheckoutSteps.CREATING]: (
    <AwaitSinking message="Creating your transaction using Stellarcarbon API..." />
  ),
  [CheckoutSteps.CONFIRM]: <ConfirmSinking />,
  [CheckoutSteps.SIGN_TRANSACTION]: <SignSinking />,
  [CheckoutSteps.AWAIT_BLOCKCHAIN]: (
    <AwaitSinking message="Transaction signed.\n Submitting to the Stellar blockchain...." />
  ),
  [CheckoutSteps.COMPLETED]: <CompletedSinking />,
  [CheckoutSteps.ERROR]: <ErrorSinking />,
};
export default function SinkingFinalization() {
  const { step, setStep } = useSinkingContext();

  const router = useRouter();

  const onClick = useCallback(() => {
    if (step === CheckoutSteps.COMPLETED) {
      router.push("/dashboard");
    } else {
      router.push("/dashboard/sink");
    }
  }, [step, router]);

  const label = useMemo(() => {
    if (step === CheckoutSteps.COMPLETED || step === CheckoutSteps.ERROR) {
      return "Go back";
    } else {
      return "Cancel transaction";
    }
  }, [step]);

  return (
    <Modal>
      {SinkStatusDetails[step]}

      {step !== CheckoutSteps.AWAIT_BLOCKCHAIN && (
        <Button onClick={onClick}>{label}</Button>
      )}

      {true && (
        <button
          onClick={() => {
            const steps = Object.values(CheckoutSteps);
            const idx = steps.indexOf(step);
            if (idx < steps.length - 1) {
              setStep(steps[idx + 1] as CheckoutSteps);
            } else {
              setStep(CheckoutSteps.CREATING);
            }
          }}
        >
          my button
        </button>
      )}
    </Modal>
  );
}
