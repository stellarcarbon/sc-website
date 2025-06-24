import SuccessIcon from "@/components/icons/SuccessIcon";
import SinkingStep from "./Step";
import SinkingStepButtons from "./Buttons";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAppContext } from "@/context/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useSinkFormContext } from "@/context/SinkFormContext";

export default function CompletedSinking() {
  const { pollForNewTransaction } = useAppContext();
  const { resetSinkForm } = useSinkFormContext();

  const router = useRouter();

  const onFinish = useCallback(() => {
    pollForNewTransaction();

    resetSinkForm();

    router.push("/dashboard");
  }, [router, resetSinkForm, pollForNewTransaction]);

  return (
    <SinkingStep title="Transaction succesful">
      <div className="mt-6 text-center">
        <div className="text-lg font-semibold">
          Your transaction was succesfully committed to the Stellar blockchain.
        </div>

        <div className="mt-4">Review the transaction on your dashboard!</div>
      </div>

      <div className="flex-1 flex items-center justify-center my-16">
        <SuccessIcon />
      </div>

      <SinkingStepButtons>
        <Button onClick={onFinish} className="mx-auto">
          <FontAwesomeIcon icon={faArrowLeft} />
          <div>Go back</div>
        </Button>
      </SinkingStepButtons>
    </SinkingStep>
  );
}
