import ModalHeader from "@/components/ModalHeader";
import SinkingStep from "./Step";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import SinkingStepButtons from "./Buttons";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useSinkingContext } from "@/context/SinkingContext";

export default function ExpiredSinking() {
  const { sinkRequest } = useSinkingContext();
  const router = useRouter();

  const returnToForm = useCallback(() => {
    const params = new URLSearchParams();

    if (sinkRequest?.carbonAmount !== undefined) {
      params.set("amount", sinkRequest.carbonAmount.toString());
    }

    if (sinkRequest?.memoValue !== undefined) {
      params.set("reason", sinkRequest.memoValue);
    }

    if (sinkRequest?.paymentAsset !== undefined) {
      params.set("asset", sinkRequest.paymentAsset);
    }

    router.push(`/dashboard/sink/?${params}`);
  }, [router, sinkRequest]);

  return (
    <SinkingStep title="Expired">
      <div className="flex flex-col items-center">
        <div className="text-center">
          Your transaction expired. Please retry creating it. The transaction is
          only valid for 2 minutes.
        </div>
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          className="text-[96px] my-12 text-yellow-500"
        />
      </div>
      <SinkingStepButtons>
        <Button onClick={returnToForm} className="mx-auto">
          Go back
        </Button>
      </SinkingStepButtons>
    </SinkingStep>
  );
}
