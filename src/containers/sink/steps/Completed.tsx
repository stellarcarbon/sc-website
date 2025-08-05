import SuccessIcon from "@/components/icons/SuccessIcon";
import SinkingStepButtons from "./Buttons";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useAppContext } from "@/context/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useSinkFormContext } from "@/context/SinkFormContext";
import ModalStep from "@/components/ModalStep";

export default function CompletedSinking() {
  const { pollForNewTransaction } = useAppContext();
  const { resetSinkForm } = useSinkFormContext();

  const router = useRouter();

  const onFinish = useCallback(() => {
    resetSinkForm();

    router.push("/dashboard");
  }, [router, resetSinkForm]);

  useEffect(() => {
    pollForNewTransaction();
  }, []);

  return (
    <ModalStep title="Transaction succesful">
      <div className="text-center">
        <div className="">
          Your transaction was succesfully committed to the Stellar blockchain.
        </div>

        <div className="mt-4">Review the transaction on your dashboard!</div>
      </div>

      <div className="flex-1 flex items-center justify-center my-4">
        <SuccessIcon />
      </div>

      <SinkingStepButtons>
        <Button onClick={onFinish} className="mx-auto">
          <FontAwesomeIcon icon={faArrowLeft} />
          <div>Go back</div>
        </Button>
      </SinkingStepButtons>
    </ModalStep>
  );
}
