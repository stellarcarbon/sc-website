import Modal from "@/components/Modal";
import ConfirmSinking from "./steps/Confirm";
import { CheckoutSteps, useSinkingContext } from "@/context/SinkingContext";
import { ReactNode, useCallback, useEffect, useMemo } from "react";
import SignSinking from "./steps/Sign";
import AwaitSinking from "./steps/Await";
import CompletedSinking from "./steps/Completed";
import ErrorSinking from "./steps/Error";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { faCancel, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TransactionHistoryService from "@/services/TransactionHistoryService";
import { useAppContext } from "@/context/appContext";

export const SinkStatusDetails: Record<CheckoutSteps, ReactNode> = {
  [CheckoutSteps.CREATING]: (
    <AwaitSinking message="Creating your transaction using Stellarcarbon API..." />
  ),
  [CheckoutSteps.CONFIRM]: <ConfirmSinking />,
  [CheckoutSteps.AWAIT_SIGNING]: <SignSinking />,
  [CheckoutSteps.AWAIT_BLOCKCHAIN]: (
    <AwaitSinking message="Transaction signed. Submitting to the Stellar blockchain...." />
  ),
  [CheckoutSteps.COMPLETED]: <CompletedSinking />,
  [CheckoutSteps.ERROR]: <ErrorSinking />,
};
export default function SinkCheckout() {
  const { walletConnection, setMyTransactions } = useAppContext();
  const { step, setStep, sinkRequest, signTransaction } = useSinkingContext();

  const router = useRouter();

  const onClick = useCallback(() => {
    if (step === CheckoutSteps.COMPLETED) {
      // fetch account history as user navigates back
      TransactionHistoryService.fetchAccountHistory(
        walletConnection?.stellarPubKey!
      ).then((transactionRecords): void => {
        setMyTransactions(transactionRecords);
      });
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

  useEffect(() => {
    if (!sinkRequest) {
      router.push("/dashboard");
    }
  }, [sinkRequest, router]);

  return (
    <Modal>
      <div className="flex-1">{SinkStatusDetails[step]}</div>

      <div className="h-16 md:my-3 flex items-center">
        {step === CheckoutSteps.CONFIRM ? (
          <div className="flex items-center justify-between w-full">
            <Button onClick={signTransaction} className="gap-2 !px-2">
              <FontAwesomeIcon icon={faPen} />
              <div>Sign transaction</div>
            </Button>
            <Button
              onClick={() => router.push("/dashboard/sink")}
              className="gap-1 !px-2 !bg-red-400"
            >
              <FontAwesomeIcon icon={faCancel} />
              Cancel
            </Button>
          </div>
        ) : (
          step !== CheckoutSteps.AWAIT_BLOCKCHAIN &&
          step !== CheckoutSteps.AWAIT_SIGNING && (
            <Button className={`mx-auto`} onClick={onClick}>
              {label}
            </Button>
          )
        )}
      </div>

      {false && (
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
