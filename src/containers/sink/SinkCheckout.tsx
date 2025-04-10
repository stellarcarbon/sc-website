import Modal from "@/components/Modal";
import ConfirmSinking from "./steps/Confirm";
import { CheckoutSteps, useSinkingContext } from "@/context/SinkingContext";
import { ReactNode, useEffect } from "react";
import SignSinking from "./steps/Sign";
import AwaitSinking from "./steps/Await";
import CompletedSinking from "./steps/Completed";
import ErrorSinking from "./steps/Error";
import { useRouter } from "next/navigation";
import ExpiredSinking from "./steps/Expired";

export const SinkStatusDetails: Record<CheckoutSteps, ReactNode> = {
  [CheckoutSteps.CREATING]: (
    <AwaitSinking message="Creating your transaction using Stellarcarbon API." />
  ),
  [CheckoutSteps.CONFIRM]: <ConfirmSinking />,
  [CheckoutSteps.AWAIT_SIGNING]: <SignSinking />,
  [CheckoutSteps.AWAIT_BLOCKCHAIN]: (
    <AwaitSinking message="Transaction signed. Submitting to the Stellar blockchain." />
  ),
  [CheckoutSteps.COMPLETED]: <CompletedSinking />,
  [CheckoutSteps.ERROR]: <ErrorSinking />,
  [CheckoutSteps.EXPIRED]: <ExpiredSinking />,
};

export default function SinkCheckout() {
  const { step, sinkRequest } = useSinkingContext();

  const router = useRouter();

  useEffect(() => {
    if (!sinkRequest) {
      router.push("/dashboard");
    }
  }, [sinkRequest, router]);

  return (
    <Modal>
      {SinkStatusDetails[step]}
      {/* {SinkStatusDetails[CheckoutSteps.ERROR]} */}
    </Modal>
  );
}
